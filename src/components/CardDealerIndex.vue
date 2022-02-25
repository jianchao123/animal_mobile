<template>
<div>
  <div class="all_div">
  <div class="user_personal">
    <span style="font-size: 16px;font-weight: 600">个人信息</span>
  </div>
  <!--<div class="user_personal">-->
    <!--<span>登录账号：</span>-->
    <!--<span>185000000000</span>-->
  <!--</div>-->
  <div class="user_personal">
    <span class="first_name">收卡账号：</span>
    <span v-text="personal.phone"></span>
  </div>
  <!--<div class="user_personal">-->
    <!--<span>代充账号：</span>-->
    <!--<span>185000000000</span>-->
  <!--</div>-->
  <div class="user_personal">
    <span class="first_name">我的邀请码：</span>
    <span v-text="personal.invite_code"></span>
  </div>
  <div class="user_personal" style="display: inline-block;margin-left: 0">
    <span class="first_name">返点比率：</span>
    <span>
      <span>收货奖励：</span><span v-text="personal.recycle_back_rate*100+'%'"></span>
       <span>代充奖励：</span><span v-text="personal.deposit_back_rate*100+'%'"></span>
       <span>邀请奖励：</span><span v-text="personal.invite_back_rate*100+'%'"></span>
    </span>
  </div>
  <div class="user_personal">
    <span class="first_name">可提现金额：</span>
    <span v-text="personal.balance+' 元'" style="color: #d8a267"></span>
  </div>
  <div class="user_personal">
    <span class="first_name">邀请链接：</span>
    <span v-text="personal.invite_link"></span>
    <button class="tag-read" :data-clipboard-text="personal.invite_link" @click="copys" >复制</button>
  </div>
  <div class="user_personal">
    <span class="first_name">邀请二维码：</span>
    <img :src="imgurl+personal.invite_qr_code" class="img_code">
  </div>
</div>
<div class="xian_div"></div>
  <div class="all_div" style="margin-bottom: 20px">
    <div class="user_personal">
      <span style="font-size: 16px;font-weight: 600">近日收卡情况</span>
    </div>
    <div v-for="(val,index) in todayData" v-if="todayData.length>0">
      <div class="user_personal" style="margin-top: 5px">
        <span class="first_name">日期：</span>
        <span v-text="val.data_date"></span>
      </div>
      <div class="user_personal" style="margin-top: 5px">
        <span class="first_name">收货金额：</span>
        <span v-text="val.receive_cny"></span>
        <span class="first_name" style="margin-left: 5px;">代充金额：</span>
        <span v-text="val.dai_chong_cny"></span>
      </div>
      <div class="user_personal" style="margin-top: 5px;display: inline-block;margin-left: 0">
        <span class="first_name">收货奖励:</span>
        <span v-text="val.receive_back_profit_cny" style="font-size: 10px"></span>
        <span class="first_name">邀请奖励:</span>
        <span v-text="val.ls_back_profit_cny" style="font-size: 10px"></span>
        <span class="first_name">代充奖励:</span>
        <span v-text="val.dai_chong_back_profit_cny" style="font-size: 10px"></span>
      </div>
      <div class="user_personal" style="margin-top: 5px">
        <span class="first_name">奖励汇总：</span>
        <span v-text="val.total"></span>
        <span class="first_name" style="margin-left: 5px;">状态：</span>
        <span style="color: red" v-if="val.status===2">未结算</span>
        <span style="color: #009b00" v-if="val.status===1">已结算</span>
      </div>
      <div class="user_personal" style="height: 1px;background: black"></div>
    </div>


  </div>
</div>
</template>

<script>
  import Clipboard from 'clipboard';
    export default {
        name: "CardDealerIndex",
      data() {
        return {
            personal:[],
            todayData:[],
            imgurl:this.$stors.state.qiniuyunurl
        }
      },
      methods:{
        copys() {
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
        getList:function () {
          let that=this;
          this.$get(this.$stors.state.ip+'/businessman/homepage/').then(function (res) {
            that.todayData=res.data.jqgk;
            that.personal=res.data.recycle_businessman_data;
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
.all_div{
  width: 100%;
  margin-top: 10px;
}
  .user_personal{
    width: 90%;
    margin-left: 5%;
    text-align: left;
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 12px;
    font-weight: 600;
    color: #494949;
  }
  .tag-read{
    display: inline-block;
    width: 50px;
    height: 30px;
    border: 1px solid #b6b2bb;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    margin-left: 5px;
  }
  .img_code{
    width: 20%;
  }
  .xian_div{
    width: 100%;
    height: 1px;
    background: #acacac;
    margin-top: 10px;
  }
  .first_name{
    font-size: 14px;
    color: #afafaf;
  }
</style>
