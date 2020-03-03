module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    const router = express.Router({
      /**合并url参数。把父级app.use中的参数合并到router实例中，
     *这样才能在接口中通过res.params.resource获取到 app.use父级中的resource动态参数
     */
        mergeParams: true
    })
  //验证中间件
  const authMiddleware = require('../../middleware/auth')
  //资源中间件
  const resourceMiddleware = require('../../middleware/resource')
  //把子路由挂载上去 (rest代表的是通用的接口；resource用来动态获取接口地址，如category)
  app.use('/admin/api/rest/:resource', resourceMiddleware(), router)
 //增加 
 // 创建资源
 router.post('/', async (req, res) => {
  const model = await req.Model.create(req.body)
  res.send(model)
})
 // 删除资源
 router.delete('/:id', async (req, res) => {
  await req.Model.findByIdAndDelete(req.params.id)
  res.send({
      success: true
  })
})
  // 更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
})
//通过id获取详情
router.get('/:id', async (req, res) => {
  const data = await req.Model.findById(req.params.id)
  res.send(data)
})
    //  
    router.get('/', async (req, res) => { 
        let queryOptions = {}
        let pageNum=req.query.pageNum ;
        let pageSize=req.query.pageSize ;
        let count = await req.Model.find().count()
        let items = ''
        let obj = ''
        if (req.Model.modelName === 'Category'|| req.Model.modelName ==='Model') {
            queryOptions.populate='parent'
        }
        if (pageNum){
          items=await req.Model.find()
          .setOptions(queryOptions)
          .skip(parseInt(pageSize)* parseInt(pageNum-1))
          .limit(parseInt(pageSize));
          obj={count,items}
        }
       else {
         obj = await req.Model.find().setOptions(queryOptions).limit(count)
       }
       res.send(obj)
    })
       //上传图片
       const multer = require('multer')
     //之所以可以用req.file获取到文件数据，是因为用multer库的upload.single('file')将file参数赋值到req上
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
       const file = req.file
       file.url = `http://localhost:3000/uploads/${file.filename}`
       res.send(file)
   })
   app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
      /**
     * 由于在AdminUrer模型中设置了password字段默认不被查出来（select:false），如果想要查询
     * password这个字段，用select('+password')表示增加查询password这个字段
     */
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户错误')
    // //2.密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

    //错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}
