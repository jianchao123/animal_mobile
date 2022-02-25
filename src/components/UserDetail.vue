<template>
    <div>
      <div class="header">
        <div>
          <img src="../../static/img/login.png" class="header_img" v-if="luckyUrl===null">
          <img :src="luckyUrl" class="header_img" v-else>
        </div>
        <div class="moneys" v-text="luckyName"></div>
        <div class="logins">
          <div class="pass_login" :class="{'colors':shows===0}" @click="passLogin">最近参与记录</div>
          <span class="fenge"></span>
          <div class="pass_login"  style="margin-left: 0;margin-right: 20px" :class="{'colors':shows===1}" @click="nopassLogin">最近中奖记录</div>
        </div>
      </div>
      <div class="img_div" v-show="shows===0" v-for="(val,id) in participate">
        <div class="url_img">
          <img :src="imgs(val.commodity_images)" class="img_open" style="margin-top: 12px">
        </div>
        <div class="header_div">
          <div class="now_money">
            <span v-text="val.commodity_name"></span>
          </div>
          <div class="time_sum" >
            <div class="left_name">
              <div class="name_text">第：{{val.period_no}}期</div>
              <div class="name_text">参与人次:{{val.participate_renci}}人次</div>
              <div class="name_text">揭晓时间:{{val.open_lottery_time}}</div>
              <div class="name_text">幸运号码:{{val.luck_token}}</div>
              <div class="name_text">开奖者:{{val.luck_player_nickname}}</div>
            </div>
          </div>
        </div>
        <img src="../../static/img/mylucky.png" class="lucky" v-if="val.is_win_prize">
      </div>

      <div class="img_div" v-show="shows===1" v-for="(val,id) in winningList">
        <div class="url_img">
          <img :src="imgs(val.commodity_images)" class="img_open" style="margin-top: 12px">
        </div>
        <div class="header_div">
          <div class="now_money">
            <span v-text="val.commodity_name"></span>
          </div>
          <div class="time_sum" >
            <div class="left_name">
              <div class="name_text">第：{{val.period_no}}期</div>
              <div class="name_text">参与人次:{{val.participate_renci}}人次</div>
              <div class="name_text">揭晓时间:{{val.open_lottery_time}}</div>
              <div class="name_text">幸运号码:{{val.luck_token}}</div>
            </div>
          </div>
        </div>
        <img src="../../static/img/mylucky.png" class="lucky" >
      </div>

    </div>
</template>

<script>
    export default {
        name: "UserDetail",//最近参与，中奖记录
      data(){
        return{
          shows:0,
            participate:[],//最近参与记录
            winningList:[],//最近中奖记录
            player_pk:'',//用户id
            luckyUrl:'',//用户头像
            luckyName:'',
        }
      },
      methods:{
        nopassLogin:function () {
          this.shows=1;
          this.getWinning();
        },
        passLogin:function () {
          this.shows=0;
          this.getParticipate();
        },
          imgs:function(imgs){
              let img=imgs.split(",");
              return img[0];
          },
          //最近参与记录
          getParticipate:function () {
            let that=this;
            this.$get(this.$stors.state.ip+'/snatchtreasure/recentlyparticipaterecords/?player_pk='+that.player_pk).then(function (res) {
                that.participate=res.data;
            })
          },
          //最近中奖记录
          getWinning:function () {
              let that=this;
              this.$get(this.$stors.state.ip+'/snatchtreasure/recentlywinprizerecords/?player_pk='+that.player_pk).then(function (res) {
                  that.winningList=res.data;
              })
          },
        processingData:function () {
          document.querySelector('body').setAttribute('style', 'overflow-y:scroll');
          let that=this;
          that.player_pk=this.$route.query.player_pk;
          that.luckyUrl=this.$route.query.luckyUrl;
          that.luckyName=this.$route.query.luckyName;
          this.getParticipate();
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
  .header{
    width: 100%;
    height: 250px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .register{
    width: 92%;
    margin-left: 4%;
    font-weight: 600;
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
    color: red;
    margin-top: 15px;
  }
  .header_img{
    width: 110px;
    height: 110px;
    border-radius: 10px;
    margin-top: 50px;
  }
  .logins{
    width: 100%;
    border-bottom: 1px solid #aaaa99;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 17px;
  }
  .fenge{
    display: inline-block;
    width: 1px;
    background: #8c8c7e;
    height: 30px;
  }
  .pass_login{
    width: 40%;
    height: 44px;
    text-align: center;
    margin-left: 20px;
    line-height: 44px;
    font-weight: 600;
  }
  .colors{
    border-bottom: 3px solid #ce0000;
    color: #ce0000;

  }
  .img_div{
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .lucky{
    width: 60px;
    height: 60px;
    position: absolute;
    top: 45px;
    right:5%;
  }
  .url_img{
    width: 30%;
  }
  .header_div{
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .img_open{
    width: 80%;
    margin-top: 15px;
    height: 86px;
    margin-left: 5%;
    border-radius: 10px;
    margin-bottom: 8px;
  }
  .now_money{
    width: 220px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
    font-size: 15px;
    font-weight: 600;
    margin-top: 8px;
  }

  .time_sum{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .left_name{
    width: 90%;
  }

  .name_text{
    font-size: 13px;
    color: #bababa;
    text-align: left;
    width: 100%;
  }
</style>
