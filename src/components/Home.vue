<template>
    <div id="allText_div" @scroll="scroll($event)" >
      <div class="header">
        <mt-swipe :auto="4000" v-if="banner.length>0">
          <mt-swipe-item>
            <img :src="banner[0].image_path" class="imgs">
          </mt-swipe-item>
          <mt-swipe-item>
            <img :src="banner[1].image_path" class="imgs">
          </mt-swipe-item>
          <mt-swipe-item>
            <img :src="banner[2].image_path" class="imgs">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="recommend">
        <img src="../../static/img/recomend.png" class="recommend_img">
        <div class="rechangs">
          <div class="secound">
            <div class="secound_text" @click="goFunction('/Recharge')">
              <img src="../../static/img/chongzhi.png" class="img_se">
              <span class="img_span">充值金额</span>
            </div>
            <div class="secound_text" @click="goFunction('/DryingList')">
              <img src="../../static/img/liangdan.png" class="img_se">
              <span class="img_span">晾单夺宝</span>
            </div>
            <div class="secound_text" @click="goFunction('/FindFun')">
              <img src="../../static/img/haowan.png" class="img_se">
              <span class="img_span">发现好玩</span>
            </div>
            <div class="secound_text" @click="goFunction('/CustomerService')">
              <img src="../../static/img/kefu.png" class="img_se">
              <span class="img_span">客服中心</span>
            </div>
          </div>
        </div>
        <div class="rechangs">
          <div class="secarch">
            <div class="toutiao_div">
              <img src="../../static/img/toutiao.png" class="toutiao_png">
              <img src="../../static/img/laba.png" class="laba_png">
            </div>
            <!--<div class="box">-->
              <!--<div class="winBox">-->
                <!--<ul class="scroll">-->
                  <!--<li v-text="headlineData"></li>-->
                  <!--&lt;!&ndash;<li>连裤袜19元2双</li>&ndash;&gt;-->
                  <!--&lt;!&ndash;<li>连裤袜19元2双</li>&ndash;&gt;-->
                  <!--&lt;!&ndash;<li>连裤袜19元2双</li>&ndash;&gt;-->
                <!--</ul>-->
              <!--</div>-->
            <!--</div>-->
            <div class="marquee_box">
              <ul class="marquee_list" :class="{'marquee_top':animate}">
                <li v-for="(item, index) in marqueeList" style="width: 260px;text-align: left;height:36px;line-height:28px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                  <span v-text="item" style="font-size: 12px;font-weight: 600"></span>
                </li>
              </ul>
            </div>
            <div class="sousuo_div">
              <span class="xian"></span>
              <!--<span class="sousuo_name"></span>-->
            </div>
          </div>
        </div>
      </div>

      <div class="tuijian" v-if="recommend_data.length>0">
        <div class="rcd_left" @click="goBoutique(recommend_data[0].commodity_id)">
          <div class="rcd_left_name"><span style="margin-top: 5px;display: inline-block">精选推荐</span></div>
          <div class="rcd_left_text"><span  class="shouji_text" v-text="recommend_data[0].name"></span></div>
          <div class="rcd_left_img">
            <img :src="handleImg(recommend_data[0].commodity_images)" class="shouji_img">
          </div>
        </div>
        <div class="rcd_right">
          <div class="rcd_right_two"  @click="goBoutique(recommend_data[1].commodity_id)">
            <div class="collection">
              <span class="collection_name">经典收藏</span>
              <span class="collection_text" v-text="recommend_data[1].name"></span>
            </div>
            <img :src="handleImg(recommend_data[1].commodity_images)" class="collection_img">
          </div>
          <div class="rcd_right_three" @click="goBoutique(recommend_data[2].commodity_id)">
            <div class="tuijian_text" style="border-right: 1px solid #e0e0e0" >
              <div><span class="tuijian_span">精品推荐</span></div>
              <div> <span class="collection_text" style="margin: 0;width: 80px" v-text="recommend_data[2].name"></span></div>
              <img :src="handleImg(recommend_data[2].commodity_images)" style="margin-top: 5px;width: 70px;height: 58px;margin-right: 0" class="collection_img">
            </div>
            <div class="tuijian_text" @click="goBoutique(recommend_data[3].commodity_id)">
              <div><span class="tuijian_span" >爆款</span></div>
              <div> <span class="collection_text" style="margin: 0;width: 80px" v-text="recommend_data[3].name"></span></div>
              <img :src="handleImg(recommend_data[3].commodity_images)" style="margin-top: 5px;width: 70px;height: 58px;margin-right: 0" class="collection_img">
            </div>
          </div>
        </div>
      </div>

      <div class="models">
        <div class="model_div" :class="{'way_color':way_color===6}" @click="recommend(1)">推荐</div>
        <!--<div class="model_div" :class="{'way_color':way_color===1}" @click="recommend(1)">最热</div>-->
        <div class="model_div" :class="{'way_color':way_color===2}" @click="recommend(2)">最快</div>
        <div class="model_div" :class="{'way_color':way_color===3}" @click="recommend(3)">最新</div>
        <div class="model_div" :class="{'way_color':way_color===4}" @click="recommend(5)">高价</div>
        <div class="model_div" :class="{'way_color':way_color===5}" @click="recommend(4)">低价</div>
      </div>

      <div class="details">
        <div class="details_div" @click="goDetails(item.period_pk)" v-for="(item,id) in commodities">
          <img :src="handleImg(item.commodity_images)" onerror="onerror=null; src='../../static/img/notext.png'" class="drive_img">
          <div style="text-align: left"><span class="suijiget" v-text="item.commodity_name"></span></div>
          <div style="width: 90%;margin-left: 5%"><mt-progress :value="percentage(item.rate)" :bar-height="5"></mt-progress></div>
          <div class="percentage">
            <span>总需：<span v-text="item.total_renci"></span></span>
            <span>剩余：<span v-text="item.residue_renci"></span></span>
          </div>
          <img src="../../static/img/miao.png" class="miaokai_img" v-if="item.commodity_reward_type===1">
          <img src="../../static/img/dai.png" class="miaokai_img" v-else>
        </div>
      </div>
      <div class="bottom_div"></div>
      <WinningBox v-show="showbox==='true'"/>
    </div>
