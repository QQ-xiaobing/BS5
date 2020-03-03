import Vue from 'vue'
import VueRouter from 'vue-router'
import index from "../views/index";
import home from "../views/home";
Vue.use(VueRouter)

const routes = [
   //首页
   {
    path: '/',      //没有配置的路径
    redirect: '/index'   //默认跳转首页
},
  {path: '/index',component:index},
  {path: '/home',component:home},

]

const router = new VueRouter({
  routes
})

export default router
