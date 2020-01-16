let baseUrl = '';

if (process.env.NODE_ENV == 'production') {
  baseUrl = "http://127.0.0.1:8888/security-service";
} else if (process.env.NODE_ENV == 'testing') {
  baseUrl = "http://127.0.0.1:8888";
} else {
  baseUrl = "http://127.0.0.1:8888";
}

export default {
  BaseUrl: baseUrl,
  Login: "/login",
  Logout: "/logout",
  Roles: "/config/roles",
  Sysmenu: "/config/sysmenu",

  AllUsers: "/system/user/allUsers",
  GetUser: "/system/user/getUser",
  SaveUser: "/system/user/saveUser",
  ResetPassword: "/system/user/resetPassword",
  DeleteUser: "/system/user/deleteUser",

  CreateRole: "/system/role/createRole",
  SaveRole: "/system/role/saveRole",
  DeleteRole: "/system/role/deleteRole",

  MenuTree: "/system/authority/menuTree",
  RoleMenus: "/system/authority/roleMenus",
  SaveAuthority: "/system/authority/saveAuthority",

}
