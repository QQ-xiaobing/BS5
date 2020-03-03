const express = require("express")
const app = express()

//生成这个密钥生成token，一般这个存储在环境变量中
app.set('secret', 'i2u34y12oi3u4y8')
//引用跨域模块
app.use(require('cors')())
//对post请求体进行解析
app.use(express.json())
//托管静态文件，使该目录里的文件可以被客户端通过 /upload 这个地址访问
app.use('/uploads', express.static(__dirname + '/uploads'))
//引入数据库配置
require('./plugins/db')(app)
// 后台管理系统页面
require('./routes/admin')(app)
//会在3000端口启动，启动后会调用回调函数
app.listen(3000, () => {
  console.log('http://localhost:3000');
});
