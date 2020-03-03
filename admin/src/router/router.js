import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'

import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import itemEdit from '../views/itemEdit.vue'
import itemList from '../views/itemList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'
Vue.use(Router)
const router = new Router({
routes : [
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {path:'/categories/create', component:CategoryEdit},
      {path: '/categories/edit/:id', component: CategoryEdit, props: true },
      {path:'/categories/list', component:CategoryList},

      { path: '/item/create', component: itemEdit },
      { path: '/item/edit/:id', component: itemEdit, props: true },
      { path: '/item/list', component: itemList },

        { path: '/articles/create', component: ArticleEdit },
        { path: '/articles/edit/:id', component: ArticleEdit, props: true },
        { path: '/articles/list', component: ArticleList },

      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_users/list', component: AdminUserList },

      { path: '/ads/create', component: AdEdit },
      { path: '/ads/edit/:id', component: AdEdit, props: true },
      { path: '/ads/list', component: AdList },
     ]
    },
  ]
})

router.beforeEach((to, from ,next) => {
    if (!to.meta.isPublic && !localStorage.token) {
        return next('/login')
    }
    next()
})


export default router

