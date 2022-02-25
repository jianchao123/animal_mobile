<template>
      <div class="allText_div"  :style="{height:bodyHeight,'-webkit-overflow-scrolling': scrollMode}" ref="myScrollbar" id="all_div"  @scroll="scroll">
        <!--:top-method="loadTop" -->
      <mt-loadmore
                   :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   :bottomPullText='bottomText'
                   ref="loadmore"
                   :auto-fill="autoFill"
                   :bottomDistance="bottomDistance">
          <div class="header" v-for="(item,id) in dataList" v-if="item.period_status!==6" @click="goDetails(item.period_pk)">
            <div class="header_img">
              <img :src="handleImg(item.commodity_images)" onerror="onerror=null;src='../../static/img/notext.png'" class="img_open">
            </div>
            <div class="header_div">
              <div class="now_money">
                <span v-text="item.commodity_name"></span>
              </div>
              <!--倒计时-->
              <div class="now_sum" v-if="item.period_status===4||item.period_status===3">
                <img src="../../static/img/jishi.png" class="now_img">
                <span class="now_text" v-text="item.countdown_millisecond"></span>
              </div>
              <div class="now_sum" v-else>
                <img src="../../static/img/jishi.png" class="now_img">
                <span class="now_text" v-text="cycleType(item.period_status)"></span>
              </div>

            </div>
            <img src="../../static/img/miao.png" class="miaokai_img" v-if="item.commodity_reward_type===1">
            <img src="../../static/img/dai.png" class="miaokai_img" v-else>
          </div>
          <div class="header" v-for="(items,id) in dataList" v-if="items.period_status===6" @click="goDetails(items.period_pk)">
          <div class="header_img">
            <img :src="handleImg(items.commodity_images)" class="img_open">
          </div>
          <div class="header_div">
            <div class="now_money">
              <span v-text="items.commodity_name"></span>
            </div>
            <div class="time_sum">
              <div class="left_name">
                <div class="name_text">商品价值：￥
                  <span style="color: black;font-weight: 600;font-size: 14px" v-text="items.market_price_cny"></span>
                </div>
                <div class="name_text" style="overflow: hidden;text-align: left;text-overflow: ellipsis;white-space: nowrap;width: 200px">获奖用户：
                  <span style="color: #0f9af7;font-size: 14px;font-weight: 600;">{{items.luck_player_nickname}}</span>
                </div>
                <div class="name_text">参与人次：
                  <span style="color: #face09;font-size: 14px;"  >{{items.participate_renci}}人次</span>
                </div>
                <div class="name_text">揭晓时间：
                  <span style="color: black;font-size: 14px;" v-text="items.open_lottery_time"></span>
                </div>
              </div>
              <div class="right_img">
                <img :src="items.luck_player_headimage" class="myimg"
                     @click.stop="goUserDetail(items.luck_player_pk,items.luck_player_headimage,items.luck_player_nickname)">
              </div>
            </div>
          </div>
          <img src="../../static/img/miao.png" class="miaokai_img" v-if="items.commodity_reward_type===1">
          <img src="../../static/img/dai.png" class="miaokai_img" v-else>
        </div>
      <div class="bottom_div"></div>
      <WinningBox v-show="showbox==='true'"/>
      </mt-loadmore>
      </div>
</template>

