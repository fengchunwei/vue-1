<template>
  <div class="goodslistContainer">
    <router-link class="goodsBox" v-for="item in goodsList" :key="item.id" :to="'/home/goodsinfo/'+item.id">
      <div class="goodsTitle" tag="div">
        <img :src="item.img_url" alt />
        <p>{{item.title}}</p>
      </div>
      <div class="goodsBody">
        <div class="goodsBodyTop">
          <span>￥{{item.now_price}}</span>
          <del>￥{{item.old_price}}</del>
        </div>
        <div class="goodsBodyBottom">
          <span>热卖中</span>
          <span>剩余{{item.own}}件</span>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsList: [] //存放请求回来的数据
    };
  },
  created() {
    this.getGoosList();
  },
  methods: {
    getGoosList() {
      this.$http
        .get("http://yapi.shangyuninfo.com/mock/121/api/goodslist?pageindex=1")
        .then(result => {
          this.goodsList = result.body.message;
        })
        .catch();
    }
  }
};
</script>
<style scoped>
.goodsBox {
  float: left;
  margin: 2px;
  padding: 4px;
  width: 48%;
  border: 1px solid #c4c4c4;
}

.goodsBox img {
  width: 100%;
}
.goodsBox .goodsTitle {
  width: 100%;
}
.goodsBody {
  padding: 4px;
  background: #cccccc;
}
.goodsBody .goodsBodyTop {
  margin-bottom: 20px;
}
</style>