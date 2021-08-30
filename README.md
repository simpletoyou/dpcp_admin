* [项目介绍](#walkthrough)
    * [项目构建](#build-system)
    * [项目结构](#file-structure)
* [开始开发](#getting-started)
    * [项目依赖](#dependencies)
    * [项目运行](#running-the-app)
        * [Gulp Tasks](#gulp-tasks)
* [路由列表](#router)

# smt交易所管理后台
## Build System
项目基于webpack gulp构建工作

`Webpack` 处理文件依赖:
* 采用 `Babel` 编译js代码 ES6 to ES5
* 用模块加载的方式加载html
* 编译less
* 动态编译刷新
* 改动模块热启动

`Gulp` 处理打包流程:
* 启动webpack流程
* 生成app模块模版

## File Structure
每一个页面或组件都是一个模块
```
client
⋅⋅app/
⋅⋅⋅⋅app.js * 项目入口
⋅⋅⋅⋅app.html * 项目html
⋅⋅⋅⋅common/ * 公共的组件
⋅⋅⋅⋅⋅⋅header/ * 头模块
⋅⋅⋅⋅⋅⋅⋅⋅index.js * 模块入口 (routes, configurations, and declarations occur here)
⋅⋅⋅⋅⋅⋅⋅⋅component.js * 模块结构部分
⋅⋅⋅⋅⋅⋅⋅⋅controller.js * controller
⋅⋅⋅⋅⋅⋅⋅⋅index.less * styles
⋅⋅⋅⋅⋅⋅⋅⋅index.html * template
⋅⋅⋅⋅⋅⋅⋅⋅index.spec.js * specs (for entry, component, and controller)
⋅⋅⋅⋅components/ * 不同页面模块
⋅⋅⋅⋅⋅⋅components.js * 页面模块入口
⋅⋅⋅⋅⋅⋅demo/ * 示例模块
⋅⋅⋅⋅⋅⋅⋅⋅index.js * 模块入口 (routes, configurations, and declarations occur here)
⋅⋅⋅⋅⋅⋅⋅⋅component.js * 模块结构部分
⋅⋅⋅⋅⋅⋅⋅⋅controller.js * controller
⋅⋅⋅⋅⋅⋅⋅⋅index.less * styles
⋅⋅⋅⋅⋅⋅⋅⋅index.html * template
⋅⋅⋅⋅⋅⋅⋅⋅index.spec.js * 首页 specs (for entry, component, and controller)
```


# Getting Started
## Dependencies
执行项目之前,电脑需要配置以下环境:
* `node` 推荐8.9.*版本
* `gulp` 推荐3.9.1版本
* `yarn`（强烈推荐，非必须） 1.5以上版本

    * 如果使用yarn，建议中国用户配置以下两条命令，讲网络连接到taobao镜像，以提高安装速度和成功率。

        `yarn config set registry https://registry.npm.taobao.org`

        `yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass`

执行项目之前，安装项目依赖：

1. 确保node、gulp已经安装指定版本。如果使用yarn安装，确保已经安装yarn。
2. 使用以下命令之一安装依赖（再次推荐使用yarn)。
    * `npm install`
    * `yarn`

## Running the App

* 开发测试

    * 确保后端已开启服务器
    * 将根目录下 gulpfile.babel.js 文件的第214行代码`let host = 'http://gdae2.manager.dev.gpdax.com';`中的地址改为后端服务器的地址，注意加协议名和端口号（如果有）。
    * image.js 文件第445及453行代码依当前环境更换测试或者生产接口
    * 执行 `gulp server`, 等待构建完成，在浏览器内输入开发网址： `http://localhost:7000`
    * 浏览器地址栏输入网站： `http://localhost:7000/login.html`，登录页面可视则项目运行正常
* 打包上线

    * 执行 `gulp prod`
    * 将根目录下 dist 文件夹内的内容，发送给后端或者运维
## router

所有的路由
* order/list 订单列表
* app/add 添加新应用
* 路由拦截
  * 未绑定谷歌、未重置密码，不允许进入业务页面   /common/tree/tree.ctrl.js

## 本地存储
* account-no 用户账号
* bound-google 是否绑定谷歌验证
* set-pwd-flag 是否设置密码
