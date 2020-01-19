# vueweb


## Build Setup

# install dependencies
npm install

# serve with hot reload at localhost:8001
# 端口号修改位置 config > index.js > module.exports.dve.port
npm run dev

# 测试环境打包
npm run build--test

# 生产环境打包 Nginx部署
npm run build--prod

########################## Nginx部署 ####################################
# 修改nginx.conf
worker_processes 1;
events {
  worker_connections 1024;
}
http {
  # 监听IP+端口
  upstream security {
    server 192.168.99.99:8888;
    server 192.168.99.99:8889;
  }
  server {
    listen 80;
    # 防止字体样式问题需要加上 include default_type
    include mime.types;
    default_type  application/octet-stream;
    server_name vue;
    # 匹配规则1
    location / {
      # root 指向前端文件目录
      root /home/vue;
      index index.html index.htm;
    }
    # 匹配规则2
    location /security-service {
      proxy_pass http://security;
    }
  }
}
# 修改 build/utils.js 添加publicPath
return ExtractTextPlugin.extract({
  use: loaders,
  fallback: 'vue-style-loader',
  publicPath: '../../'
})
# 修改 config/index.js 修改module.exports.build.assetsPublicPath: './'
assetsPublicPath: './',
########################## Nginx部署 ####################################
