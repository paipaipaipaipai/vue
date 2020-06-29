import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Index from '@/components/Index'
import One from '@/components/test/One.vue'
import Two from '@/components/test/Two.vue'
import Three from '@/components/test/Three.vue'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRouterMap = [{
  name: '',
  path: '/',
  component: Login,
  hidden: true,
  isMenu: false,
}, {
  name: '',
  path: '/main',
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
}, {
  name: 'Test',
  path: '/test',
  component: Main,
  hidden: false,
  isMenu: true,
  children: [{
    name: "One",
    path: "/test/one",
    iconCls: null,
    component: One,
    hidden: false,
    isMenu: true,
    children: [{
      name: "Three",
      path: "/test/one/three",
      iconCls: null,
      component: Three,
      hidden: true,
      isMenu: false
    }]
  }, {
    name: "Two",
    path: "/test/two",
    iconCls: null,
    component: Two,
    hidden: true,
    isMenu: false
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