</template>

<script>
  // $(function() {
  //   var num = 0;
  //   function goLeft() {
  //     //750是根据你给的尺寸，可变的
  //     if (num == -750) {
  //       num = 0;
  //     }
  //     num -= 1;
  //     $(".scroll").css({
  //       left: num
  //     })
  //   }
  //   //设置滚动速度
  //   var timer = setInterval(goLeft, 10);
  //   //设置鼠标经过时滚动停止
  //   $(".box").hover(function() {
  //       clearInterval(timer);
  //     },
  //     function() {
  //       timer = setInterval(goLeft, 10);
  //     })
  // });
  import WinningBox from '@/components/WinningBox'
    export default {
        name: "Home",
      data(){
          return {
            secarch:'',
            showbox:false,
            banner:[],//轮播图
            way_color:6,//控制推荐按钮颜色
            commodities:[],//商品
            recommend_data:[],//精选推荐
            animate:false,
            headlineTime:null,//文字滚动定时器
            realTime:null,//监测中奖弹框倒计时
            headerText:null,//监测头条内容请求
            headlineData:'',
            scrollText:'',
            isFirstEnter:false,
            marqueeList:[]

        }
      },
      methods:{
        goFunction:function (url) {
          this.$router.push({path:url})
        },
          //精品推荐跳转详情
          goBoutique:function(id){
              this.$router.push({path:'/CommodityDetails' ,query: {commodity_id: id}})
          },
        //查看商品详情
        goDetails:function (pk) {
          this.$router.push({path:'/CommodityDetails' ,query: {pk: pk}})
        },
        //推荐
        recommend:function(id){
          this.way_color=id;
          this.getList(id);
        },
        //百分比
        percentage:function(id){
          return parseInt(id*100)
        },
        //处理图片
        handleImg:function(img){
          let image=img.split(',');
          if(image.length>=1){
            return image[0];
          }
        },
        // 开始滚动
        start() {
          let that=this;
          that.headlineTime = setInterval(() => {
            // 截取首个字符
            let head = that.headlineData.substring(0, 1);
            // 截取除首个字符外的所有字符
            let foot = that.headlineData.substring(1);
            // 拼接后重新渲染text属性值
            that.headlineData = foot + head;
          },1000);
        },
        //主页商品
        getList:function (type) {
          let that=this;
          this.$get(this.$stors.state.ip+'/snatchtreasure/homepage/?order_type='+type).then(function (res) {
            if(res.code===0){
              that.banner=res.data.banner;
              that.commodities=res.data.commodities;
              that.recommend_data=res.data.recommend;
            }

          })
        },
        //头条
        headlines:function(){
          let that=this;
          let stors=this.$stors;
          stors.state.soonOpen=true;
          this.$get(this.$stors.state.ip+'/snatchtreasure/headline/').then(function (res) {
            if(res.data.headline!==null){
              that.headlineData=res.data.headline;
              let list=res.data.headline.split('|');
              that.marqueeList=list;
              // that.start();
            }
            stors.state.soonOpen=false;
          })
        },
        scroll:function (event) {
          this.scrollText=event.target.scrollTop;
        },
        processingData:function () {
          let that=this;
          //每10秒请求一次头条内容
          that.headerText=setInterval(function () {
            that.headlines();
          },60000);
          //每0.5秒监测是否中奖
          that.realTime=setInterval(function (){
            that.showbox=localStorage.getItem('showWinning');
          },500);
          setInterval (this.showMarquee, 4000);
        },
        stopThis:function () {
          let that=this;
          localStorage.setItem('showWinning','false');
          //关闭实时监测
          clearInterval(that.headlineTime);
          clearInterval(that.realTime);
          that.realTime=null;
          clearInterval(that.headerText);
          clearInterval(this.showMarquee);

        },
        showMarquee: function () {
          let that=this;
          that.animate = true;
          setTimeout (() => {
            that.marqueeList.push (that.marqueeList[ 0 ]);
            that.marqueeList.shift ();
            that.animate = false;
          }, 1500);

        }
      },
      beforeDestroy() {
         this.stopThis();
      },
      mounted() {
        let that=this;
        that.getList(1);
        that.headlines();
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
      //进入该页面时，用之前保存的滚动位置赋值
      beforeRouteEnter (to, from, next) {
        next(vm => {
          document.getElementById('allText_div').scrollTop=vm.scrollTop;
        })
      },
      //在页面离开时记录滚动位置
      beforeRouteLeave (to, from, next) {
        this.scrollTop = this.scrollText;
        this.stopThis();

        // console.log(this.scrollTop)
        next()
      },
      components:{
        'WinningBox':WinningBox
      },
    }
    // var hrt = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
    // window.onload = function(){ //在页面整体加载完毕时
    //   document.getElementById('app').style.height= hrt+'px'//把获取到的高度赋值给根div
    // }
</script>

<style>
  html,body{
    width: 100%;
    height:100%;
    overflow: hidden;
  }
  #app{
    /*overflow: hidden;*/
    /*overflow-y: scroll;*/
    height: 100%;
  }
