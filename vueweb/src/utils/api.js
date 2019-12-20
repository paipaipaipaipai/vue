// 切换到项目根目录,安装vuex: cnpm i axios -S
import axios from "axios"
import {Message} from "element-ui"

// 解决前后分离跨域Session一致性问题
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
  return config;
}, err => {
  Message.error({
    message: "请求超时!"
  });
})

axios.interceptors.response.use(data => {
  if (data.data.status != 1) {
    Message.error({
      message: data.data.message
    });
  }
  return data;
}, err => {
  Message.error({
    message: "服务器被吃了⊙﹏⊙∥"
  });
})

let base = "http://127.0.0.1:8888";

// JSON形式
export const postJsonRequest = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// 表单形式
export const postFormRequest = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    transformRequest: [function(data) {
      let ret = ""
      for (let it in data) {
        ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&"
      }
      return ret
    }],
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
