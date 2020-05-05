// console.log('ok')
//引入vue
import Vue from '../node_modules/vue/dist/vue.js'


//引入App.vue
import App from './App.vue'
//引入mint-ui包
import 'mint-ui'
//引入Mint-ui的style样式
import '../node_modules/mint-ui/lib/style.min.css'
//引入头部样式
import { Header,Button } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);


//导入路由
import VueRouter from 'vue-router';
import router from './router.js';
Vue.use(VueRouter)
//导入vue-resouce
import VueResource from 'vue-resource';
Vue.use(VueResource)

// 注册store
import Vuex from 'vuex'
Vue.use(Vuex)



localStorage.clear() //清除购物车数据
// 页面加载就获取对应的car中购物车数量
var car =JSON.parse(localStorage.getItem('car')||'[]') 

const store = new Vuex.Store({
    state:{  //this.$store.state.xxxx
       car:car,//用来存储读取购物车的数据
    },
    mutations:{ //this.$store.commit('方法名'，'唯一参数')
    // 分析：添加购物车时，需要判断当前商品是否存在，如果存在只更新个数，如果不存在则直接添加

       addToCar(state,goodsinfos){
        var flag = false; //假设商品不存在
            state.car.some(item=>{
                if(item.id===goodsinfos.id){
                    item.count+=parseInt(goodsinfos.count)
                    flag = true
                    return true
                }
            })
            if(!flag){
                state.car.push(goodsinfos)
            }
            localStorage.setItem('car',JSON.stringify(state.car))
       },
       updataSelectCount(state,goodsinfo){
        state.car.some(item=>{
            if(item.id===goodsinfo.id){
                item.count+=parseInt(goodsinfo.count)
                return true
            }
        })
        localStorage.setItem('car',JSON.stringify(state.car))
        },
        remove(state,id){
           state.car.some((item,i)=>{
               if(item.id==id){
                   state.car.splice(i,1)
                   return true
               }
           })
           localStorage.setItem('car',JSON.stringify(state.car))
        }
    },

    // {id:selected}
    getters:{ //this.$store.getters.xxxx
        // 获取所有car中的count值
        getAllCount(state){
            var c = 0;
            state.car.forEach(item=>{
               c += item.count
            })
            return c
        },
        getGoodsCount(state){
            var x = {}  //{id:count}
            state.car.forEach(item=>{
                x[item.id] = item.count
            })
            return x
        },
        // getGoodsSelected(state){
        //     var y = {}
        //     state.car.forEach(item=>{
        //         y[item.id] = item.selected
        //     })
        //     return y
        // }
        // 获取商品的总数量以及总价格
        getAllCountANDAmount(state){
            var obj ={
                m :0,  //数量
                n : 0, //总价
            }
           
        state.car.forEach(item=>{
            obj.m+=item.count,
            obj.n+=item.price*item.count
        })
        return obj
        }
    }
})




//轮播图
import { Swipe, SwipeItem,Switch } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Switch.name, Switch);


//导入mui包
import './lib/mui/dist/css/mui.min.css';
import './lib/mui/dist/fonts/mui.ttf';
import './lib/mui/dist/fonts/mui-icons-extra.ttf';
import './lib/mui/dist/css/icons-extra.css'
// 导入mui.js包
import mui from './lib/mui/dist/js/mui.js'
Vue.prototype.mui = mui







let vm = new Vue({
    el:"#app",
    data:{},
    methods: {
        
    },
    // 在页面中挂载App.vue
    render:c=>c(App),
    router,
    store
})
