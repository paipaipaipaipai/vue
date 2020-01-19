// 切换到项目根目录,安装vuex: cnpm i axios -S
import axios from "axios"
import {Message} from "element-ui"
import router from '../router/router'

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
})

const baseUrl = process.env.API_ROOT;

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
