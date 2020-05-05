<template>
  <div>
    <!-- 轮播图 -->
    <div class="loop">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
          <img :src="item.img_url" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 六宫格 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/home/newslist">
            <!-- <span class="mui-icon mui-icon-home"></span> -->
            <img :src="img1" />
            <div class="mui-media-body">新闻咨询</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <!-- <span class="mui-icon mui-icon-email"></span> -->
            <img :src="img2" />
            <div class="mui-media-body">图片分享</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/home/goodslist">
            <!-- <span class="mui-icon mui-icon-chatbubble"></span> -->
            <img :src="img3" />
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <!-- <span class="mui-icon mui-icon-location"></span> -->
            <img :src="img4" />
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <!-- <span class="mui-icon mui-icon-search"></span> -->
            <img :src="img5" />
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <!-- <span class="mui-icon mui-icon-phone"></span> -->
            <img :src="img6" />
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lunbotuList: [], //存放从后台请求的数据
      img1: "../images/menu1.png",
      img2: "../images/menu2.png",
      img3: "../images/menu3.png",
      img4: "../images/menu4.png",
      img5: "../images/menu5.png",
      img6: "../images/menu6.png"
    };
  },
  created() {
    this.getLoop(); //加载完成后调用方法
  },
  methods: {
    getLoop() {
      this.$http
        .get("http://yapi.shangyuninfo.com/mock/121/api/getLoop")
        .then(result => {
          console.log(result);
          this.lunbotuList = result.body.message;
          console.log(this.lunbotuList);
        })
        .catch();
    }
  }
};
</script>
<style scoped>
.loop {
  height: 200px;
  text-align: center;
}
.loop img {
  width: 100%;
  height: 200px;
}
.mui-content li a img {
  width: 60%;
  border-radius: 50%;
}
</style>