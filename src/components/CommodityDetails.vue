<template>
      <div  class="allText_div"  ref="element"   @scroll="scrolls($event)" id="all_div">
        <!--<mt-loadmore :top-method="loadTop" v-cloak-->
                     <!--:bottom-all-loaded="allLoaded"-->
                     <!--:autoFill='false'-->
                     <!--ref="loadmore">-->
          <div class="header_back">
            <div class="left_img" :class="{'img_back':scroll_top>=100}">
              <div class="img_return" :class="{'img_back':scroll_top>=100}" style="margin-left: 20px;" @click="goback">
                <img src="../../static/img/comBack.png" style="width: 20px;height: 20px" v-show="scroll_top<=99">
                <img src="../../static/img/blanck_left.png" style="width: 20px;height: 20px" v-show="scroll_top>=100">
              </div>
             <div class="img_return" :class="{'img_back':scroll_top>=100}" style="margin-right: 20px;" @click="gohome">
               <img src="../../static/img/comIndex.png" style="width: 24px;height: 24px" v-show="scroll_top<=99">
               <img src="../../static/img/black_index.png" style="width: 24px;height: 24px" v-show="scroll_top>=100">
             </div>

            </div>
            <div class="text_img">
              <mt-swipe :auto="4000" id="swipe">
                <mt-swipe-item v-for="(val,index) in imgs " :key="index" style="display: flex;justify-content: center;align-items: center">
                  <img :src="val" class="details_img" >
                  <!--<img src="../../static/img/ceshi.gif" class="details_img">-->
                </mt-swipe-item>

              </mt-swipe>
            </div>

          </div>

          <div class="detial_all">
            <div class="img_all">
              <div class="name_img">
                <div style="text-align: left;display: flex;justify-content: space-between;align-items: center">
                  <span class="name_header" style="border: 0;height: 19px" v-text="cycleType(dataList.status)" :style="[status_back]"></span>
                  <span class="name_text" v-text="dataList.commodity_name"></span>
                </div>
                <div style="text-align: left;margin-top: 5px;display: flex;justify-content: space-between;align-items: center">
                  <span class="name_header">期 号</span>
                  <span class="name_text" v-text="dataList.period_no"></span>
                </div>
                <div style="text-align: left;margin-top: 5px;display: flex;justify-content: space-between;align-items: center">
                  <span class="name_header">单 价</span>
                  <span class="name_text" style="color: red" v-text="dataList.unit_price+'.00元/人次'"></span>
                </div>
              </div>
            </div>

            <div class="jindu_div">
              <div class="jindutiao"><mt-progress :value="dataList.rate*100" :bar-height="5"></mt-progress></div>
              <div class="pelple">
                <span >总需人次：<span style="color: #febd17" v-text="dataList.target_amounts"></span></span>
                <span>剩余人次：<span style="color: #febd17" v-text="dataList.target_amounts-dataList.amounts_prepared"></span></span>
              </div>
            </div>

            <div class="countDown" v-if="lottery===0" v-cloak>
              <span v-text="soonOpenNumber"></span>
            </div>

            <div class="lucky_names" v-if="lottery===1">
              <img src="../../static/img/luckyname.png" class="lucky_imgs">
              <div style="margin-left: 13%;margin-top: 10px">
                <div class="out_div" style="margin-left: 5px;width: auto">
                  <div class="div_hao" >
                    <img :src="luckyUser.luckyimg" class="touxiang" style="border-radius: 10px;width: 54px;height: 54px"
                         @click="goUserDetail(luckyUser.luckyPk,luckyUser.luckyimg,luckyUser.luckyGuy)">
                  </div>
                </div>
              </div>
              <div class="username">
                <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 195px">获奖用户:<span>{{luckyUser.luckyGuy}}</span></p>
                <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 195px">用户地址:
                  <span >{{luckyUser.luckyAdrress}}</span>
                </p>
                <p>本次参与:
                  <span>{{luckyUser.luckyPerson}}</span>
                  人次
                </p>
                <p >揭晓时间:
                  <span>{{luckyUser.luckyTime}}</span>
                </p>
              </div>
            </div>

            <div style="" class="lucky_all" v-if="lottery===1">
              <span  style="margin-left: 3%;">幸运号码</span>
              <span >
            {{luckyUser.luckyNumber}}
          </span>
            </div>

            <div class="login" @click="newUrl(noticedata)">
              <span v-text="notices(noticedata)"></span>
            </div>

          </div>
          <!--判断太多慢慢看-->
          <div>
            <div class="all_ranking">
              <div class="ranking_div">
                <div class="first_div">
                  <img src="../../static/img/rongyu.png" class="rongyu_img" >
                  <div class="three_div" @click="listRule">
                    上榜规则>>
                  </div>
                </div>
                <div class="secound_div" >
                  <div class="out_div" style="margin-left: 5px" v-if="honorData.length>0">
                    <div class="div_hao">
                      <img :src="honorData[0].player_headimage" class="touxiang"
                           @click="goUserDetail(honorData[0].player_id,honorData[0].player_headimage,honorData[0].player_nickname)">
                      <img src="../../static/img/shenhao.png" class="fuhao_img">
                    </div>
                    <div>
                      <div style="font-size: 13px;color: #afafaf" v-text="honorData[0].participate_renci+'人次'"></div>
                      <div style="font-size: 13px;color: #afafaf;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 80px" v-text="honorData[0].player_nickname"></div>
                    </div>
                  </div>
                  <div class="out_div" style="margin-left: 5px" v-else>
                    <div class="div_hao">
                      <img src="../../static/img/wode.png" class="touxiang">
                      <img src="../../static/img/shenhao.png" class="fuhao_img">
                    </div>
                    <div>
                      <div style="font-size: 13px;color: #afafaf;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 80px" >虚位以待</div>
                    </div>
                  </div>
                  <div class="out_div" v-if="honorData.length>1">
                    <div class="div_hao">
                      <img :src="honorData[1].player_headimage" class="touxiang"
                           @click="goUserDetail(honorData[1].player_id,honorData[1].player_headimage,honorData[1].player_nickname)">
                      <img src="../../static/img/fuhao.png" class="fuhao_img">
                    </div>
                    <div>
                      <div style="font-size: 13px;color: #afafaf" v-text="honorData[1].participate_renci+'人次'"></div>
                      <div style="font-size: 13px;color: #afafaf;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 80px" v-text="honorData[1].player_nickname"></div>
                    </div>
                  </div>
                  <div class="out_div" v-else>
                    <div class="div_hao">
                      <img src="../../static/img/wode.png" class="touxiang">
                      <img src="../../static/img/fuhao.png" class="fuhao_img">
                    </div>
                    <div>
                      <div style="font-size: 13px;color: #afafaf;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 80px" >虚位以待</div>
                    </div>
                  </div>

                  <div class="out_div" v-if="honorData.length>2">
                    <div class="div_hao">
                      <img :src="honorData[2].player_headimage" class="touxiang"
                           @click="goUserDetail(honorData[2].player_id,honorData[2].player_headimage,honorData[2].player_nickname)">
                      <img src="../../static/img/tuhao.png" class="fuhao_img">
                    </div>
                    <div>
                      <div style="font-size: 13px;color: #afafaf" v-text="honorData[2].participate_renci+'人次'"></div>
                      <div style="font-size: 13px;color: #afafaf;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 80px" v-text="honorData[2].player_nickname"> </div>
                    </div>
                  </div>
                  <div class="out_div" v-else>
                    <div class="div_hao">
                      <img src="../../static/img/wode.png" class="touxiang">
                      <img src="../../static/img/tuhao.png" class="fuhao_img">
                    </div>
                    <div>
                      <div style="font-size: 13px;color: #afafaf;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 80px"> 虚位以待</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="way_time">
            <div class="way_div" @click="calculation">
              <img src="../../static/img/jisuande.png" style="width: 20px;height: 20px;margin-left: 10px">
              <span style="margin-left: 8px">计算方式</span>
            </div>
            <div class="way_div" @click="pastPeriod">
              <img src="../../static/img/jiexiaode.png" style="width: 20px;height: 20px;margin-left: 10px">
              <span style="margin-left: 8px">往期揭晓</span>

            </div>
            <div class="way_div" style="border-bottom: 1px solid #909090" @click="attendance">
              <img src="../../static/img/zhongjiangde.png" style="width: 20px;height: 20px;margin-left: 10px">
              <span style="margin-left: 8px">参与记录</span>

            </div>
            <div class="way_div" @click="trendChart">
              <img src="../../static/img/zoushide.png" style="width: 20px;height: 20px;margin-left: 10px">
              <span style="margin-left: 8px">往期走势<span style="margin-left: 10px;font-size: 13px">最新20期，开奖公布</span></span>
            </div>

            <div class="price_div"  style="width: 100%;" >
              <div class="qishu" >
                <span class="span_color" style="background: #4ccb33;margin-right: 5px"></span>
                <span style="text-align: left">头部:<span v-text="each_part_data[0]"></span>期</span>
              </div>
              <div class="qishu">
                <span class="span_color" style="background: #71108A;margin-right: 5px"></span>
                <span style="text-align: left">前腰:<span v-text="each_part_data[1]"></span>期</span>
              </div>
              <div class="qishu" >
                <span class="span_color" style="background: #fa5617;margin-right: 5px"></span>
                <span style="text-align: left">中部:<span v-text="each_part_data[2]"></span>期</span>
              </div>
              <div class="qishu" style="margin-top: 15px">
                <span class="span_color" style="background: #f82dfb;margin-right: 5px"></span>
                <span style="text-align: left">后腰:<span v-text="each_part_data[3]"></span>期</span>
              </div>
              <div class="qishu" style="margin-top: 15px">
                <span class="span_color" style="background: #fde02c;margin-right: 5px"></span>
                <span style="text-align: left">尾部:<span v-text="each_part_data[4]"></span>期</span>
              </div>
              <div style="clear: both"></div>
            </div>
            <div class="price_text" v-show="noticedata===1||noticedata===7||noticedata===2"></div>
          </div>
          <mt-popup
            v-model="popupVisible"
            position="bottom">
            <div class="all_divs">
              <div class="number_text" v-if="quota_str.length>0">
                <div class="jiajian">
                  <span class="number_span" @click="reduceNumber">-</span>
                  <input class="number_input" type="number" v-model="moneyrenci">
                  <span class="number_span" @click="plusNumber">+</span>
                </div>
              </div>
              <div class="number_bottom" v-show="quota_str.length>0">
                <div class="money_span"  :class="{'class_back':back_this_color===index}" v-for="(val,index) in quota_str" @click="addMonesy(index,val)">{{val}}</div>
                <div class="money_span"  :class="{'class_back':back_this_color===-2}"
                     @click="addMonesy(-2,dataList.target_amounts-dataList.amounts_prepared)">包尾</div>
                <div style="clear: both;width: 100%"></div>
              </div>
              <div class="number_bottom" v-show="quota_str.length<1">
                <div class="money_span" :class="{'class_back':back_this_color===1}" @click="addMonesy(1,50)">50</div>
                <div class="money_span" :class="{'class_back':back_this_color===2}" @click="addMonesy(2,100)">100</div>
                <div class="money_span" :class="{'class_back':back_this_color===3}" @click="addMonesy(3,300)">300</div>
                <div class="money_span"  :class="{'class_back':back_this_color===-2}"
                     @click="addMonesy(-2,dataList.target_amounts-dataList.amounts_prepared)">包尾</div>
                <div style="clear: both;width: 100%"></div>
              </div>
              <div class="true_div" @click="participate">确定</div>
            </div>
          </mt-popup>

          <div class="nowOnce" @click="newUrl(noticedata)" v-if="noticedata===1||noticedata===7||noticedata===2" v-show="login==='1'">
            立即参与
          </div>

          <div class="zhezao" v-show="imgs_show===1" :style="{'height':rule_height}"></div>
          <div class="address" v-show="imgs_show===1" :style="{'height':rule_height}">
            <div class="address_div" >
              <img src="../../static/img/rulemoney.png" class="show_img">
              <div class="text_img_show">
                <p class="zhongjiang">上榜规则</p>
                <div class="commitid">
                  <p class="img_rule">
                    <img src="../../static/img/shenhao.png" class="rule_text">
                    <span class="rule_span">该商品购买人次最多的超级神豪</span>
                  </p>
                  <p class="img_rule">
                    <img src="../../static/img/fuhao.png" class="rule_text">
                    <span class="rule_span">该商品购买人次最多的超级富豪</span>
                  </p>
                  <p class="img_rule" style="border: 0">
                    <img src="../../static/img/tuhao.png" class="rule_text">
                    <span class="rule_span">该商品购买人次最多的超级土豪</span>
                  </p>
                </div>
              </div>
              <img src="../../static/img/close.png" class="close_img" @click="showimg">
            </div>
          </div>
          <WinningBox v-show="showbox==='true'"/>
        <!--</mt-loadmore>-->
      </div>
