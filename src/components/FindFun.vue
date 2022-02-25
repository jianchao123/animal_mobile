<template>
    <div>
      <div class="text_div" @click="dryingList">
        <div class="header_img">
          <img src="../../static/img/find.png" class="urs_img">
          <div class="header_div">
            <div class="order">大奖晾单</div>
            <div class="haves">中大奖了赶紧秀一秀</div>
          </div>
        </div>
        <div class="lasts">>></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "FindFun",
      data() {
        return {
            dataList:[],
        }
      },
      methods:{
        dryingList:function () {
          this.$router.replace({path:'/DryingList'})
        }
      },
      mounted() {

      },
      beforeRouteLeave(to,from,next){
        to.meta.keepAlive=true;
        next()
      },
    }
</script>

<style scoped>
  .text_div{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(224, 224, 224);
    /*margin-top: 10px;*/
  }
  .header_img{
    width: 90%;
    display: flex;
    align-items: center;
  }
  .urs_img{
    width: 35px;
    height: 45px;
    margin-left: 10px;
  }
  .header_div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
  }
  .order{
    width: 100%;
    text-align: left;
    font-size: 15px;
    font-weight: 600;
    color: #484848;
  }
  .haves{
    font-size: 14px;
    color: #aeaeae;
  }
  .lasts{
    width: 10%;
    font-size: 18px;
    color: #8f8f8f;
    text-align: left;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
</style>
