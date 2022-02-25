<template>
  <div class="all_div" :style="{height: curHeight}">
    <div :style="{height:bodyHeight}" class="allText_div"  ref="myScrollbar"  >
      <mt-loadmore
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :bottomPullText='bottomText'
        :autoFill='false'
        ref="loadmore">
        <div class="all_text">
          <div class="div_scroll_y" v-for="(val,id) in dataList" v-if="dataList.length>0" >

            <div style="margin-top: 10px">
              <span style="color: #8f8f8f">入库订单：</span>
              <span >{{val.recycle_trade_no}}</span>
            </div>
            <div style="margin-top: 5px">
              <span style="color: #8f8f8f">卡商：</span>
              <span >{{val.recycle_businessman_nickname}}</span>
            </div>
            <div style="margin-top: 5px">
              <span style="color: #8f8f8f">期数：</span>
              <span >{{val.recycle_period_no}}</span>
            </div>
            <div style="margin-top: 5px">
              <span style="color: #8f8f8f">商品信息：</span>
              <span >{{val.commodity_name}}</span>
            </div>

            <div  style="margin-top: 5px">
              <span style="color: #8f8f8f">商品价格：</span>
              <span style="color: #d8a267">{{val.recycle_price}}元</span>
            </div>
            <div style="margin-top: 5px">
              <span style="color: #8f8f8f">号码：</span>
              <span >{{val.phone}}</span>
            </div>
            <div style="margin-top: 5px">
              <span style="color: #8f8f8f">中奖者：</span>
              <span >{{val.luck_player_nickname}}</span>
            </div>
            <div style="margin-top: 5px;margin-bottom: 10px">
              <span style="color: #8f8f8f">入库时间：</span>
              <span >{{val.recycle_time}}</span>
            </div>
          </div>
          <div style="font-size: 14px;font-weight: 600;color: #a8a8a8;margin-top: 60px" v-if="dataList.length===0">
            暂无数据。。。
          </div>
        </div>
      </mt-loadmore>
    </div>

  </div>
</template>

<script>
  export default {
    name: "CardCollection",
    data(){
      return {
        dataList:[],
        scrollTop: 0,//滚动条距离顶部的距离
        tradPageNo: 1, // 当前页
        counts:0,//返回总页数
        allLoaded:false,
        bottomText:'上拉加载更多...',
        bodyHeight:'',//body高度
        curHeight:''

      }
    },
    methods:{
      //提示信息
      showtast:function(msg){
        this.$toast(msg)
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
            that.getList(that.tradPageNo);
          }else {
            that.tradPageNo -= 1;
          }
        }
      },
      //状态
      status:function(val){
        if(val===1){
          return '审核中'
        }else if(val===2){
          return '提现成功'
        }else if(val===3){
          return '审核不通过'
        }
      },
      getList:function (page) {
        let that=this;
        this.$get(this.$stors.state.ip+'/businessman/recyclerecordlist/?page='+page+'&limit=10').then(function (res) {
          that.counts=res.data.pages;
          for(let i=0;i<res.data.data.length;i++){
            that.dataList.push(res.data.data[i]);
          }
        })
      },
      processingData:function () {
        let that=this;
        that.getList(that.tradPageNo);
      }

    },
    beforeMount() {
      let that=this;
      let height = document.documentElement.clientHeight || document.body.clientHeight;
      that.curHeight=height+'px';
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
    height: 710px;
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