<script>
  import WinningBox from '@/components/WinningBox'
    export default {
        name: "Unveiled",
        data(){
            return {
                dataList:[],
                count: '',
                timer: true,
                showbox:false,
                allLoaded:false,
                realTime:null,
                bottomText:'上拉加载更多...',
               bodyHeight:'',//body高度
                scrollTop:'',
                scrollText:0,
              isFirstEnter:false,
              scrollMode:'auto',
              autoFill:false,
              bottomDistance:10
            }
        },
        components:{
          'WinningBox':WinningBox
        },
        methods:{
          //下拉刷新
          // loadTop:function(){
          //   let that=this;
          //   that.allLoaded = true;
          //   that.getList();
          //   that.allLoaded = false;
          //   setTimeout(function () {
          //     that.$refs.loadmore.onTopLoaded();
          //   },1000);
          // },
          // 上拉加载
          loadBottom:function(){
            let that = this;
            let sh = that.$refs['myScrollbar'].scrollHeight;// 滚动条高度
            let st = that.$refs['myScrollbar'].scrollTop; // 滚动条距离顶部的距离
            let ch = that.$refs['myScrollbar'].clientHeight; // 滚动条外容器的高度
            if (st + ch >= sh) {
              console.log(1111)
              //到底了-业务逻辑
              that.allLoaded = true;
              setTimeout(function () {
                that.$refs.loadmore.onBottomLoaded();
              },1000);
              that.scrollMode='touch'
              that.bottomList(that.dataList[that.dataList.length-1].period_pk);

            }
          },
          bottomList:function(last_pk){
            let that=this;
            this.$get(this.$stors.state.ip+'/snatchtreasure/newdrawlottery/?last_pk='+last_pk).then(function (res) {
              if(res.data.length>0){
                for (let i=0;i<res.data.length;i++){
                  that.dataList.push(res.data[i])
                }
              }
              that.soonOpen(that.dataList);
              that.allLoaded = false;
            })
          },
            //处理图片
            handleImg:function(img){
                let image=img.split(',');
                if(image.length>=1){
                    return image[0];
                }
            },
            //详情
            goDetails:function(pk){
                this.$router.push({path:'/CommodityDetails' ,query: {pk: pk}})
            },
            //周期状态
            cycleType:function(type){
                if(type===1){
                    return '筹备中'
                }else if(type===2){
                    return '筹备完成'
                }else if(type===5){
                    return '开奖中'
                }else if(type===6){
                    return '已开奖'
                }
            },
            //用户中奖，参与记录
            goUserDetail:function(player_pk,luckyUrl,luckyName){
              this.$router.push({path:'/UserDetail',query: {player_pk: player_pk,luckyUrl:luckyUrl,luckyName:luckyName}})
            },
            //实时监测状态
            detatilsData:function(pk,j){
                let that=this;
                let list=[];
                let stors=this.$stors;
                //不需要加载icon
                stors.state.soonOpen=true;
                this.$get(this.$stors.state.ip+'/snatchtreasure/commoditydetailpage/?period_pk='+pk).then(function (res) {
                  //循环赋值
                  that.dataList.forEach((item,index)=>{
                    if(index===j){
                      that.dataList[index].commodity_images=res.data.commodity_detail_data.commodity_images;
                      that.dataList[index].commodity_name=res.data.commodity_detail_data.commodity_name;
                      that.dataList[index].market_price_cny=res.data.commodity_detail_data.market_price_cny;
                      that.dataList[index].participate_renci=res.data.commodity_detail_data.amounts_prepared;
                      that.dataList[index].open_lottery_time=res.data.commodity_detail_data.open_lottery_time;
                      that.dataList[index].luck_player_nickname=res.data.commodity_detail_data.luck_player_nickname;
                      that.dataList[index].luck_player_headimage=res.data.commodity_detail_data.luck_player_headimg;
                      //当状态为6说明已经开奖不显示‘即将揭晓’,显示所有数据
                      if(res.data.commodity_detail_data.status===6){
                        that.dataList[index].open_index=-10;
                        that.dataList[index].period_status=6;
                      }
                    }
                    list.push(that.dataList[index]);
                  });
                  that.dataList=list;
                  stors.state.soonOpen=false;
              });
            },
            //即将揭晓和倒计时
            soonOpen:async function(time) {
                let that=this;
                for (let i=0;i<time.length;i++){
                  //当countdown_millisecond不等于空而且得是数字的时候倒计时
                  if(time[i].countdown_millisecond === "" || time[i].countdown_millisecond ==null){
                    time[i].countdown_millisecond='等待B值中';
                  }else if(!isNaN(time[i].countdown_millisecond)){
                        let milliSecond = time[i].countdown_millisecond / 10;
                        let minute;
                        let milli;
                        let second;
                        let count = setInterval(() => {
                            milliSecond = parseInt(milliSecond - 1);
                            if (milliSecond < 0) {
                                clearInterval(count);
                            } else {
                                minute = Math.floor(milliSecond * 10 / 1000 / 60 % 60);
                                second = Math.floor(milliSecond * 10 / 1000 % 60);
                                milli = Math.floor(milliSecond * 10 % 1000);
                                if (milli < 100) {
                                    milli = "0" + milli;
                                    if (milli < 10) {
                                        milli = '00'
                                    }
                                }
                                if (second < 10) {
                                    second = "0" + second;
                                }
                                if (minute < 10) {
                                    minute = "0" + minute;
                                }
                            }
                            //倒计时完了赋值
                            time[i].countdown_millisecond= minute + ':' + second + ':' + milli;
                            //当倒计时为0,先显示即将揭晓
                            if(time[i].countdown_millisecond==='00:00:00'){
                                time[i].countdown_millisecond='即将揭晓';
                                time[i].openthis=1;
                              for (let j=0;j<that.dataList.length;j++){
                                //当数组下标一样时赋值且openthis===1的时候进入倒计时
                                if(i===j){
                                  that.dataList[j].countdown_millisecond=time[i].countdown_millisecond;
                                  that.dataList[j].openthis=time[i].openthis;
                                  if(that.dataList[j].openthis===1){
                                      let open_index=setInterval(() =>{
                                        //detatilsData方法里open_index字段等于-10,那么关闭定时器
                                        if(that.dataList[j].open_index===-10){
                                            clearInterval(open_index);
                                        }else {
                                            that.detatilsData(time[j].period_pk,j);
                                        }
                                    },1000);
                                  }
                                }
                              }
                            }else {
                              for (let j=0;j<that.dataList.length;j++){
                                if(that.dataList[j]===time[i]){
                                  that.dataList[j].countdown_millisecond=time[i].countdown_millisecond;
                                }
                              }
                            }

                        }, 10);
                    }

                }
            },
            getList:function (type) {
                let that=this;
                this.$get(this.$stors.state.ip+'/snatchtreasure/newdrawlottery/?last_pk=999999999').then(function (res) {
                    that.soonOpen(res.data);
                    that.dataList=res.data;
                })
            },
          scroll:function (event) {
            this.scrollText=event.target.scrollTop
          },
          getTimes:function(){
            //每0.5秒监测是否中奖
            let that=this;
            that.realTime=setInterval(function (){
              that.showbox=localStorage.getItem('showWinning');
            },500);
          },
          processingData:function () {
            let that=this;
            that.bodyHeight=document.body.offsetHeight-80+'px';
            document.querySelector('body').setAttribute('style', 'overflow:hidden');
            this.getList();
          }
        },//
      beforeDestroy() {
        let that=this;
        //关闭实时监测
        clearInterval(that.realTime);
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
          that.getTimes();
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
          document.getElementById('all_div').scrollTop=vm.scrollTop;
        })
      },
      //在页面离开时记录滚动位置
      beforeRouteLeave (to, from, next) {
        let that=this;
        this.scrollTop = this.scrollText;
        localStorage.setItem('showWinning','false');
        //关闭实时监测
        clearInterval(that.realTime);
        // console.log(this.scrollTop)
        next()
      },
      destroyed: function () {
          let that=this;
          for (let i=0;i<that.dataList.length;i++){
            clearInterval(that.dataList[i].open_index);
            that.dataList[i].open_index=null;
          }

      },
    }
