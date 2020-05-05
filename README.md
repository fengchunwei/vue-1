### 流程
## 1.构建webpack-vue框架，安装依赖
## 2.下载MUI放到目录中
## 3.安装Mint UI 
## npm i mint-ui -S
## 4.导入安装包 vue和mint-ui
## 5.在App.vue中进行布局
## 6.引入mint-ui文件到main.js,引入mint-ui的style文件
## 7.底部tab，参考Mui中的tabbar.html
## 8.tab切换配上路由跳转，在各个页面写自己页面的内容
## cnpm i --save -dev
## cnpm i style-loader css-loader --save-dev
## cnpm i url-loader file-loader --save-dev
## cnpm i babel-loader @babel/core @babel/runtime @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime -D
## cnpm i webpack-dev-server --save-dev
## cnpm i webpack-cli

### 商品详情页面的数值增加
1.安装mui会出现报错，解决方法：
<!-- 原因：由于webpack打包是严格模式，而mui不能通过npm安装，那么需要引入mui的时候就需要做以下配置，同时mui中的arguments，caller。。。不是严格开发模式，所以打包会出错 -->
  安装@babel/plugin-transform-modules-commonjs。同时再babelrc文件中设置配置项：
  [ "@babel/plugin-transform-modules-commonjs",
      {"strictMode":false}]

  "ignore":["./src/assets/js/mui.min.js"]

  同时，再main.js中引入mui，挂在到vue的实例上。import mui from './lib/mui/dist/js/mui.js'
    Vue.prototype.mui = mui

    完成以上配置后，再goodsnum中调用的时候需要使用this.mui的方式 否则没有效果