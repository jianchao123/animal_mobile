<template>
    <div class="all_div" :style="{height: curHeight}">
      <div style="display:inline-block;width:100%;text-align: left;font-size:14px;margin-left: 2%;margin-top: 17px;">
        <span>开始时间：</span>
        <el-date-picker
          v-model="startTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div style="text-align: left;font-size:14px;margin-left: 2%;margin-top: 15px;">
        <span>结束时间：</span>
        <el-date-picker
          v-model="endTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div style="text-align: left;margin-left: 2%;margin-top: 15px;">
        <span class="shaixuan" @click="screens">筛选</span>
        <span class="shaixuan" style="background: #f56c6c" @click="addText">添加</span>
      </div>
      <div :style="{height:bodyHeight}" class="allText_div"  ref="myScrollbar"  >
        <mt-loadmore
                     :bottom-method="loadBottom"
                     :bottom-all-loaded="allLoaded"
                     :bottomPullText='bottomText'
                     :autoFill='false'
                     ref="loadmore">
          <div class="all_text"   >
            <div class="div_scroll_y" v-for="(val,id) in dataList"  v-if="dataList.length>0" >
              <div style="margin-top: 10px">
                <span style="color: #8f8f8f">订单号：</span>
                <span >{{val.out_trade_no}}</span>
              </div>
              <div style="margin-top: 5px">
                <span style="color: #8f8f8f">卡商：</span>
                <span >{{val.businessman_nickname}}</span>
              </div>
              <div style="margin-top: 5px">
                <span style="color: #8f8f8f">金额：</span>
                <span style="color: #d8a267">{{val.payment_amount_cny}}元</span>
              </div>
              <div style="margin-top: 5px">
                <span style="color: #8f8f8f">充值手机号：</span>
                <span >{{val.to_player_phone}}</span>
              </div>
              <div  style="margin-top: 5px">
                <span style="color: #8f8f8f">代充时间：</span>
                <span>{{val.deposit_time}}</span>
              </div>
              <div style="margin-top: 5px;margin-bottom: 10px">
                <span style="color: #8f8f8f">状态：</span>
                <span v-text="status(val.status)"></span>
              </div>
            </div>
            <div style="font-size: 14px;font-weight: 600;color: #a8a8a8;margin-top: 60px" v-if="dataList.length===0">
              暂无数据。。。
            </div>
          </div>
        </mt-loadmore>
      </div>

      <div class="zhezao" v-show="show_img===1"></div>
      <div class="address" v-show="show_img===1">
        <div class="address_div">
          <div style="width: 95%;margin-left: 4%;text-align: left;margin-top: 32px;display: inline-block;">
            <span>充值数量：</span>
            <input class="input_text" v-model="numbers" type="number">
          </div>
          <div style="width: 95%;margin-left: 4%;text-align: left;margin-top: 27px">
            <span>手机号码：</span>
            <input class="input_text" type="number" v-model="phone">
          </div>
          <div class="addUser">
            <div class="user_div" :class="{receive:receive_color===1}" @click="receivecard">确认</div>
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
        name: "SubstituteCharge",
      data(){
          return {
            startTime:'',
            endTime:'',
            show_img:0,
            receive_color:1,
            dataList:[],
            phone:'',
            numbers:'',
            scrollTop: 0,//滚动条距离顶部的距离
            tradPageNo: 1, // 当前页
            counts:0,//返回总页数
            allLoaded:false,
            curHeight:'',
            bottomText:'上拉加载更多...',
            bodyHeight:'',//body高度

          }
      },
      methods:{
          //添加
        addText:function(){
          let that=this;
          that.show_img=1;
        },
        //上拉加载
        loadBottom:function(){
          let that = this;
          let sh = that.$refs['myScrollbar'].scrollHeight;// 滚动条高度
          let st = that.$refs['myScrollbar'].scrollTop; // 滚动条距离顶部的距离
          let ch = that.$refs['myScrollbar'].clientHeight; // 滚动条外容器的高度
          that.$refs.loadmore.onBottomLoaded();
          if (st + ch >= sh) {
            //到底了-业务逻辑
            that.tradPageNo += 1;
            if(that.tradPageNo<=that.counts){
              that.allLoaded = true;
              that.screens();
            }else {
              that.tradPageNo -= 1;
            }
          }
        },
          //关闭
        showimg:function () {
          let that=this;
          that.show_img=0;
        },
        //提示信息
        showtast:function(msg){
           this.$toast(msg)
        },
        //确认提交
        receivecard:function(){
          let that=this;
          if(that.numbers===''||that.numbers<1){
            return that.showtast('请填写充值数量');
          }else if(that.phone.length===11){
            this.$post(this.$stors.state.ip+'/financial/dcdeposit/',{phone:that.phone,amounts:that.numbers}).then(function (res) {
              if(res.code===0){
                that.showtast('充值成功');
                that.show_img=0;
                that.numbers='';
                that.phone='';
              }
            })
          }else {
            return that.showtast('请填写正确手机号');
          }
        },
        //状态
        status:function(val){
          if(val===0){
            return '等待付款'
          }else if(val===1){
            return '充值成功'
          }else if(val===2){
            return '已退费'
          }
        },
        //筛选
        screens:function () {
          let that=this;
          let start_time;
          let end_time;
          if(that.startTime===''||that.endTime===''){
            start_time='';
            end_time='';
          }else {
            start_time=this.$moment(that.startTime).format("YYYY-MM-DD HH:mm:ss");
            end_time=this.$moment(that.endTime).format("YYYY-MM-DD HH:mm:ss");
          }
          that.allLoaded = false;
          that.dataList=[];
          this.$get(this.$stors.state.ip+'/businessman/dcdeposit/?start_time='+start_time+'&end_time='+end_time+'&page='+that.tradPageNo+'&limit=10').then(function (res) {
            that.counts=res.data.pages;
            if(res.data.data.length>0){
              for(let i=0;i<res.data.data.length;i++){
                that.dataList.push(res.data.data[i]);
              }
            }else {
              that.dataList=[];
            }

          })
        },
      },
      beforeMount() {
        let that=this;
        let height = document.documentElement.clientHeight || document.body.clientHeight;
        that.curHeight=height+'px';
      },
      mounted() {
        let that=this;
        that.screens();
      },

    }
</script>

<style>
  html,body{
    overflow: hidden ;
  }
</style>
<style scoped>

  .all_div{
    background: #f9f9f9;
  }
  .shaixuan{
    display: inline-block;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    color: white;
    border-radius: 10px;
    width: 80px;
    background: #075a57c2;
    text-align: center;
  }
  .allText_div{
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
  }
  .div_scroll_y{
    width: 100%;
    display: flex;
    text-align: left;
    padding-left: 2%;
    margin-top: 2px;
    font-size: 13px;
    flex-direction: column;
    font-weight: 600;
    justify-content: space-between;
    background: white;
  }
  .list_table{
    width: 900px;
    height: 400px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .all_text{
    width: 100%;
    height: 580px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .table_text td{
   width: 16.6%;
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
    height: 230px;
    margin-top: 53%;
    background: white;
    border-radius: 10px;
  }
  .close_img{
    width: 33px;
    height: 33px;
  }
  .input_text{
    border: 1px solid #afafaf;
    height: 30px;
    border-radius: 10px;
  }
  .addUser{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
  .user_div{
    font-size: 18px;
    font-weight: 600;
    color: #f1f1f1;
    text-align: center;
    background: #bcbcbc;
    border-radius: 10px;
    height: 45px;
    line-height: 45px;
    width: 120px;
  }
  .receive{
    color: white;
    background: red;
  }
</style>
