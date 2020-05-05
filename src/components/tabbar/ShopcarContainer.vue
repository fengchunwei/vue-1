<template>
  <div class="shopcarContainer">
    <!-- 商品列表 -->
    <div class="mui-card"  v-for="(item,i) in getGoodsLists" :key='item.id'>
      <div class="mui-card-content">
        <div class="mui-card-content-inner myclass">
          <mt-switch v-model="$store.getters.getGoodsSelected"></mt-switch>
          <img src="https://www.baidu.com/img/bd_logo1.png" alt />
          <div class="carCon">
            <h4>{{item.title}}</h4>
            <p class="shopCont">
              <span>
                ￥{{item.now_price}}
                <!-- '$store.getters.getGoodsCount[item.id]  拿到car中的数量 -->
                <numbox :getCounts='$store.getters.getGoodsCount[item.id]' :goodsid='item.id'></numbox>
              </span>
              <span @click="del(item.id,i)">删除</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 计算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="countC">
            <div>
              <div>总计:</div>
              <span>已勾选数量:{{$store.getters.getAllCountANDAmount.m}}件</span>
              <span>总价:￥{{$store.getters.getAllCountANDAmount.n}}</span>
            </div>
            <mt-button type="danger">去结算</mt-button>
            <p>{{$store.getters.getGoodsSelected}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from "../goods/Goodsinfo_num.vue";
export default {
  data() {
    return {
        getGoodsLists:[],//保存请求回来的数据
    };
  },
  created() {
    this.getGoodsList();
  },

  methods: {
    getGoodsList() {
      var isArr = [];
      this.$store.state.car.forEach(item => {
        isArr.push(item.id);
      });

      this.$http.get("http://yapi.shangyuninfo.com/mock/121/api/shopcarlist/" + isArr.join(','))
      .then(res=>{
          console.log(res.body.message)
          this.getGoodsLists = res.body.message
        })
    },
    // id:store中的数据   index指的是获取到的数据
    del(id,index){
        this.getGoodsLists.splice(index,1);
        this.$store.commit('remove',id)
    },
  },
  components: {
    numbox
  }
};
</script>
<style scoped>
.myclass {
  display: flex;
  align-items: center;
}
.mui-card-content-inner img {
  width: 60px;
}
.shopCont {
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: space-between;
}
.countC {
  display: flex;
  justify-content: space-between;
}
</style>