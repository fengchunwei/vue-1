<template>
  <div class="newscontainer">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key='item.id'>
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <div class="bodyTitle">{{item.title}}</div> 
            <p class="mui-ellipsis">
                <span>{{item.add_time}}</span>
                <span>点击{{item.click}}次</span>
                
            </p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    data(){
        return {


            newslist:[],
        }
    },
    created(){
        this.getnewsList()
    },
    methods:{
        getnewsList(){
            this.$http.get('http://yapi.shangyuninfo.com/mock/121/api/getnewslist')
            .then(
                result=>{
                    this.newslist = result.body.message;
                }
            )
            .catch()
        }
    }
};
</script>
<style>
.bodyTitle{
    font-size:14px;
}
.newscontainer .mui-ellipsis{
    display: flex;
}
.newscontainer .mui-media-body span:nth-of-type(1){
    font-size: 12px;
    color: #226aff;
   flex:8;
}
.newscontainer .mui-media-body span:nth-of-type(2){
    font-size: 12px;
    color: #226aff;
   flex:2;
}
</style>