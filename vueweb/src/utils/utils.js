import {postRequest} from './api'

export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return;
  }
  postRequest("/config/sysmenu", {}).then(resp => {
    var data = resp.data;
    if (data.status == 1) {
      var fmtRoutes = formatRoutes(data.data);
      router.addRoutes(fmtRoutes);
      store.commit('initMenu', fmtRoutes);
    }
  });
}

export const formatRoutes3 = (routes) => {
  let fmRoutes = [];
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

export const formatRoutes2 = (routes) => {
  let fmRoutes = [];
  routes.forEach(router => {
    var menu = {};
    var cmenus = [];
    menu.name = router.menuName;
    menu.path = router.menuRouter;
    menu.iconCls = router.menuIcon;
    menu.component = resolve => require(['../components/' + router.menuComponent + '.vue'], resolve);
    if (router.childMenus && router.childMenus.length > 0) {
      router.childMenus.forEach(child => {
        var cmenu = {};
        cmenu.name = child.menuName;
        cmenu.path = child.menuRouter;
        cmenu.iconCls = child.menuIcon;
        cmenu.component = resolve => require(['../components/' + child.menuComponent + '.vue'], resolve);
        cmenus.push(cmenu);
      })
    }
    menu.children = cmenus;
    console.log(menu);
    fmRoutes.push(menu);
  })
  return fmRoutes;
}

export const formatRoutes = (routes) => {
  let fmRoutes = [];
  routes.forEach(router => {
    let {
      menuRouter,
      menuComponent,
      menuName,
      menuIcon,
      childMenus
    } = router;
    if (childMenus && childMenus instanceof Array) {
      childMenus = formatRoutes(childMenus);
    }
    let fmRouter = {
      path: menuRouter,
      component(resolve) {
        require(['../components/' + menuComponent + '.vue'], resolve)
      },
      name: menuName,
      iconCls: menuIcon,
      children: childMenus
    };
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}
