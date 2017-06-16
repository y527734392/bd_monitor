# monitor-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).


一、开发环境–--（基于webpack-cli搭建的本地开发环境）
1、git clone http://gitlab.taihenw.com/monitorall/monitor_web.git
2、cd monitor_web/
3、npm install----前提是电脑上已经安装了nodejs
4、npm run dev—开发环境运行
     默认打开是localhost:8080
     可以在webpack.config.js修改默认端口
5、npm run build—编译
      若有dist目录，运行后会更新该目录
      若没有dist这个目录，运行后先自动生成这个目录
6、上线文件-----上传到服务器的odp/webroot/目录下
      dist/*
      index.html
 
二、开发机环境搭建----使用内网的cas登录系统，所以需要搭建odp环境
1、创建monitor目录
2、下载并安装odp
      下载安装   http://wiki.taihenw.com/pages/viewpage.action?title=odp&spaceKey=baseservice
     （1） cd /home/work/odp && ./bin/odp_install
     （2）端口改成8787
              odp/webserver/cpnf/vhost/php.conf
3、启动php和nignx
      /home/liuyemin/monitor/odp/php/sbin ./php-fpm start
     /home/work/monitor/odp/webserver/load_nginx.sh start
4、修改nginx配置
      (1) 添加dist,可访问对应静态文件
           例如：http://monitor.taihenw.com/dist/build.js
           location ~ ^/(favicon.ico|static|dist) {
              root /home/liuyemin/monitor/odp/webroot;
           }
      (2) 添加重定向配置
           location ~ (.*)\.(html|htm)?$ {
               rewrite (.*\.html)$ /index.php;
           }
备注：目录结构
dist：npm run build 编译后目录
node_modules：npm install 参数所需要的插件—已经添加到git忽略目录里，无需要提交
src: 核心代码
index.html:访问页面入口
package.json：安装所需插件配置文件
webpack.config.js:项目配置文件
.babelrc：这个文件是用来设置转码的规则和插件的 es6所需---一般不需要修改
favicon.ico：网站图标标志
----以下是登录相关----
phpcas：存放cas相关逻辑，不需要改动
logout.php:退出登录
index.php:判断用户是否登录或是否有权限
               由于所有页面都需判断用户是否登录及是否有权限，需要在nginx配置使所有页面rewrite到index.php进行判断