</template>

<script>
  import WinningBox from '@/components/WinningBox'
    export default {
        name: "CommodityDetails",
      data() {
        return {
          dataList:[],
          imgs:[],
          honorData:[],
          noticedata:0,
          each_part_data:[],
          popupVisible:false,
          soonOpenNumber:'',//倒计时
          moneyrenci:5,//购买次数
          login:'',
          show_index:0,
          imgs_show:0,//上榜规则弹框
          curHeight:'',//屏幕高度
          showbox:false,//中奖弹框
          allLoaded:false,
          luckyUser:{//中奖用户
            luckyimg:'',
            luckyNumber:'',
            luckyGuy:'',
            luckyAdrress:'',
            luckyPerson:'',
            luckyTime:'',
            luckyPk:'',
          },
          status_back:{
            background:'',
            color:''
          },
          scrollText:0,
          lottery:0,//倒计时完如果用户中奖了那么就显示中奖用户
          realTime:null,//监测中奖弹框倒计时
          quota_str:[],//定额串
          back_this_color:'',//定额串的背景颜色
          isFirstEnter:'',
          scroll_top:'',
          isNow:0
        }
      },
      beforeMount() {
        let that=this;
        let height = document.documentElement.clientHeight || document.body.clientHeight;
        that.curHeight=height+'px';
      },
      components:{
        'WinningBox':WinningBox
      },
      methods:{
        //下拉刷新
        // loadTop:function(){
        //   let that=this;
        //   that.allLoaded = true;
        //   clearInterval(that.realTime);
        //   if(that.noticedata===1||that.noticedata===7||that.noticedata===2){
        //     that.newUrl(6)
        //   }else {
        //     that.getList(this.$route.query.pk);
        //   }
        //   setTimeout(function () {
        //     that.$refs.loadmore.onTopLoaded();
        //   },1000);
        //   that.allLoaded = false;
        //
        // },
            //往期揭晓
        pastPeriod:function () {
          this.$router.push({path:'/PastPeriod',query: {id:this.dataList.commodity_id}})
        },
          //计算方式
        calculation:function () {
          this.$router.push({path:'/Calculation',query:{period_pk:this.dataList.pk}})
        },
        scroll:function (event) {
          let t, l, w, h;
          if (document.documentElement && document.documentElement.scrollTop) {
            t = document.documentElement.scrollTop;
            l = document.documentElement.scrollLeft;
            w = document.documentElement.scrollWidth;
            h = document.documentElement.scrollHeight;
          } else if (document.body) {
            t = document.body.scrollTop;
            l = document.body.scrollLeft;
            w = document.body.scrollWidth;
            h = document.body.scrollHeight;
          }
          return {
            top: t,
            left: l,
            width: w,
            height: h
          };
        },
          //往期走势
        trendChart:function () {
          this.$router.push({path:'/TrendChart',query:{period_pk:this.dataList.pk}})
        },
        //参与记录
        attendance:function(){
          this.$router.push({path:'/Attendance',query:{period_pk:this.dataList.pk}})
        },
        //增加购买次数
        addMonesy:function(id,text){
          this.moneyrenci=text;
          this.back_this_color=id;
        },
        //用户中奖，参与记录
        goUserDetail:function(player_pk,luckyUrl,luckyName){
          this.$router.push({path:'/UserDetail',query: {player_pk: player_pk,luckyUrl:luckyUrl,luckyName:luckyName}})
        },
        //减钱
        reduceNumber:function(){
          if( this.moneyrenci===1){
            return this.$toast('购买次数必须大于或等于1次');
          }else {
            this.moneyrenci--;
            this.back_this_color--;
          }
        },
        //加钱
        plusNumber:function(){
          this.moneyrenci++;
          this.back_this_color++;
        },
        //上榜规则弹框
        listRule:function(){
          let that=this;
          that.imgs_show=1;
          // let height= this.$refs.element.offsetHeight;  //100
          // that.rule_height=document.body.clientHeight+'px';
          // window.pageYOffset = 0;
          // document.body.scrollTop = 0;
          // document.documentElement.scrollTop = 0;
          // document.querySelector('body').setAttribute('style', 'overflow:hidden')
        },
        //关闭弹框
        showimg:function () {
          let that=this;
          that.imgs_show=0;
          document.querySelector('body').setAttribute('style', 'overflow:scroll;-webkit-overflow-scrolling: touch;')
        },
          //倒计时
        soonOpen:function(id){
            let that=this;
            let pk=this.$route.query;
            let milliSecond = id/ 10;
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
                that.soonOpenNumber= minute + ':' + second + ':' + milli;
                if(that.soonOpenNumber==='00:00:00'){
                    that.soonOpenNumber='即将揭晓';
                  let open_index=setInterval(() =>{
                    //detatilsData方法里open_index字段等于-10,那么关闭定时器
                    if(that.show_index===-10){
                      clearInterval(open_index);
                    }else {
                      that.detatilsData(pk.pk)
                    }
                  },1000);
                }
            }, 10);
        },
        //实时监测状态
        detatilsData:function(pk){
          let that=this;
          let stors=this.$stors;
          //不需要加载icon
          stors.state.soonOpen=true;
          this.$get(this.$stors.state.ip+'/snatchtreasure/commoditydetailpage/?period_pk='+pk).then(function (res) {
            if(res.data.commodity_detail_data.status===6){
              that.lottery=1;
              that.show_index=-10;
              that.getList(pk);
            }
            stors.state.soonOpen=false;
          });
        },
        toastText:function(msg){
            this.$toast(msg);
        },
        goback:function(){
          this.isNow =1;
          this.$router.go(-1);
        },
        gohome:function(){
          this.isNow =1;
          this.$router.replace({path:'/Index/Home'})
        },

        //购买人次
        participate:function(){
          let that=this;
          let pk=this.$route.query.pk;
          this.$post(this.$stors.state.ip+'/snatchtreasure/participate/',{
            period_id:that.dataList.pk,amounts:that.moneyrenci
          }).then(function (res) {
                if(res.code===0){
                  that.popupVisible=false;
                  that.moneyrenci='';
                  that.back_this_color='';
                  that.toastText('购买成功');
                  that.getList(pk);
                }
          })

        },
        //周期状态
        cycleType:function(type){
          let that=this;
          if(type===1){
            that.$set(that.status_back,'background', '#c42327');
            that.$set(that.status_back,'color', 'white');
            return '筹备中'
          }else if(type===2){
            that.$set(that.status_back,'background', '#c42327');
            that.$set(that.status_back,'color', 'white');
            return '筹备完成'
          }else if(type===3){
            that.$set(that.status_back,'background', '#e9d219');
            that.$set(that.status_back,'color', 'white');
            return '等待B值中'
          }else if(type===4){
            that.$set(that.status_back,'background', '#e9d219');
            that.$set(that.status_back,'color', 'white');
            return '倒计时中'
          }else if(type===5){
            that.$set(that.status_back,'background', '#e9d219');
            that.$set(that.status_back,'color', 'white');
            return '开奖中'
          }else if(type===6){
            that.$set(that.status_back,'background', '#35c482');
            that.$set(that.status_back,'color', 'white');
            return '已开奖'
          }
        },
        //如果为登陆那就登陆，不是最新一期就刷新
        newUrl:function(id){
          let that=this;
          let goback=this.$router;
          let stors=this.$stors;
          // if(id===6&&that.login==='1'){
            if(id===6){
            //注:6表示已开奖未参与,需要跳到最新一期
            //不需要加载icon
            stors.state.soonOpen=true;
            this.$get(this.$stors.state.ip+'/snatchtreasure/commoditydetailpage/?commodity_pk='+that.dataList.commodity_id).then(function (res) {
                let img=res.data.commodity_detail_data.commodity_images;
              let imgList=img.split(",");
              for (let i=0;i<imgList.length;i++){
                if(imgList[i].length<1){
                  imgList.splice(i,1);
                  i = i-1;
                }
              }
              that.imgs=imgList;
              that.honorData=res.data.honor_list_data;
                that.dataList=res.data.commodity_detail_data;
              if(res.data.commodity_detail_data.countdown_millisecond!==null){
                that.lottery=0;
                that.soonOpen(res.data.commodity_detail_data.countdown_millisecond);
              }else {
                that.lottery=2;
                if(res.data.luck_player_data.nickname){
                  that.lottery=1;
                  that.$set(that.luckyUser,'luckyimg', res.data.luck_player_data.headimage);
                  that.$set(that.luckyUser,'luckyNumber', res.data.luck_player_data.luck_token);
                  that.$set(that.luckyUser,'luckyGuy', res.data.luck_player_data.nickname);
                  that.$set(that.luckyUser,'luckyAdrress', res.data.luck_player_data.ip_address);
                  that.$set(that.luckyUser,'luckyPerson', res.data.luck_player_data.participate_amounts);
                  that.$set(that.luckyUser,'luckyTime', res.data.luck_player_data.reward_time);
                  that.$set(that.luckyUser,'luckyPk', res.data.luck_player_data.pk);
                }
              }
                that.soonOpenNumber='';
                that.noticedata=res.data.notice;
                for(let g=0;g<res.data.trend_map_data.each_part_data.length;g++){
                  if(res.data.trend_map_data.each_part_data[g]<10){
                    res.data.trend_map_data.each_part_data[g]='0'+ res.data.trend_map_data.each_part_data[g];
                  }
                }
                that.each_part_data=res.data.trend_map_data.each_part_data;
                stors.state.soonOpen=false;
            })
          // }else if(id===7||that.login!=='1'){
          }else if(id===7){
            localStorage.clear();
            stors.commit('changeChildText');
            //注:7表示未登陆, 需要先登陆获取商品详情页数据,再根据1或者6来进行跳转
            goback.replace({path: '/Login'});
          }else if(id===1||id===2){
            //注:1表示未开奖未参与,需要弹出底部参与框)
              that.popupVisible=true;
          }
        },

        //提示取值
        notices:function(id){
          let that=this;
          if(id===1){
            return '您尚未参与,快去参与吧！'
          }else if(id===2){
            return '您已参与,可继续参与!'
          }else if(id===3){
            return '正在开奖中,请等待！'
          }else if(id===4){
            return '很遗憾,您没有中奖!'
          }else if(id===5){
            return '恭喜您中奖了!'
          // }else if(id===6&&that.login==='1'){
          }else if(id===6){
            return '您尚未参与,快去参与吧！'
          // }else if(id===7||that.login!=='1'){
          }else if(id===7){
            return '您尚未登陆,请登录后参与！'
          }
        },
        getList:function (pk) {
          let that=this;
          let stors=this.$stors;
          //不需要加载icon
          stors.state.soonOpen=true;
          this.$get(this.$stors.state.ip+'/snatchtreasure/commoditydetailpage/?period_pk='+pk).then(function (res) {
            let img=res.data.commodity_detail_data.commodity_images;
            let imgList=img.split(",");
            for (let i=0;i<imgList.length;i++){
              if(imgList[i].length<1){
                imgList.splice(i,1);
                i = i-1;
              }
            }
            that.imgs=imgList;
            let quota_str=res.data.commodity_detail_data.quota_str;
            if(quota_str!==null&&quota_str!==''){
              that.quota_str=quota_str.split(',');
            }else {
              that.quota_str=[];
            }
            that.honorData=res.data.honor_list_data;
            that.dataList=res.data.commodity_detail_data;
            if(res.data.commodity_detail_data.countdown_millisecond!==null){
                that.lottery=0;
                that.soonOpen(res.data.commodity_detail_data.countdown_millisecond);
            }else {
              that.lottery=2;
              if(res.data.luck_player_data.nickname){
                that.lottery=1;
                that.$set(that.luckyUser,'luckyimg', res.data.luck_player_data.headimage);
                that.$set(that.luckyUser,'luckyNumber', res.data.luck_player_data.luck_token);
                that.$set(that.luckyUser,'luckyGuy', res.data.luck_player_data.nickname);
                that.$set(that.luckyUser,'luckyAdrress', res.data.luck_player_data.ip_address);
                that.$set(that.luckyUser,'luckyPerson', res.data.luck_player_data.participate_amounts);
                that.$set(that.luckyUser,'luckyTime', res.data.luck_player_data.reward_time);
                that.$set(that.luckyUser,'luckyPk', res.data.luck_player_data.pk);
              }
            }
            that.noticedata=res.data.notice;
            for(let g=0;g<res.data.trend_map_data.each_part_data.length;g++){
              if(res.data.trend_map_data.each_part_data[g]<10){
                res.data.trend_map_data.each_part_data[g]='0'+res.data.trend_map_data.each_part_data[g];
              }
            }
            that.each_part_data=res.data.trend_map_data.each_part_data;
            stors.state.soonOpen=false;
          })
        },
        makecommodity:function (id) {
            let that=this;
            this.$get(this.$stors.state.ip+'/snatchtreasure/commoditydetailpage/?commodity_pk='+id).then(function (res) {
                let img=res.data.commodity_detail_data.commodity_images;
              let imgList=img.split(",");
              for (let i=0;i<imgList.length;i++){
                if(imgList[i].length<1){
                  imgList.splice(i,1);
                  i = i-1;
                }
              }
              that.imgs=imgList;
                let quota_str=res.data.commodity_detail_data.quota_str;
                if(quota_str!==null&&quota_str!==''){
                  that.quota_str=quota_str.split(',');
                }else {
                  that.quota_str=[];

                }
                that.honorData=res.data.honor_list_data;
                that.dataList=res.data.commodity_detail_data;
              if(res.data.commodity_detail_data.countdown_millisecond!==null){
                that.lottery=0;
                that.soonOpen(res.data.commodity_detail_data.countdown_millisecond);
              }else  {
                that.lottery=2;
                if(res.data.luck_player_data.nickname){
                  that.lottery=1;
                  that.$set(that.luckyUser,'luckyimg', res.data.luck_player_data.headimage);
                  that.$set(that.luckyUser,'luckyNumber', res.data.luck_player_data.luck_token);
                  that.$set(that.luckyUser,'luckyGuy', res.data.luck_player_data.nickname);
                  that.$set(that.luckyUser,'luckyAdrress', res.data.luck_player_data.ip_address);
                  that.$set(that.luckyUser,'luckyPerson', res.data.luck_player_data.participate_amounts);
                  that.$set(that.luckyUser,'luckyTime', res.data.luck_player_data.reward_time);
                  that.$set(that.luckyUser,'luckyPk', res.data.luck_player_data.pk);
                }
              }
                that.noticedata=res.data.notice;
              for(let g=0;g<res.data.trend_map_data.each_part_data.length;g++){
                if(res.data.trend_map_data.each_part_data[g]<10){
                  res.data.trend_map_data.each_part_data[g]='0'+res.data.trend_map_data.each_part_data[g];
                }
              }
                that.each_part_data=res.data.trend_map_data.each_part_data;
            })
        },
        scrolls:function (event) {
          // console.log(event.target.scrollTop)
          this.scrollText=event.target.scrollTop
        },
        processingData(){
          let that=this;
          that.popupVisible=false;
          that.imgs_show=0;
          that.isNow=0;
          that.login=localStorage.getItem('login');
          //每0.5秒监测是否中奖
          that.realTime=setInterval(function (){
            that.showbox=localStorage.getItem('showWinning');
            if(that.showbox==='true'){
              //修改body样式
              document.querySelector('body').setAttribute('style', 'overflow:hidden')
            }
            that.scroll_top=that.scroll().top;
          },500);
          document.querySelector('body').setAttribute('style', 'overflow:scroll;-webkit-overflow-scrolling: touch;');
          //加这玩意就是刷新后因为是histroy模式app属性会掉导致样式乱
          document.getElementById('app').setAttribute('style','height:100%');
          if(this.$route.query.commodity_id){
            that.makecommodity(this.$route.query.commodity_id);
          }else {

            that.getList(this.$route.query.pk)
          }
        },
        goBack:function () {
          this.scrollTop=0;
          this.isNow=1;
          this.$router.go(-1);
        },
        histroys:function () {
          if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goBack, false);
          }
        }
      },
      //页面销毁时，取消监听。否则其他vue路由页面也会被监听
      destroyed(){
        window.removeEventListener('popstate', this.goBack, false);
      },
      beforeDestroy() {
        let that=this;
        //关闭实时监测
        clearInterval(that.realTime);
      },
      mounted() {
          this.processingData();
        this.histroys();
          // let swipe=document.getElementById('swipe');
          // swipe.className
      },
      activated() {
        if(!this.$route.meta.isBack || this.isFirstEnter){
          // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
          // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
          // this.allTaskList= [];// 把数据清空，可以稍微避免让用户看到之前缓存的数据
          let that=this;
          that.processingData();
          that.histroys();
        }
        // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
        this.$route.meta.isBack=false;
        // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
        this.isFirstEnter=false;

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
        localStorage.setItem('showWinning','false');
        window.removeEventListener('popstate', this.goBack, false);
        //关闭实时监测
        clearInterval(that.realTime);
        if(that.isNow===1){
          this.scrollTop = 0;
        }else {
          this.scrollTop = this.scrollText;
        }
        // console.log(this.scrollTop)
        next()
      },
      created(){
        this.isFirstEnter = true;
        // 只有第一次进入或者刷新页面后才会执行此钩子函数，使用keep-alive后（2+次）进入不会再执行此钩子函数
      },
    }
