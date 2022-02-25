<template>
  <div class="footer">
    <router-link v-for="(item,index) in data" :key="index" :to="item.path">
      <div class="divs" @click="tab_click(item.path)">
        <img :src="item.selection" class="icon_img" v-if="numbers==item.path">
        <img :src="item.img" class="icon_img" v-else>
        <span class="span_all" :class="{'span_color':numbers==item.path}">{{item.title}}</span>
      </div>
    </router-link>
  </div>
</template>
<script>
  // import { constants } from 'crypto';
  export default {
    props:{
      data:Array,
      isFirstEnter:''
    },
    data(){
      return{
        datai:this.data,
        numbers:'/Index/Home'
      }
    },
    methods:{
      tab_click(path){
        this.numbers=path;
        const that=this;
        let datary=this.data;
        for(let i=0;i<datary.length;i++){
          datary[i].icon=false;
          if(datary[i].path==path){
            datary[i].icon=true;
          }
        }
        this.datai=datary;
      },
      processingData:function () {
        this.numbers=this.$route.path;
      }
    },
    mounted(){
    this.processingData();
    },
    activated() {
      if(!this.$route.meta.isBack || this.isFirstEnter){
        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
        // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
        // this.allTaskList= [];// 把数据清空，可以稍微避免让用户看到之前缓存的数据
        let that=this;
        that.processingData();
      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      this.$route.meta.isBack=false;
      // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
      this.isFirstEnter=false;

    },
    created(){
      this.isFirstEnter = true;
      // 只有第一次进入或者刷新页面后才会执行此钩子函数，使用keep-alive后（2+次）进入不会再执行此钩子函数
    },


  }
</script>
<style scoped>
  a{
    text-decoration:none;
    color:#333;
  }
  .span_all{
    display: inline-block;
    width: 50px;
    text-align: center;
  }
  .span_color{
    color: #ff5a71;
  }
  .footer{
    position: fixed;
    bottom:0;
    left:0;
    width:100%;
  }
  .icon_img{
    width: 26px;
    height: 26px;
  }
  .footer{
    padding:0;
    height: 60px;
    background: white;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  .divs{
    width: 70px;
    height: 45px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }


</style>
