<template>
    <div>
      <div class="first_div">
        <div class="one_div">幸运号码计算规则？</div>
        <div class="two_div">
          <span style="color: red">幸运号码=(数值A+数值B)%商品总需人次+10000001</span>
        </div>
        <div class="two_div">
          <span style="color: red">数值A</span>
          <span>=截止该商品开奖时间点前本站全部商品的最后50个参与时间之和</span>
        </div>
        <div class="two_div" style="margin-bottom: 20px">
          <span style="color: red">数值B</span>
          <span>=最新一期中国福利彩票"重庆时时彩"的开奖结果</span>
        </div>
      </div>
      <div class="secound_div">
        <div class="one_div">实物奖品发货时间？</div>
        <div style="width:94%;text-align: left;display: inline-block;margin:15px 0 20px 10px;">客服会向您确认您的收货地址之后，3个工作日内发货</div>
      </div>
      <div class="three_div">
        <div class="one_div">京东E卡显示库存不足？</div>
        <div style="width:94%;text-align: left;display: inline-block;margin:15px 0 20px 10px;">联系客服转到卡商或者让客服补充库存</div>
      </div>
      <div class="four_div">
        <div class="one_div">如何查看物流？</div>
        <div style="width:94%;text-align: left;display: inline-block;margin:15px 0 20px 10px;">向客服索取实物物流单号，在各个物流官网查看物流信息</div>
      </div>
      <div class="addUser">
        <div class="user_div" >
          <a href="tel:15260875502" >一键客服</a>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "CustomerService",
      data(){
          return {

          }
      },
      methods:{

      },
      mounted(){

      },
      beforeRouteLeave(to,from,next){
        to.meta.keepAlive=true;
        next()
      },
    }
</script>
<style>
  body{
    overflow: hidden;
    overflow-y: scroll;
  }
</style>
<style scoped>
  a{
    text-decoration:none;
    color:white;
  }
  .first_div,.secound_div,.three_div,.four_div{
    width: 94%;
    margin-left: 3%;
    border-radius: 10px;
    background: #f4e1e3;
    margin-top: 30px;
  }
  .secound_div{
    background: #f9c8e3;
  }
  .three_div{
    background: #f9a1d1;
  }
  .four_div{
    background: #fa79aa;
  }
  .one_div,.two_div{
    width: 95%;
    display: inline-block;
    margin-left: 10px;
    font-size: 24px;
    font-weight: 600;
    margin-top: 15px;
    text-align: left;
  }
  .two_div{
    font-size: 16px;
  }
  .addUser{
    width: 100%;
    display: flex;
    margin-top: 50px;
    margin-bottom: 20px;
    justify-content: center;
  }
  .user_div{
    display: inline-block;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 600;
    color: white;
    background: #fa334a;
    border-radius: 10px;
    height: 50px;
    line-height: 50px;
    width: 180px;
  }
</style>
