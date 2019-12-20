import { postJsonRequest } from './api'

export const initMenu = (router, store) => {
  // if (store.state.routes.length > 0) {
  //   return;
  // }
  // getRequest("/config/sysmenu").then(resp => {
  //   if (resp && resp.status == 200) {
  //     var fmtRoutes = formatRoutes(resp.data);
  //     router.addRoutes(fmtRoutes);
  //     store.commit('initMenu', fmtRoutes);
  //     store.dispatch('connect');
  //   }
  // })

  postJsonRequest("/config/sysmenu", { }).then(resp => {
    var data = resp.data;
    console.log(data);
    if (data.status == 1) {

    }
  }); 
}
