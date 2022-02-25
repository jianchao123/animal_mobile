<template>
    <div>
      <div class="header">
        <div class="header_img">
          <img :src="imgs(dataList.commodity_images)" class="img_open" style="margin-top: 24px">
        </div>
        <div class="header_div">
          <div class="now_money">
            <span>{{dataList.commodity_name}}</span>
          </div>
          <div class="time_sum" >
            <div class="left_name">
              <div class="name_text" >第{{dataList.period_no}}期</div>
              <div class="name_text">参与人次:{{dataList.participate_renci}}人次  </div>
              <div class="name_text">揭晓时间:{{dataList.open_lottery_time}}</div>
              <div class="name_text">幸运期号:{{dataList.luck_token}}</div>
            </div>
          </div>
        </div>
      </div>
      <div style="clear: both"></div>
      <div class="getMoney">
        领奖方式：
      </div>
      <div class="way_div">
        <div class="money_div" >
          <input :class="{'input_div':checkes===2}" class="input_text" id="item2" type="radio" name="item" value="2" checked>
          <label for="item2" @click="checkconsignee" class="label_text"></label>
          <span style="margin-left: 10px">转给收货人</span>
        </div>
        <div class="money_div" >
          <input :class="{'input_div':checkes===1}" class="input_text" id="item1" type="radio" name="item" value="1" checked>
          <label for="item1" @click="checklist" class="label_text"></label>
          <span style="margin-left: 10px">获取相应的奖品</span>
        </div>
        <div class="addUser" v-if="is_card">
          <div class="user_div" style="background: red" @click="blackDarkcross">确认</div>
        </div>
        <div class="addUser" v-if="is_card===false">
          <div class="user_div" style="background: red" @click="darkcross">确认</div>
        </div>


      </div>


      <div class="zhezao" v-show="show_img===1||show_img===2"></div>
      <div class="address" v-show="show_img===1">
        <div class="address_div">
          <div class="address_text">
            <img src="../../static/img/huojiang.png" class="img_url">
            <div class="address_name">选择收货地址</div>
            <div class="address_all">
              <div class="choice" v-for="(val,id) in addressNmae">
                <div class="first_span" @click="getdetails(id)">
                  <span class="back_span" :class="{back_color:back_colors===id}"></span>
                </div>
                <div class="secound_span">
                  <span style="text-align: center;">姓名：</span>
                  <span class="default" v-if="val.is_default">默认</span>
                </div>
                <div class="three_span">
                  <span v-text="val.recipents_name"></span>
                  <span v-text="val.recipents_address"></span>
                </div>
              </div>
            </div>
            <div class="addUser">
              <div class="user_div" :class="{receive:receive_color===1}" @click="receiveDetail">确认</div>
            </div>
          </div>
        </div>
        <div style="margin-top: 35px">
          <img src="../../static/img/close.png" class="close_img" @click="showimg">
        </div>
      </div>

      <div class="address" v-show="show_img===2">
        <div class="address_div">
          <div class="address_text">
            <img src="../../static/img/huojiang.png" class="img_url">
            <div class="address_name">选择收货人</div>
            <div class="address_all">
              <div class="choice" v-for="(val,id) in consignee" style="height: 56px">
                <div class="first_span" @click="cardDetails(id)">
                  <span class="back_span" :class="{back_color:back_colors===id}"></span>
                </div>
                <div class="secound_span" style="width: 24%;text-align: left">
                  <span style="text-align: center;">姓名:</span>
                  <span style="text-align: left;">收货人号 码:</span>
                </div>
                <div class="three_span" style="width: 40%">
                  <span v-text="val.consignee_name"></span>
                  <span v-text="val.phone"></span>
                </div>
                <div class="three_span" style="width: 25%;display: flex;align-items: center;justify-content: center;">
                  <span class="card_this">收卡</span>
                </div>
              </div>
            </div>
            <div class="addUser">
              <div class="user_div" :class="{receive:receive_color===1}" @click="receivecard">确认</div>
            </div>
          </div>
        </div>
        <div style="margin-top: 35px">
          <img src="../../static/img/close.png" class="close_img" @click="showimg">
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "AwardPlatform",
      data(){
        return{
          checkes:0,
          address:'',
          show_img:0,
          dataList:[],
          addressNmae:[],
          consignee:[],
          back_colors:'',//控制颜色
          receive_color:0,//控制颜色
          shipping_address_pk:'',//地址pk
          phones:'',//收货商手机号
          prize_record_pk:'',//周期id
          is_card:false,
          isFirstEnter:''

        }
      },
      methods:{
          //选择收货地址
        checklist:function () {
          let that=this;
          if(that.is_card){
            that.checkes=1;
          }else {
            that.checkes=1;
          }

        },
        //选择收货人
        checkconsignee:function(){
            let that=this;
            that.checkes=2;
            // that.show_img=2;
            // that.getconsignee();
        },
        //关闭
        showimg:function () {
          let that=this;
          that.show_img=0;
          that.checkes=0;
          that.back_colors='';
          that.receive_color=0;
          that.shipping_address_pk='';
        },
        imgs:function(imgs){
          if(imgs){
            let img=imgs.split(",");
            return img[0];
          }

        },
        showtast:function(msg){
          this.$toast(msg)
        },
        //领取方式-领取实物
        receiveDetail:function(){
          let that=this;
          let goto=this.$router;
          if(that.receive_color===0){
            return that.showtast('请选择地址后领取哦。');
          }else {
            this.$post(this.$stors.state.ip+'/user/accept/prize/',{accept_prize_type:3,
              prize_record_pk:that.prize_record_pk,shipping_address_pk:that.shipping_address_pk}).then(function (res) {
                if(res.code===0){
                  that.showtast('领取成功!');
                  goto.replace({path:'/ReceiveDetails',query: {prize_record_pk: that.prize_record_pk,cards:2}});
                }
            })
          }
        },
        //领取方式-转给收货人
        receivecard:function(){
          let that=this;
          let goto=this.$router;
          if(that.receive_color===0){
            return that.showtast('请选择收货人后领取哦。');
          }else {
            this.$post(this.$stors.state.ip+'/user/accept/prize/',{accept_prize_type:2,
              prize_record_pk:that.prize_record_pk,phone:that.phones}).then(function (res) {
              if(res.code===0){
                that.showtast('领取成功!');
                goto.replace({path:'/ReceiveDetails',query: {prize_record_pk: that.prize_record_pk,cards:1}});
              }
            })
          }
        },

        darkcross:function(){
          let that=this;
          if(that.checkes===2){
            that.show_img=2;
            that.getconsignee();
          }else if(that.checkes===1){
            that.show_img=1;
            that.getaddress();
          }

        },
        //暗渠交易
        blackDarkcross:function(){
          let that=this;
          if(that.checkes===2){
            that.show_img=2;
            that.getconsignee();
          }else {
            let goto=this.$router;
            this.$post(this.$stors.state.ip+'/user/accept/prize/',{accept_prize_type:3,
              prize_record_pk:that.prize_record_pk}).then(function (res) {
              if(res.code===0){
                that.showtast('领取成功!');
                goto.replace({path:'/ReceiveDetails',query: {prize_record_pk: that.prize_record_pk,cards:3}});
              }
            })
          }

        },
        //点击选择地址
        getdetails:function(id){
          let that=this;
          that.back_colors=id;
          that.receive_color=1;
          that.shipping_address_pk=that.addressNmae[id].pk;
        },
        //点击选择收货人
        cardDetails:function(id){
          let that=this;
          that.back_colors=id;
          that.receive_color=1;
          that.phones=that.consignee[id].phone;
        },
        //获取用户地址
        getaddress:function(){
          let that=this;
          this.$get(this.$stors.state.ip+'/settings/shipping/address/').then(function (res) {
            that.addressNmae=res.data;
          })
        },
        //获取收货人
        getconsignee:function(){
          let that=this;
          this.$get(this.$stors.state.ip+'/businessman/userconsignees/').then(function (res) {
            that.consignee=res.data;
          })
        },
          getList:function (pk) {
            let that=this;
              this.$get(this.$stors.state.ip+'/snatchtreasure/commoditydetailpage/?period_pk='+pk).then(function (res) {
                    that.dataList=res.data.commodity_detail_data;
                    that.is_card=res.data.commodity_detail_data.is_card;

              })
          },
        processingData:function () {
          let that=this;
          that.prize_record_pk=this.$route.query.prize_record_pk;
          this.getList(this.$route.query.commodity_id);
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
    }
</script>

<style scoped>
  .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: white;
    margin-top: 10px;
    float: left;
    position: relative;
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
  .back_color{
    background: #fa334a;
  }
  .card_this{
    color: black;
    display: inline-block;
    width: 50px;
    height: 20px;
    border-radius: 10px;
    line-height: 20px;
    text-align: center;
    border:1px solid black;
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
  .getMoney{
    width: 90%;
    margin-left: 5%;
    display: flex;
    justify-content: flex-start;
    font-size: 20px;
    margin-top: 30px;
    font-weight: 600;
  }
  .way_div{
    width: 100%;
    background: white;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 600;
  }
  .money_div{
    width: 90%;
    margin-left: 5%;
    height: 50px;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .input_text[type="radio"] {
    width: 20px;
    height: 20px;
    opacity: 0;
  }

  .label_text {
    position: absolute;
    left: 5px;
    top: 15px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #999;
    cursor: pointer;
  }
  /*设置选中的input的样式*/
  /* + 是兄弟选择器,获取选中后的label元素*/
  .input_div:checked+label {
    background-color: #fa334a;
    border: 1px solid #fa334a;
  }
  /*添加的加号与label进行拼接(一个矩形边框去掉上和左的边框),再旋转45度*/
  .input_text:checked+label::after {
    position: absolute;
    content: "";
    width: 5px;
    height: 10px;
    top: 3px;
    left: 6px;
    border: 2px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
  }
  .addUser{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .user_div{
    font-size: 18px;
    font-weight: 600;
    color: #f1f1f1;
    text-align: center;
    background: #bcbcbc;
    border-radius: 10px;
    height: 50px;
    line-height: 50px;
    width: 120px;
  }
  .receive{
    color: white;
    background: red;
  }
  .zhezao{
    width: 100%;
    height: 100%;
    background: black;
    position: absolute;
    filter:alpha(opacity=60);  /*设置透明度为60%*/
    opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
    z-index: 10;
    top: 0;
    left: 0;
  }
  .address{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 11;
    top: 0;
    left:0;
  }
  .address_div{
    width: 90%;
    margin-left: 5%;
    height: 367px;
    margin-top: 27%;
    background: white;
    border-radius: 10px;
  }
  .address_text{
    padding: 10px;
    text-align: left;
  }
  .img_url{
    width: 200px;
    height: 30px;
  }
  .address_name{
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    margin-top: 5px;
  }
  .address_all{
    width: 100%;
    height: 216px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .choice{
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 600;
    margin-top: 10px;
    border-bottom: 1px dashed #b6b6b6;
    height: 70px;
    padding-bottom: 10px;
  }
  .first_span{
    width: 13%;
    display: flex;
    align-items: center;
  }
  .secound_span,.three_span{
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .three_span{
    width: 75%;
    margin-left: 1%;

  }
  .back_span{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border:1px solid #707070;
  }
  .default{
    width: 40px;
    height: 25px;
    font-weight: 600;
    display: inline-block;
    background: red;
    color: white;
    border-radius: 10px;
    text-align: center;
    line-height: 25px;
    margin-bottom: 7px;
  }
  .close_img{
    width: 33px;
    height: 33px;
  }
</style>
