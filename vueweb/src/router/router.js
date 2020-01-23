import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Index from '@/components/Index'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRouterMap = [{
  path: '/',
  name: '',
  component: Login,
  hidden: true,
  isMenu: false,
}, {
  path: '/main',
  name: '',
  component: Main,
  hidden: false,
  isMenu: false,
  redirect: '/index',
  children: [{
    name: "首页",
    path: "/index",
    iconCls: null,
    component: Index,
    hidden: false,
    isMenu: true
  }]
}]


// export const constantRouterMap = [{
//   name: 'Login',
//   path: '/',
//   iconCls: null,
//   component: Login,
//   hidden: true,
//   isMenu: false,
// }, {
//   name: 'Main',
//   path: '/main',
//   iconCls: null,
//   component: Main,
//   hidden: true,
//   isMenu: false,
//   redirect: '/index'
// }, {
//   name: "首页",
//   path: "/index",
//   iconCls: null,
//   component: Index,
//   hidden: false,
//   isMenu: true
// }]

export default new Router({
  routes: constantRouterMap
});
