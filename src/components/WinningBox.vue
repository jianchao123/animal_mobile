<template>
    <div>
      <div class="zhezao" ></div>
      <div class="address" >
        <div class="address_div">
          <img src="../../static/img/winningbox.png" class="show_img">
          <div class="text_img_show">
            <p class="zhongjiang">恭喜你中奖啦</p>
            <div class="commitid">
              <p class="proid">第{{period_no}}期</p>
              <p class="name_text">{{commodity_name}}</p>
            </div>
          </div>
          <div style="width: 100%;display: flex;justify-content: center;position: absolute;top: 91%;">
            <div class="gowinning" @click="gotoAwardPlatform">
              去领取
            </div>
          </div>
        </div>
        <div style="margin-top: 60px">
          <img src="../../static/img/close.png" class="close_img" @click="showimg">
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "WinningBox",
      data() {
        return {
          commodity_name:'',//商品名字
          period_no:'',//周期号
          period_pk:'',//商品id
          curHeight:''
        }
      },
      methods:{
        gotoAwardPlatform:function(){
          let that=this;
          this.$stors.commit('showchangeno');//控制body滚动条
          this.$router.replace({path:'/AwardPlatform',query: {commodity_id: that.period_pk,prize_record_pk:that.prize_record_pk}});
        },
        showimg:function () {
          this.$stors.commit('showchangeno');//控制body滚动条
          localStorage.setItem('showWinning','false');
        }
      },
      mounted(){
        let that=this;
        let showbox=this.$stors.state.showbox;
        showbox=localStorage.getItem('showWinning');
        if(showbox==='true'){
          this.$stors.commit('showchangeis');//控制body滚动条
        }else {
          this.$stors.commit('showchangeno');//控制body滚动条
        }
        that.commodity_name=localStorage.getItem('commodity_name');
        that.period_no=localStorage.getItem('period_no');
        that.period_pk=localStorage.getItem('period_pk');
        that.prize_record_pk=localStorage.getItem('prize_record_pk');
      }
    }
</script>

<style scoped>
  .zhezao{
    width: 100%;
    height: 100%;
    background: black;
    position: absolute;
    filter:alpha(opacity=60);  /*设置透明度为60%*/
    opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
    z-index: 2000;
    top: 0;
    left: 0;
  }
  .address{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2000;
    top: 0;
    left:0;
  }
  .address_div{
    position: relative;
    width: 90%;
    margin-left: 5%;
    margin-top: 46%;
    border-radius: 10px;
  }
  .close_img{
    width: 33px;
    height: 33px;
  }
  .show_img{
    width: 100%;
    height: 242px;
  }
  .zhongjiang{
    font-size: 18px;
    margin-top: 4px;
    font-weight: 600;
    color: #f15a5a;
  }
  .commitid{
    background-image: url("../../static/img/juxing.png");
    background-size: 100% 100%;
    width: 51%;
    height: 65px;
    margin-left: 27%;
  }
  .text_img_show{
    width: 100%;
    position: absolute;
    z-index: 300;
    top: 91px;
  }
  .proid{
    font-size: 13px;
    font-weight: 600;
    color: #da6565;
    height: 18px;
    line-height: 18px;
    padding-top: 9px;
  }
  .name_text{
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    font-weight: 600;
    color: #d2805f;
    height: 18px;
    line-height: 18px;
    padding-top: 9px;
  }
  .gowinning{
    background:#f8a07c;
    width: 30%;
    height: 40px;
    color: #943f3f;
    line-height: 40px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 10px;

  }
</style>
