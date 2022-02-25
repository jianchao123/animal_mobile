<template>
  <div class="all_div">
    <div class="header">
      <div>
        <img src="../../static/img/login.png" class="header_img" @click="goUrl('/UserDetail')">
      </div>
      <div class="login" v-show="shows===1" @click="goLogin(1)">
        登陆/免密登陆
      </div>
      <!--<div class="moneys" v-show="shows===0">-->
        <!--中大奖啦-->
      <!--</div>-->
    </div>
    <div class="functions" @click="goUrl('/CardDealerIndex')">
      <div class="names">
        <img src="../../static/img/shouye1.png" class="img_icon">
        <span class="img_name">我的主页</span>
      </div>
      <div class="texts">
        <img src="../../static/img/you.png" class="you_img">
      </div>
    </div>
    <div class="functions" @click="goUrl('/SubstituteCharge')">
      <div class="names">
        <img src="../../static/img/dingdan.png" class="img_icon">
        <span class="img_name">代充记录</span>
      </div>
      <div class="texts">
        <img src="../../static/img/you.png" class="you_img">
      </div>
    </div>

    <div class="functions" @click="goUrl('/BitcoinList')">
      <div class="names">
        <img src="../../static/img/jilu.png" class="img_icon">
        <span class="img_name">提现记录</span>
      </div>
      <div class="texts">
        <img src="../../static/img/you.png" class="you_img">
      </div>
    </div>
    <div class="functions" @click="goUrl('/CardCollection')">
      <div class="names">
        <img src="../../static/img/shouhuo.png" class="img_icon">
        <span class="img_name">收卡记录</span>
      </div>
      <div class="texts">
        <img src="../../static/img/you.png" class="you_img">
      </div>
    </div>
    <div class="functions" style="border-bottom: 1px solid #dddddd" @click="goUrl('/InvitationList')">
      <div class="names" >
        <img src="../../static/img/shezhi.png" class="img_icon">
        <span class="img_name">邀请记录</span>
      </div>
      <div class="texts">
        <img src="../../static/img/you.png" class="you_img">
      </div>
    </div>
    <div class="addUser" v-show="shows===0" @click="goLogin(2)">
      <div class="user_div" >退出登录</div>
    </div>
    <div class="bottom_div"></div>
  </div>
</template>

<script>
  export default {
    name: "CardDealer",
    data() {
      return{
        data:[],
        shows:0,
      }
    },
    methods:{
      goUrl:function (url) {
        if(this.shows===0){
          this.$router.push({path:url})
        }else {
          this.$toast('您还未登陆账号哦，请先登陆。')
        }

      },
      goLogin:function(id){
        let stors=this.$stors;
        stors.commit('changeChildText');
        if(id===1){
          this.$router.replace({path:'/Login'})
        }else {
          localStorage.clear();
          this.$router.replace({path:'/Login'})
        }
      },
      processingData:function () {
        let that=this;
        let login=localStorage.getItem('login');
        if(login==='2'){
          that.shows=0;
        }else {
          that.shows=1
        }
      }

    },
    mounted() {
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
  .all_div{
    background: white;
  }
  .header{
    width: 100%;
    height: 250px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .header_img{
    width: 110px;
    height: 110px;
    border-radius: 10px;
    margin-top: 50px;
  }
  .login{
    width: 200px;
    font-size: 18px;
    font-weight: 600;
    color: white;
    height: 35px;
    line-height: 35px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: #fb3849;
    margin-bottom: 25px;
  }
  .moneys{
    font-size: 15px;
    color: #807d7d;
    margin-bottom: 62px;
    font-weight: 600;
  }
  .functions{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #dddddd;
    height: 50px;
  }
  .names{
    width:40%;
    display: flex;
    align-items: center;
    margin-left: 5%;
  }
  .texts{
    width: 40%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .img_icon{
    width: 28px;
    height: 30px;
  }
  .img_name{
    font-size: 14px;
    font-weight: 600;
    color: #3d3d3d;
    margin-left: 10px;
  }
  .money_text{
    display: inline-block;
    width: 100px;
    text-align: center;
  }
  .addUser{
    width: 100%;
    display: flex;
    margin-top: 30px;
    justify-content: center;
  }
  .user_div{
    font-size: 18px;
    font-weight: 600;
    color: white;
    background: red;
    border-radius: 10px;
    height: 50px;
    line-height: 50px;
    width: 150px;
  }
  .you_img{
    width: 8px;
    height: 15px;
    margin-right: 20px;
    margin-left: 5px;
  }
  .bottom_div{
    height: 110px;
    width: 100%;
  }
</style>
