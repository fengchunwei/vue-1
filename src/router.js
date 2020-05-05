import Vue from 'vue/dist/vue.min';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

//导入组件
import Homecontainer from './components/tabbar/HomeContainer.vue';
import Membercontainer from './components/tabbar/MemberContainer.vue';
import Searchcontainer from './components/tabbar/SearchContainer.vue';
import Shopcarcontainer from './components/tabbar/ShopcarContainer.vue'
import Newslist from './components/news/NewsList.vue'
import Goodslist from './components/goods/GoodsList.vue'
import Goodsinfo from './components/goods/Goodsinfo.vue'

let router = new VueRouter({
    routes:[
        { path:'/',redirect:'/home'},
        { path:'/home',component:Homecontainer},
        {path:'/member',component:Membercontainer},
        {path:'/shopcar',component:Shopcarcontainer},
        {path:'/search',component:Searchcontainer},
        {path:'/home/newslist',component:Newslist},
        {path:'/home/goodslist',component:Goodslist},
        {path:'/home/goodsinfo/:id',component:Goodsinfo},

    ],
    linkActiveClass:'mui-active'
})
//导出路由
export default router