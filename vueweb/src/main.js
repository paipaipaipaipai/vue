// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 切换到项目根目录,安装element-ui: cnpm i element-ui -S
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 切换到项目根目录,安装vuex: cnpm i vuex -S
import store from './vuex/store' // 引入store

import {Message} from 'element-ui'
import {postJsonRequest} from './utils/api'
import {postFormRequest} from './utils/api'
import {initMenu} from './utils/utils'

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
// Vue使用ElementUI
Vue.use(ElementUI)

Vue.prototype.postJsonRequest = postJsonRequest;
Vue.prototype.postFormRequest = postFormRequest;
Vue.prototype.message = Message;

router.beforeEach((to, from, next) => {
  if (to.name == 'Login') {
    next();
    return;
  }
  var userName = store.state.user.userName;
  if (userName == "") {
    next({
      path: '/'
    })
  } else {
    initMenu(router, store);
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  // 调用模板语法 把App渲染到index.html里面的<div id="app"></div>
  template: '<App/>'
})
