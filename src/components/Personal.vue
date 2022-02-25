<template>
    <div class="all_div">
      <div class="header">
        <div>
          <img :src="data.headimage" class="header_img" @click="goUserDetail" v-if="data.headimage">
          <img src="../../static/img/wode.png" class="header_img" v-else>
        </div>
        <div class="login" v-show="shows===1" @click="goLogin(1)">
          登陆/免密登陆
        </div>
        <div class="moneys" v-show="shows===0" v-text="data.nickname"></div>
      </div>

      <div class="functions" @click="goUrl('/Recharge')">
        <div class="names">
          <img src="../../static/img/yue.png" class="img_icon">
          <span class="img_name">余额</span>
        </div>
        <div class="texts">
            <span class="money_text" v-text="'￥'+data.balance" v-show="shows===0"></span>
            <img src="../../static/img/you.png" class="you_img">
        </div>
      </div>
      <div class="functions" @click="goUrl('/OrderRecord')">
        <div class="names">
          <img src="../../static/img/dingdan.png" class="img_icon">
          <span class="img_name">订单记录</span>
        </div>
        <div class="texts">
          <img src="../../static/img/you.png" class="you_img">
        </div>
      </div>
      <div class="functions" @click="goUrl('/WinningRecord')">
        <div class="names">
          <img src="../../static/img/jilu.png" class="img_icon">
          <span class="img_name">中奖记录</span>
        </div>
        <div class="texts">
          <img src="../../static/img/you.png" class="you_img">
        </div>
      </div>
      <div class="functions" @click="goUrl('/Consignee')">
        <div class="names">
          <img src="../../static/img/shouhuo.png" class="img_icon">
          <span class="img_name">收货人</span>
        </div>
        <div class="texts">
          <img src="../../static/img/you.png" class="you_img">
        </div>
      </div>
      <div class="functions" @click="goUrl('/Address')">
        <div class="names">
          <img src="../../static/img/dizhi.png" class="img_icon">
          <span class="img_name">收货地址</span>
        </div>
        <div class="texts">
          <img src="../../static/img/you.png" class="you_img">
        </div>
      </div>
      <div class="functions" @click="goUrl('/Kalman')">
        <div class="names">
          <img src="../../static/img/kami.png" class="img_icon">
          <span class="img_name">我的卡密</span>
        </div>
        <div class="texts">
          <img src="../../static/img/you.png" class="you_img">
        </div>
      </div>
      <div class="functions" style="border-bottom: 1px solid #dddddd" @click="goUrl('/SetUp')">
        <div class="names" >
          <img src="../../static/img/shezhi.png" class="img_icon">
          <span class="img_name">我的设置</span>
        </div>
        <div class="texts">
          <img src="../../static/img/you.png" class="you_img">
        </div>
      </div>
      <div class="addUser" v-show="shows===0" @click="goLogin(2)">
        <div class="user_div" >退出登录</div>
      </div>
      <div class="bottom_div"></div>
      <WinningBox v-show="showbox==='true'"/>
    </div>
</template>

<script>
  import WinningBox from '@/components/WinningBox'
    export default {
        name: "Personal",
      data() {
          return{
            data:[],
            shows:0,
            showbox:false,
            realTime:null,
            isFirstEnter:false
          }
      },
      components:{
        'WinningBox':WinningBox
      },
      methods:{
          //功能页跳转
        goUrl:function (url) {
          if(this.shows===0){
            this.$router.push({path:url})
          }else {
            this.$toast('您还未登陆账号哦，请先登陆。')
          }
        },
        //用户中奖，参与记录
        goUserDetail:function(){
          let that=this;
          this.$router.push({path:'/UserDetail',query: {player_pk: that.data.pk,luckyUrl:that.data.headimage,luckyName:that.data.nickname}})
        },
        goLogin:function(id){
          let goto=this.$router;
          let stors=this.$stors;
          this.$get(this.$stors.state.ip+'/user/signout/').then(function (res) {
              //清除定时器，清除本地缓存,清除实时监测中奖接口的状态
            localStorage.clear();
            stors.commit('changeChildText');
            clearInterval(stors.state.monitor);
            stors.state.monitor=null;
            goto.replace({path:'/Login'});
          })
        },
        getList:function () {
          let that=this;
          this.$get(this.$stors.state.ip+'/user/userinformation/').then(function (res) {
            that.data=res.data;
          })
        },
        processingData:function () {
          let that=this;
          //每0.5秒监测是否中奖
          that.realTime=setInterval(function (){
            that.showbox=localStorage.getItem('showWinning');
            if(that.showbox==='true'){
              //修改body样式
              document.querySelector('body').setAttribute('style', 'overflow:hidden')
            }else {
              document.querySelector('body').setAttribute('style', 'overflow:scroll')
            }
          },500);
          let login=localStorage.getItem('login');
          if(login==='1'){
            that.shows=0;
            that.getList();
          }else {
            that.shows=1
          }
        }

      },
      beforeDestroy() {
        let that=this;
        //关闭实时监测
        clearInterval(that.realTime);
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
      beforeRouteLeave(to,from,next){
        localStorage.setItem('showWinning','false');
        let that=this;
        //关闭实时监测
        clearInterval(that.realTime);
        to.meta.keepAlive=true;
        next()
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
    width: 30%;
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
