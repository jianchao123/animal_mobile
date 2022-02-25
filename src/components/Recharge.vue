<template>
  <div class="alltext" :style="conheight">
    <div class="header">
      <div class="moneys">
        <div class="money_sec">
          <div class="name_money">
            选择金额，点击确定
          </div>
          <div class="money_text">
            <div class="amount"  :class="{'color_amount':money===50}" @click="moneys(50)">50元</div>
            <div class="amount" :class="{'color_amount':money===100}" @click="moneys(100)">100元</div>
            <div class="amount" :class="{'color_amount':money===150}" @click="moneys(150)">150元</div>
          </div>
          <div class="money_text">
            <div class="amount" :class="{'color_amount':money===200}" @click="moneys(200)">200元</div>
            <div class="amount" :class="{'color_amount':money===500}" @click="moneys(500)">500元</div>
            <div class="amount" :class="{'color_amount':money===800}" @click="moneys(800)">800元</div>
          </div>
          <div class="money_text">
            <div class="amount" :class="{'color_amount':money===1000}" @click="moneys(1000)">1000元</div>
            <div class="amount" :class="{'color_amount':money===1500}" @click="moneys(1500)">1500元</div>
            <div class="amount" :class="{'color_amount':money===3000}" @click="moneys(3000)">3000元</div>
          </div>
        </div>
        <div class="trues">
          <span class="trues_span">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Recharge",
      data(){
          return {
            conheight:{
              height:''
            },
            money:50

          }
      },
      methods:{
        moneys:function (id) {
          this.money=id;
        },
        getList:function () {
          let that=this;
          this.$get(this.$stors.state.ip+'/pay/getpaymoney/').then(function (res) {

          })
        },
        processingData:function () {
          // this.getList();
          this.conheight.height=window.innerHeight+'px';
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
      beforeRouteLeave(to,from,next){
        to.meta.keepAlive=true;
        next()
      },
    }
</script>

<style scoped>
  .alltext{
    width: 100%;
    background: white;
  }
  .header{
    width: 100%;
    height: 212px;
    background: #ff4866;
  }
  .moneys{
    width: 94%;
    position: absolute;
    top: 160px;
    left: 3%;
    height: 400px;
    background: white;

  }
  .money_sec{
    width: 100%;
    height: 300px;
    -moz-box-shadow: 2px 2px 10px #909090;
    -webkit-box-shadow: 2px 2px 10px #909090;
    box-shadow:2px 2px 10px #909090;
    border-radius: 10px;
  }
  .color_amount{
    color: white;
    background: #ff4866
  }
  .name_money{
    width: 94%;
    margin-left: 3%;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    padding-top: 15px;
    color: #888;
  }
  .money_text{
    width: 94%;
    margin-left: 3%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  .amount{
    width: 30%;
    height: 60px;
    border-radius: 10px;
    border: 1px solid #ff4866;
    text-align: center;
    line-height: 60px;
    font-weight: 600;
    font-size: 16px;
  }
  .trues{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
  }
  .trues_span{
    width: 200px;
    height: 50px;
    display: inline-block;
    line-height: 50px;
    background: #fa2d48;
    color: white;
    font-size: 18px;
    font-weight: 600;
    border-radius: 20px;

  }
</style>
