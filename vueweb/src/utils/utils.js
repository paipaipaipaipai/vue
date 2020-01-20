import {postRequest} from './axios'
import {Message} from 'element-ui'
import API from './api'

export const isNotNullORBlank = (...args) => {
  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg == null || arg == undefined || arg.replace(/(^\s*)|(\s*$)/g, '').length == 0) {
      Message.warning({
        message: '数据不能为空!'
      })
      return false;
    }
  }
  return true;
}

export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return;
  }
  postRequest(API.Sysmenu, {}).then(resp => {
    var data = resp.data;
    if (data.status == 1) {
      var fmtRoutes = formatRoutes(data.data);
      router.addRoutes(fmtRoutes);
      store.commit('initMenu', fmtRoutes);
    }
  });
}

export const formatRoutes = (routes) => {
  let fmRoutes = [];
  fmRoutes.push({
    "name": "首页",
    "path": "/index",
    "iconCls": null,
    "component": resolve => require(['../components/Main.vue'], resolve),
    "folding":true,
    "children": [{
      "name": "首页",
      "path": "/index",
      "iconCls": null,
      "component": resolve => require(['../components/Index.vue'], resolve),
    }]
  });
  routes.forEach(router => {
    var children = [];
    if (router.childMenus && router.childMenus.length > 0) {
      router.childMenus.forEach(child => {
        children.push({
          "name": child.menuName,
          "path": child.menuRouter,
          "iconCls": child.menuIcon,
          "component": resolve => require(['../components/' + child.menuComponent + '.vue'], resolve),
        });
      })
    }
    fmRoutes.push({
      "name": router.menuName,
      "path": router.menuRouter,
      "iconCls": router.menuIcon,
      "component": resolve => require(['../components/' + router.menuComponent + '.vue'], resolve),
      "children": children
    });
  })
  return fmRoutes;
}