</script>

<style scoped>
  .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: white;
    margin-top: 1px;
    float: left;
    position: relative;
    border-bottom: 1px solid #eeeeee;
  }
  .header_img{
    width: 34%;
  }
  .allText_div{
    width: 100%;
    overflow-y: scroll;
    /*margin-bottom: 60 px;*/
  }
  .header_div{
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .miaokai_img{
    width: 28px;
    height: 30px;
    position: absolute;
    top: 12px;
    left: 10px;
  }
  .img_open{
    margin-top: 20px;
    height: 135px;
    border-radius: 20px;
    margin-bottom: 8px;
    max-width: 100%;
  }
  .now_money{
    width: 230px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
    font-size: 15px;
    font-weight: 600;
    margin-top: 30px;
  }
  .now_sum{
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 38px;
  }
  .now_img{
    width: 40px;
    height: 40px;
    margin-right: 10px;

  }
  .now_text{
    font-size: 31px;
    color: red;
    font-weight: 600;
  }
  .time_sum{
    display: flex;
    justify-content: space-between;
    margin-bottom: 13px;
  }
  .left_name{
    width: 65%;
  }
  .right_img{
    width: 35%;
  }
  .name_text{
    font-size: 12px;
    color: #3e3e3e;
    text-align: left;
  }
  .myimg{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 35px;
    margin-right: 10px;
  }
  .bottom_div{
    float: left;
    /*height: 108px;*/
    width: 100%;
  }
</style>
