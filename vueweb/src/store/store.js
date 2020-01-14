import Vue from "vue"
// 切换到项目根目录,安装vuex: cnpm i vuex -S
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      userId: window.localStorage.getItem("user") == null ? "" : JSON.parse(window.localStorage.getItem("user")).userId,
      userName: window.localStorage.getItem("user") == null ? "" : JSON.parse(window.localStorage.getItem("user")).userName,
      realName: window.localStorage.getItem("user") == null ? "" : JSON.parse(window.localStorage.getItem("user")).realName,
      roles: window.localStorage.getItem("user") == null ? "" : JSON.parse(window.localStorage.getItem("user")).roles
    },
    routes: [],
  },
  mutations: {
    login(state, user) {
      state.user = user;
      window.localStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
      window.localStorage.removeItem("user");
      state.routes = [];
    },
    initMenu(state, menus){
      state.routes = menus;
    }
  }
});
