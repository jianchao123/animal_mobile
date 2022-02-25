<template>
    <div>
      <div class="detail">领取详情</div>

      <div class="zj_div">
        <img src="../../static/img/zhongjiang.png" class="zj_img">
      </div>

      <div class="zj_detail"><span style="">领奖信息</span></div>

      <div class="zj_way" v-if="showThis===0">
        <div style="text-align: left;margin-top: 8px">
          <span class="way_span">领取方式</span>
          <span class="text_span" v-text="receive(dataList.accept_prize_type)"></span>
        </div>
        <div style="text-align: left;margin-top: 8px">
          <span class="way_span">价值</span>
          <span class="text_span">￥1800</span>
        </div>
        <div style="text-align: left;margin-top: 8px" v-if="cards===2">
          <span class="way_span">物流公司</span>
          <span class="text_span" v-text="dataList.express_company">顺丰快递</span>
        </div>
        <div style="text-align: left;margin-top: 8px" v-if="cards===2">
          <span class="way_span">物流单号</span>
          <span class="text_span" v-text="dataList.express_number"></span>
        </div>
        <div style="text-align: left;margin-top: 8px" v-if="cards===2">
          <span class="way_span">收货人名</span>
          <span class="text_span" v-text="dataList.recipents_name"></span>
        </div>
        <div style="text-align: left;margin-top: 8px" v-if="cards===2">
          <span class="way_span">收货地址</span>
          <span class="text_span" v-text="dataList.recipents_address"></span>
        </div>
        <div style="text-align: left;margin-top: 8px" v-if="cards===1">
          <span class="way_span">转到号码</span>
          <span class="text_span" v-text="dataList.to_recycle_phone"></span>
          <span style="width: 40px;display: inline-block;border-radius: 5px;border: 1px solid black;font-size: 12px;text-align: center;margin-left: 3px">收卡</span>
        </div>
        <div style="text-align: left;margin-top: 8px" v-if="cards===3">
          <span class="way_span">卡号</span>
          <span class="text_span" v-text="dataList.card_number"></span>
        </div>
        <div style="text-align: left;margin-top: 8px" v-if="cards===3">
          <span class="way_span">卡密</span>
          <span class="text_span" >请到卡号卡密页面查看</span>
        </div>
      </div>
      <div class="zj_way" v-if="showThis===1">
        <div style="text-align: left;margin-top: 8px">
          <span class="way_span">领取方式</span>
          <span class="text_span" v-text="receive(dataList.accept_prize_type)"></span>
        </div>
        <div style="text-align: left;margin-top: 8px">
          <span class="way_span">价值</span>
          <span class="text_span">￥1800</span>
        </div>
        <div style="text-align: left;margin-top: 8px" v-if="dataList.accept_prize_type===3 && dataList.is_card===false">
          <span class="way_span">物流公司</span>
          <span class="text_span" v-text="dataList.express_company">顺丰快递</span>
        </div>
        <div style="text-align: left;margin-top: 8px" v-if="dataList.accept_prize_type===3 && dataList.is_card===false">
          <span class="way_span">物流单号</span>
          <span class="text_span" v-text="dataList.express_number"></span>
        </div>
        <div style="text-align: left;margin-top: 8px" v-if="dataList.accept_prize_type===3 && dataList.is_card===false">
          <span class="way_span">收货人名</span>
          <span class="text_span" v-text="dataList.recipents_name"></span>
        </div>
        <div style="text-align: left;margin-top: 8px" v-if="dataList.accept_prize_type===3 && dataList.is_card===false">
          <span class="way_span">收货地址</span>
          <span class="text_span" v-text="dataList.recipents_address"></span>
        </div>
        <div style="text-align: left;margin-top: 8px" v-if="dataList.accept_prize_type===2">
          <span class="way_span">转到号码</span>
          <span class="text_span" v-text="dataList.to_recycle_phone"></span>
          <span style="width: 40px;display: inline-block;border-radius: 5px;border: 1px solid black;font-size: 12px;text-align: center;margin-left: 3px">收卡</span>
        </div>
        <div style="text-align: left;margin-top: 8px" v-if="dataList.accept_prize_type===3 && dataList.is_card===true">
          <span class="way_span">卡号</span>
          <span class="text_span" v-text="dataList.card_number"></span>
        </div>
        <div style="text-align: left;margin-top: 8px" v-if="dataList.accept_prize_type===3 && dataList.is_card===true ">
          <span class="way_span">卡密</span>
          <span class="text_span" >请到卡号卡密页面查看</span>
        </div>
      </div>

      <div class="zj_div" style="margin-top: 20px">
        <img src="../../static/img/caise.png" class="zj_img">
      </div>

      <div class="zj_detail"><span style="">商品信息</span></div>

      <div class="header">
        <div class="header_img">
          <img :src="imgs" class="img_open" style="margin-top: 24px">
        </div>
        <div class="header_div">
          <div class="now_money">
            <span v-text="dataList.commodity_name"></span>
          </div>
          <div class="time_sum" >
            <div class="left_name">
              <div class="name_text" >第{{dataList.period_no}}期</div>
              <div class="name_text">我参与的人次:{{dataList.participate_amounts}}人次</div>
              <div class="name_text">揭晓时间:{{dataList.time}}</div>
              <div class="name_text">幸运号码:{{dataList.luck_token}}  </div>
            </div>
          </div>
        </div>
      </div>
      <div style="clear: both"></div>
      <div class="bottom_back"></div>
      <div class="addUser" @click="AiringOrder" v-if="dataList.is_sun_the_order===false">
        <div class="user_div" >晾单</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ReceiveDetails",
      data() {
        return {
          dataList:[],
          imgs:'',
          cards:'',
          isFirstEnter:'',
          showThis:0
        }
      },
      methods:{
        AiringOrder:function () {
          this.$router.push({path:'/AiringOrder',query:{pk:this.$route.query.prize_record_pk}})
        },
          //领取方式
          receive:function(type){
            if(type===1){
                return '兑换牛逼豆'
            }else if(type===2){
                return '转到回收商'
            }else if(type===3){
                return '领取相应奖品([实物 | 卡密])'
            }
          },
          getList:function (pk) {
            let that=this;
              this.$get(this.$stors.state.ip+'/user/accept/prize/info/?prize_record_pk='+pk).then(function (res) {
                  that.dataList=res.data;
                  that.imgs=res.data.commodity_image[0].image_path;
              })
          },
        processingData:function () {
          document.querySelector('body').setAttribute('style', 'overflow:scroll');
          if(this.$route.query.cards){
            this.cards=this.$route.query.cards;
            this.showThis=0
          }else {
            this.showThis=1
          }
          this.getList(this.$route.query.prize_record_pk);
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
  body{
    /*overflow-y: scroll;*/
  }
  .detail{
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin-top: 20px;
  }
  .zj_div,.zj_detail{
    width: 94%;
    margin-left: 3%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
  .zj_img{
    width: 100%;
  }
  .zj_detail{
    height: 50px;
    font-size: 17px;
    font-weight: 600;
    justify-content: start;
    border-bottom: 1px solid #b3b3b3;
  }
  .zj_way{
    width: 94%;
    margin-left: 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
  ;
  }
  .way_span{
    font-size: 14px;
    color: #989898;
    display: inline-block;
    width: 56px;
  }
  .text_span{
    font-size: 14px;
    color: #3a3a3a;
    margin-left: 15px;
  }
  .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #eeeeee;
    margin-top: 4px;
    float: left;
    position: relative;
    border-bottom: 1px solid #c0c0c0;
  }
  .header_img{
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
  .bottom_back{
    width: 100%;
    height: 1px;
    background: #bcbcbc;
    margin-top: 15px;
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
