<template>
    <div>
      <div class="header" v-for="(val,id) in dataList" v-if="dataList.length>0">
        <img :src="imgs(val.commodity_image)" class="header_img">
        <div class="text_div">
          <span style="text-align: left;color: #a0a0a0">卡号：<span style="color:#414141;" v-text="val.card_number"></span></span>
          <span style="margin-top: 8px;color: #a0a0a0">卡密：<span style="color:#414141;" v-text="val.card_pwd"></span></span>
        </div>
        <div class="last_div" >
          <button class="tag-read " :data-clipboard-text="val.card_number+' '+val.card_pwd" @click="copy">复制</button>
        </div>
      </div>
      <div style="font-size: 14px;font-weight: 600;color: #a8a8a8;margin-top: 60px" v-if="dataList.length===0">
        暂无数据。。。
      </div>
    </div>
</template>

<script>
    import Clipboard from 'clipboard';
    export default {
        name: "Kalman",
      data(){
          return{
            dataList:[],
          }
      },
      methods:{
          copy() {
              let clipboard = new Clipboard('.tag-read');
              clipboard.on('success', e => {
                  console.log(e)
                  // 释放内存
                  clipboard.destroy()
              })
              clipboard.on('error', e => {
                  // 不支持复制
                  console.log('该浏览器不支持自动复制');
                  // 释放内存
                  clipboard.destroy()
              })
          },
        imgs:function(imgs){
          if(imgs){
            let img=imgs.split(",");
            return img[0];
          }

        },
        getList:function () {
            let that=this;
            this.$get(this.$stors.state.ip+'/user/usercards/').then(function (res) {
              that.dataList=res.data;
            })
        }
      },
      mounted() {
        this.getList();
      },
      activated() {
        if(!this.$route.meta.isBack || this.isFirstEnter){
          // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
          // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
          // this.allTaskList= [];// 把数据清空，可以稍微避免让用户看到之前缓存的数据
          let that=this;
          that.getList();
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
  .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    background: #fafafa;
    border-bottom: 1px solid #9a9a9a;
  }
  .header_img{
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-left: 13px;
  }
  .text_div{
    text-align: left;
    display: flex;
    width: 60%;
    flex-direction: column;
    justify-content: space-between;
  }
  .last_div{
    width: 20%;
  }
  .tag-read{
    width: 56px;
    height: 38px;
    background: red;
    border: 0;
    border-radius: 10px;
    color: #f2f6fc;
    font-size: 15px;
    font-weight: 600;
  }
</style>