</style>
<style scoped>
  .header{
    width: 100%;
    height: 170px;
  }
  .imgs{
    width: 100%;
    height: 100%;
  }
  li {
    list-style:none;
  }
  .box {
    width: 80%;
  }

  .marquee {
    width: 100%;
    height: 50px;
    align-items: center;
    color: #3A3A3A;
    background-color: #b3effe;
    display: flex;
    box-sizing: border-box;
  }

  .marquee_title {
    padding: 0 20px;
    height: 30px;
    font-size: 14px;
    border-right: 1px solid #d8d8d8;
    align-items: center;
  }

  .marquee_box {
    display: block;
    position: relative;
    width: 72%;
    height: 30px;
    overflow: hidden;
  }

  .marquee_list {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .marquee_list li, span {
    margin: 0;
    padding: 0;
    /*display: flex;*/
    /*box-sizing: border-box;*/
  }
  .marquee_top {
    transition: all 0.5s;
    margin-top: -36px
  }
  .winBox {
    width:100%;
    height:40px;
    overflow:hidden;
    position:relative;
  }
  .scroll {
    /*width的大小是根据下面li的长度和多少个li而定的，需注意！*/
    width:260px;
    position:absolute;
    left:0;
    top:0;
  }
  .scroll li {
    width:800px;
    float:left;
    line-height:40px;
    text-align:center;
  }

  #allText_div{
    overflow: hidden;
    overflow-y: scroll;
    height: 100%;
  }
  #box{
    height: 32px;
    line-height: 30px;
    overflow: hidden;
    transition: all 0.5s;
    text-align: left;
    font-size: 14px;
    color: #ff5b6a;
    font-weight: 600;
  }
  .anim{
    transition: all 0.5s;
  }
  #con1 li{
    list-style: none;
    line-height: 30px;
    height: 30px;
  }
  .way_color{
    color: #e6322c;
  }
  .recommend{
    width: 100%;
    height: 142px;
    position: relative;
  }
  .recommend_img{
    width: 100%;
    position: absolute;
    top:-16px;
    left: 0;
    height: 158px;
  }
  .rechangs{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .secound{
    width: 90%;
    display: flex;
    justify-content: space-between;
    z-index: 99;
    margin-top: 12px;

  }
  .mt-progress-runway{
    background: #b5b1b1!important;
  }
  .secound_text{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .img_se{
    width: 38px;
    height: 38px;
  }
  .img_span{
    font-size: 13px;
    color: white;
    font-weight: 600;
    margin-top: 5px;
  }
  .secarch{
    width: 90%;
    background: white;
    height: 38px;
    z-index: 99;
    margin-top: 20px;
    border-bottom-left-radius: 30px;
    border-top-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-right-radius: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .toutiao_div{
    width: 20%;
  }
  .input_div{
    width: 71%;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .suijiget{
    display: inline-block;
    font-size: 13px;
    text-align: left;
    width: 160px;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .sousuo_div{
    width: 7%;
    margin-left: 2px;
    text-align: left;
    display: flex;
    align-items: center;
  }
  .mint-searchbar{
    padding: 0 !important;
  }
  .sousuo_input{
    width: 100%;
    height: 38px;
    border: 0;

  }
  .toutiao_png,.laba_png{
    width: 30px;
    height: 18px;
  }
  .laba_png{
    width: 19px;
  }
  .xian{
    display: inline-block;
    width: 2px;
    background: #d9d9d9;
    height: 26px;
    margin-right: 5px;
  }
  .sousuo_name{
    font-size: 15px;
    color: #888;
  }
  .tuijian{
    width: 100%;
    height: 210px;
    background: white;
    display: flex;
    justify-content: space-between;
  }
  .rcd_left{
    width: 40%;
    height: 100%;
    border-right: 1px solid #e0e0e0;
  }
  .rcd_left_name{
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: red;
    font-weight: 600;
  }
  .rcd_left_text{
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #a3a3a3;
    margin-top: 8px;
  }
  .shouji_text{
    display: inline-block;
    width: 84px;
    text-align: left;
    background: white;
    border-radius: 5px;
    padding: 5px;
  }
  .shouji_img{
    width: 90px;
    height: 98px;
    margin-top: 6px;
  }
  .rcd_left_img{

  }
  .rcd_right{
    width: 60%;
    height: 100%;
  }
  .miaokai_img{
    width: 28px;
    height: 30px;
    position: absolute;
    top: 3px;
    left: 10px;
  }
  .rcd_right_two{
    width: 100%;
    height: 40%;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
  }
  .collection{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .collection_name{
    display: inline-block;
    color: red;
    font-size: 16px;
    font-weight: 600;
    margin-top: 6px;
    text-align: left;
    margin-left: 35px;
  }
  .collection_text{
    display: inline-block;
    width: 100px;
    text-align: center;
    background: white;
    border-radius: 5px;
    padding: 5px;
    font-size: 12px;
    margin-bottom: 17px;
    margin-left: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .collection_img{
    width: 75px;
    height: 63px;
    margin-top: 9px;
    margin-right: 9px;
  }
  .rcd_right_three{
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: space-between;
  }
  .tuijian_text{
    width: 50%;
  }
  .tuijian_span{
    font-size: 14px;
    font-weight: 600;
  }
  .models{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #fcfcfc;
    /*margin-top: 10px;*/
    font-size: 15px;
    color: #3b3b3b;
  }
  .model_div{
    width: 20%;
    height: 40px;
    line-height: 40px;
  }
  .details{
    width: 100%;
    float: left;
    background: #eeeeee;
  }
  .details_div{
    width: 49%;
    float: left;
    background: white;
    border-radius: 5px;
    margin-left: 2px;
    margin-top: 1px;
    position: relative;
  }
  .drive_img{
    height: 150px;
    padding-top: 10px;
  }
  .percentage{
    display: flex;
    width: 90%;
    margin-left: 5%;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    font-size: 10px;
    color: #a3a3a3;
  }
  .bottom_div{
    float: left;
    height: 108px;
    width: 100%;
  }
</style>
