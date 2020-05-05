<template>
  <div class="goodsinfoContainer">
      <!-- 这是动画小球 -->
      <transition 
      @before-enter='beforeEnter'
      @enter='enter'
      @after-enter='afterEnter'
      >
           <div class="ball" v-show="flag"  ref='ball'></div>
      </transition>
     
    <!-- 这是轮播图部分 -->

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="loop">
            <mt-swipe :auto="4000">
              <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.img_url" />
              </mt-swipe-item>
            </mt-swipe>
          </div>
        </div>
      </div>
    </div>
    <!-- 这是购买数量部分 -->

    <div class="mui-card">
      <div class="mui-card-header">商品标题</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p>
                <del>市场价:￥999</del>
                <span>销售价:￥99</span>
            </p>
            <p>
                <span>购买数量:<numbox @getCount='getSelectedCount'></numbox></span>
            </p>
            <p>
                <mt-button type='primary' size='small'>点击购买</mt-button>
                <mt-button type='danger' size='small' @click="addToShopCar">加入购物车</mt-button>
            </p>
        </div>
      </div>
    </div>
    <!-- 商品详情信息 -->

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p>商品货号:</p>
            <p>库存情况:30件</p>
            <p>上架时间</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from '../subcomponent/Goodsnum.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            lunbotuList:[], //存放轮播图数据
            flag:false,  //控制小球的显示隐藏
            selectCount:1,  //这是点击数量的默认值
            goodsinfo:[],
        }
    },
    created(){
        this.getGoodsInfo();
        this.getgoods()
    },
    methods: {
      getGoodsInfo(){
          this.$http.get('http://yapi.shangyuninfo.com/mock/121/api/getLoop_1587914991785')
          .then(
              res=>{
                  this.lunbotuList = res.body.message
              }
          )
      },
      // 获取商品数据
      getgoods(){
        this.$http.get('http://yapi.shangyuninfo.com/mock/121/api/goodsinfo').then(
          res=>
          {this.goodsinfo=res.body.message[0];
          console.log(res.body.message)}
        )
      },
        //   加入购物车
     addToShopCar(){
       this.flag = !this.flag;
        var goodsinfos ={
          id:this.id,
          price:this.goodsinfo.now_price,
          count:this.selectCount,
          selected:true  //这是指购物车页面的开关是否开启，true代表选择商品
        }
        this.$store.commit('addToCar',goodsinfos)
     },
    beforeEnter(el){
        el.style.transform = 'translate(0,0)'
    },
    enter(el,done){
        el.offsetWidth;
        //分析：获取小球的屏幕位置，获取目标位置，做差值，赋值给小球的最终位置
        // 获取小球的位置
        const ballPosition = this.$refs.ball.getBoundingClientRect();
        //获取徽标的位置
        const badgePosition = document.getElementById('badge').getBoundingClientRect(); 

        const xPosition = badgePosition.left - ballPosition.left;
        const yPosition = badgePosition.top - ballPosition.top;
        el.style.transform = `translate(${xPosition}px,${yPosition}px)`
        el.style.transition = 'all 1s ease'
        done()
    },
    afterEnter(el){
        this.flag =!this.flag
    },

    getSelectedCount(count){
        this.selectCount = count;
        console.log('父组件拿到的值:'+this.selectCount)
    }
    },
    components:{
        numbox
    }
};
</script>
<style scoped>

.loop {
  height: 200px;
  /* margin-top: 40px; */
  text-align: center;
}
.loop img {
  width: 100%;
  height: 200px;
}


.ball{
    width: 20px;
    height: 20px;
    background: red;
    border-radius:50%;
    position: absolute;
     top: 427px;
    left: 135px;
    z-index: 999;
}
</style>