</script>

<style scoped>
  .header_back{
    background-image: url("../../static/img/redbottom.png");
    background-size: 100% 100%;
    height: 134px;
    position: relative;
  }
  [v-cloak]{ display:none}
  .allText_div{
    width: 100%;
    overflow-y: scroll;
    /*position: relative;*/
    height: 100%;
  }
  /*.alldiv{*/
    /*overflow: hidden;*/
    /*overflow-y: scroll;*/
    /*-webkit-overflow-scrolling: touch;*/
  /*}*/
  .text_img{
    position: absolute;
    top:10px;
    left: 0;
    width: 100%;
    height: 242px;
  }
  .name_detail{
    width: 100%;
    color: white;
    font-size: 18px;
    font-weight: 600;
    padding-top: 14px;
  }
  .img_text{
    width: 100%;
    height: 300px;
    background: white;
  }
  .all_divs{
    width: 100%;
  }
  .number_text{
    width: 95%;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .jiajian{
    width: 50%;
    display: flex;
    justify-content: space-between;

  }
  .number_bottom{
    width: 100%;
    text-align: left;
  }
  .money_span{
    width: 19%;
    float: left;
    height: 30px;
    color:#ffbc84;
    line-height: 30px;
    margin-top: 10px;
    margin-left: 4%;
    text-align: center;
    border: 1px solid #ffbc84;
    font-size: 12px;
    font-weight: 600;
    border-radius: 10px;
  }
  [v-cloak] {
    display: none;
  }
  .class_back{
    background: red;
    color: white;
  }
  .true_div{
    width: 100%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background: #f88b65;
    color: white;
    font-weight: 600;
    margin-top: 15px;
  }
  .number_span{
    width: 60px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    border: 1px solid #a8a8a8;
    border-radius: 10px;
  }
  .number_input{
    width: 80px;
    height: 40px;
    text-align: center;
    font-size: 16px;
    border: 1px solid #a8a8a8;
    border-radius: 10px;
  }
  .mint-popup-bottom{
    width: 100%;
  }
  .imgs{
    width: 100%;
    height: 100%;
  }
  .detial_all{
    width: 100%;
    border-top: 4px solid #eeeeee;
    /*position: absolute;*/
    /*top: 10px;*/
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    /*margin-top: 70px;*/
    margin-top: 132px;
  }

  .img_all{
    width: 98%;
    margin-left: 2%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
.left_img{
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 400;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

  .img_return{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img_back{
    background: white;
  }
  .details_img{
    /*width: 244px;*/
    height: 244px;
    /*position: absolute;*/
    border-radius: 10px;
    /*z-index: 300;*/
    /*left: 19%;*/
  }
  .name_img{
    width: 100%;
    margin-top: 5px;
    font-size: 13px;
  }
  .mt-progress{
    height: 0;
    line-height: 0;
  }
  .name_header{
    display: inline-block;
    width: 60px;
    border: 1px solid black;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
  }
  .name_text{
    font-size: 14px;
    font-weight: 600;
    display: inline-block;
    width: 80%;
  }
  .jindu_div{
    width: 100%;
    height: 60px;
    margin-top: 9px;
    background: white;
  }
  .jindutiao{
    width: 95%;
    margin-left: 10px;
    margin-top: 20px;
  }
  .pelple{
    width: 95%;
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    font-size: 13px;
    color: #7c7c7c;
  }
  .countDown{
    width: 100%;
    background: white;
    text-align: center;
    height: 50px;
    color: #f8471e;
    font-size: 31px;
    font-weight: 600;
    line-height: 50px;
  }
  .login,.nowOnce{
    width: 100%;
    height: 60px;
    font-size: 22px;
    font-weight: 600;
    line-height: 60px;
    background:#f83344;
    color: white;
    margin-top: 15px;
  }
  .all_ranking{
    width: 100%;
  }
  .nowOnce{
    position: fixed;
    bottom: 0;
  }
  .ranking_div{
    width: 94%;
    margin-left: 3%;
    border-radius: 10px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
    position: relative;
  }
  .first_div{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .rongyu_img{
    width: 68px;
    height: 52px;
  }
  .secound_div{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .three_div{
    font-size: 12px;
    margin-top: 10px;
    margin-right: 10px;
  }
  .out_div{
    width: 33%;
    margin-left: 3px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .div_hao{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .touxiang{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #c5c5c5;
  }
  .fuhao_img{
    width: 60px;
    height: 30px;
  }
  .way_time{
    width: 100%;
    margin-top: 10px;
    background: white;
  }
  .way_div{
    width: 94%;
    margin-left: 3%;
    font-size: 14px;
    height: 40px;
    text-align: left;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(224, 224, 224);
  }
  .price_div{
    width: 100%;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom :5px;
  }
  .price_text{
    width: 100%;
    height: 65px;
  }

  /*.price_height{*/
    /*margin-bottom : 60px;*/
  /*}*/
  .qishu{
    width: 32%;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    font-size: 12px;
  }
  .span_color{
    width: 15px;
    display: inline-block;
    height: 15px;
    border-radius: 50%;
    background: red;
  }
  .zhezao{
    width: 100%;
    height: 100%;
    background: black;
    position: absolute;
    filter:alpha(opacity=60);  /*设置透明度为60%*/
    opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
    z-index: 1000;
    top: 0;
    left: 0;
  }
  .address{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1000;
    top: 0;
    left:0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .address_div{
    position: relative;
    width: 90%;
    /*margin-left: 5%;*/
    /*margin-top: 46%;*/
    border-radius: 10px;
  }
  .close_img{
    width: 33px;
    height: 33px;
    margin-top: 50px;
  }
  .lucky_all{
    background:#efb053;
    width: 100%;
    text-align: left;
    height: 50px;
    line-height: 50px;
    color: white;
    font-size: 19px;
    font-weight: 600;
  }
  .show_img{
    width: 95%;
    height: 242px;
  }
  .zhongjiang{
    font-size: 22px;
    margin-top: 4px;
    font-weight: 600;
    color: white;
    transform: rotate(-15deg);
    -o-transform: rotate(-15deg);
    -webkit-transform: rotate(-15deg);
    -moz-transform: rotate(-15deg);
    filter:progid:DXImageTransform.Microsoft.BasicImage(Rotation=2);
  }
  .commitid{
    width: 82%;
    margin-top: 26px;
    margin-left: 9%;
  }
  .img_rule{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #c5c5c5;
  }

  .rule_text{
    width: 65px;
    height: 30px;
    margin-left: 14%;
  }
  .rule_span{
    display: inline-block;
    height: 40px;
    width: 56%;
    text-align: left;
    margin-right: 3%;
    color: black;
    font-size: 16px;
  }
  .text_img_show{
    width: 100%;
    position: absolute;
    z-index: 300;
    top: 24px;
  }
  .lucky_names{
    width: 100%;
    background: white;
    display: flex;
    /*justify-content: space-between;*/
    align-items: center;
    position: relative;
  }
  .lucky_imgs{
    width: 63px;
    height: 47px;
    position: absolute;
    top: 0;
  }
  .username{
    font-size: 14px;
    color: #a6a6a6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 82px;
    margin-left: 1%;
    text-align: left;
  }

</style>
