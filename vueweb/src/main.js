// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
// 切换到项目根目录,安装element-ui: cnpm i element-ui -S
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 切换到项目根目录,安装vuex: cnpm i vuex -S
import store from './store/store' // 引入store
import {Message} from 'element-ui'
import {getRequest} from './utils/axios'
import {postRequest} from './utils/axios'
import {getRequestEQ} from './utils/axios'
import {postRequestEQ} from './utils/axios'
import {initMenu} from './utils/utils'
import {isNotNullORBlank} from './utils/utils'
import API from './utils/api'

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
// Vue使用ElementUI
Vue.use(ElementUI)

Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequestEQ = getRequestEQ;
Vue.prototype.postRequestEQ = postRequestEQ;
Vue.prototype.message = Message;
Vue.prototype.API = API;

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    store.commit("clear");
    next();
    return;
  }
  var userName = store.state.user.userName;
  if (userName === "" || userName == undefined) {
    store.commit("clear");
    next({
      path: '/'
    });
    return;
  }
  initMenu(router, store);
  next();
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
