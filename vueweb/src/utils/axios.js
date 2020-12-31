// 切换到项目根目录,安装vuex: cnpm i axios -S
import axios from "axios"
import {Message} from "element-ui"
import router from '../router/router'

// 解决前后分离跨域Session一致性问题
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {

  config.headers["PF_AUTH_REMOTE_USER"] = "dylan_xu";
  config.headers["timeZone"] = "Etc/GMT-2";
  config.headers["client_id"] = "In6d6ekUscs=";

  return config;
}, err => {
  Message.error({
    message: "请求超时!"
  });
})

axios.interceptors.response.use(data => {
  if (data.data.status != null && data.data.status != 1) {
    Message.error({
      message: data.data.message
    });
  }
  if (data.data.code != null && data.data.code != "1") {
    Message.error({
      message: data.data.message
    });
  }
  if (data.data.status == -1) {
    router.replace({
      path: "/"
    });
  }
  return data;
}, err => {
  Message.error({
    message: "服务器被吃了⊙﹏⊙∥"
  });
  return Promise.reject(err);
})

const baseUrl = process.env.API_ROOT;

export const getRequest = (path, params) => {
  return axios({
    method: "get",
    url: `${baseUrl}` + `${path}`,
    params: params
  });
}

export const postRequest = (path, params) => {
  return axios({
    method: "post",
    url: `${baseUrl}` + `${path}`,
    data: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export const getRequestEQ = (path, params) => {
  return axios({
    method: "get",
    url: "http://119.119.118.172:8080" + `${path}`,
    params: params
  });
}

export const postRequestEQ = (path, params) => {
  return axios({
    method: "post",
    url: "http://119.119.118.172:8080" + `${path}`,
    data: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json"
    }
  });
}
