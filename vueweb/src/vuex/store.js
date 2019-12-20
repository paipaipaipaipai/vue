import Vue from "vue"
// 切换到项目根目录,安装vuex: cnpm i vuex -S
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      userId: window.localStorage.getItem("user") == null ? "" : JSON.parse(window.localStorage.getItem("user")).userName,
      userName: window.localStorage.getItem("user") == null ? "" : JSON.parse(window.localStorage.getItem("user")).userName,
      roles: window.localStorage.getItem("user") == null ? "" : JSON.parse(window.localStorage.getItem("user")).roles
    }
  },
  mutations: {
    login(state, user) {
      state.user = user;
      window.localStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
      window.localStorage.removeItem("user");
    }
  }
});
