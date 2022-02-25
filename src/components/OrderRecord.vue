<template>
    <div class="alltext">
      <div :style="{height:bodyHeight}" class="allText_div"  ref="myScrollbar" id="all_div"  @scroll="scroll">
        <!--:top-method="loadTop"-->
        <mt-loadmore
                     :bottom-method="loadBottom"
                     :bottom-all-loaded="allLoaded"
                     :bottomPullText='bottomText'
                     :autoFill='false'
                     :bottomDistance="bottomDistance"
                     ref="loadmore">
          <mt-navbar v-model="selected">
            <mt-tab-item id="P"><span style="font-size: 15px;font-weight: 600">拼购中</span></mt-tab-item>
            <mt-tab-item id="K"><span style="font-size: 15px;font-weight: 600">开奖中</span></mt-tab-item>
            <mt-tab-item id="Y"><span style="font-size: 15px;font-weight: 600">已揭晓</span></mt-tab-item>
          </mt-navbar>
          <div v-show="selected=='P'">
            <div v-for="(val,id) in dataList" v-if="dataList.length>0">
              <div class="header" @click="details(val.period_id)">
                <div class="header_img">
                  <img :src="imgs(val.commodity_images)" class="img_open">
                </div>
                <div class="header_div">
                  <div class="now_money">
                    <span v-text="val.commodity_name"></span>
                  </div>
                  <div class="time_sum">
                    <div class="left_name">
                      <div class="name_text" >第{{val.period_numbers}}期</div>
                      <div class="name_text">我参与的人次:{{val.participate_renci}}人次</div>
                      <div class="name_text" style="color: red;margin-top: 5px" @click.stop="treasureNumber(val.period_id)">查看夺宝号>></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="all_progress">
                <div class="progress">
                  <div class="myprogress">揭晓进度  <span v-text="rates(val.rate)"></span></div>
                  <div class="jindutiao"><mt-progress :value="val.rate" :bar-height="5"></mt-progress></div>
                </div>
                <div class="gather">
                  <span class="continue" @click="buyDetails(val.commodity_id)">继续买>></span>
                </div>
              </div>
            </div>
            <div style="font-size: 14px;font-weight: 600;color: #a8a8a8;margin-top: 60px" v-if="dataList.length===0">
              暂无数据。。。
            </div>
          </div>

          <div v-show="selected=='K'">
            <div v-for="(val,id) in dataList" v-if="dataList.length>0">
              <div class="header"  @click="details(val.period_id)">
                <div class="header_img">
                  <img :src="imgs(val.commodity_images)" class="img_open">
                </div>
                <div class="header_div">
                  <div class="now_money">
                    <span v-text="val.commodity_name"></span>
                  </div>
                  <div class="time_sum">
                    <div class="left_name">
                      <div class="name_text" >第{{val.period_numbers}}期</div>
                      <div class="name_text">我参与的人次:{{val.participate_renci}}人次</div>
                      <div class="name_text" style="color: red;margin-top: 5px" @click.stop="treasureNumber(val.period_id)">查看夺宝号>></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="all_progress">
                <div class="progress">
                  <div class="myprogress">揭晓进度  <span v-text="rates(val.rate)"></span></div>
                  <div class="jindutiao"><mt-progress :value="val.rate" :bar-height="5"></mt-progress></div>
                </div>
                <div class="gather">
                  <span class="continue" @click="details(val.period_id)">去围观>></span>
                </div>
              </div>
            </div>
            <div style="font-size: 14px;font-weight: 600;color: #a8a8a8;margin-top: 60px" v-if="dataList.length===0">
              暂无数据。。。
            </div>
          </div>

          <div v-show="selected=='Y'">
            <div v-for="(val,id) in dataList" v-if="dataList.length>0">
              <div class="header"  @click="details(val.period_id)">
                <div class="header_img">
                  <img :src="imgs(val.commodity_images)" class="img_open" style="margin-top: 28px">
                </div>
                <div class="header_div">
                  <div class="now_money">
                    <span v-text="val.commodity_name"></span>
                  </div>
                  <div class="time_sum" style="margin-top: 0">
                    <div class="left_name">
                      <div class="name_text" >第{{val.period_numbers}}期</div>
                      <div class="name_text">我参与的人次:{{val.participate_renci}}人次</div>
                      <div class="name_text">揭晓时间:{{val.reward_time}}</div>
                      <div class="name_text">幸运号码:{{val.luck_token}}</div>
                      <div class="name_text" style="color: red;margin-top: 5px" @click.stop="treasureNumber(val.period_id)">查看夺宝号>></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="all_progress" style="height: 70px">
                <div class="progress">
                  <div class="user_div">
                    <img :src="val.luck_player_headimage" class="userImg"
                         @click="goUserDetail(val.luck_player_id,val.luck_player_headimage,val.luck_player_nickname)">
                    <div style="width: 97%;margin-left: 3%;text-align: left">
                      <div style="font-size: 14px;color: red" v-text="val.luck_player_nickname"></div>
                      <div style="font-size: 14px;color: #bababa;">参与人次：{{val.luck_player_participate_renci}}人次</div>
                    </div>
                  </div>
                </div>
                <div class="gather">
                  <span class="continue" @click="buyDetails(val.commodity_id)">再次参与>></span>
                </div>
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
  import axios from 'axios'
    export default {
        name: "OrderRecord",
      data(){
          return{
            selected:'P',
            dataList:[],
            allLoaded:false,
            bottomText:'上拉加载更多...',
            bodyHeight:'',//body高度
            scrollText:0,
            bottomDistance:10,
            stopData:false,
          }
      },
      methods:{
        //下拉刷新
        // loadTop:function(){
        //   let that=this;
        //   that.allLoaded = true;
        //   that.getList(that.selected);
        //   that.allLoaded = false;
        //   setTimeout(function () {
        //     that.$refs.loadmore.onTopLoaded();
        //   },1000);
        // },
        //上拉加载
        loadBottom:function(){
          let that = this;
          if(that.stopData){
            that.allLoaded = false;
            setTimeout(function () {
              that.$refs.loadmore.onBottomLoaded();
            },200);
            return that.showtast('已全部加载完毕！');
          }
          let sh = that.$refs['myScrollbar'].scrollHeight;// 滚动条高度
          let st = that.$refs['myScrollbar'].scrollTop; // 滚动条距离顶部的距离
          let ch = that.$refs['myScrollbar'].clientHeight; // 滚动条外容器的高度
          if (st + ch >= sh) {
            //到底了-业务逻辑
            that.allLoaded = true;
            setTimeout(function () {
              that.$refs.loadmore.onBottomLoaded();
            },1000);
            that.bottomList(that.dataList[that.dataList.length-1].order_pk,that.selected);
          }
        },
        showtast:function (msg) {
          this.$toast(msg);
        },
        bottomList:function(last_pk,status){
          let that=this;
          this.$get(this.$stors.state.ip+'/snatchtreasure/apporderrecords/?last_pk='+last_pk+'&status='+status).then(function (res) {
            if(res.data.length>0){
              for (let i=0;i<res.data.length;i++){
                that.dataList.push(res.data[i]);
              }
            }
            if(res.data.length<10){
              that.stopData=true;
            }
            that.allLoaded = false;
          })
        },
        //查看夺宝号
        treasureNumber:function (id) {
          this.$router.push({path:'/TreasureNumber',query: {id: id}})
        },
        //根据周期id跳转详情页面
        details:function(id){
          this.$router.push({path:'/CommodityDetails',query: {pk: id}})
        },
        //根据商品pk跳转详情页面
        buyDetails:function(id){
          this.$router.push({path:'/CommodityDetails',query: {commodity_id: id}})
        },
        //用户中奖，参与记录
        goUserDetail:function(player_pk,luckyUrl,luckyName){
          this.$router.push({path:'/UserDetail',query: {player_pk: player_pk,luckyUrl:luckyUrl,luckyName:luckyName}})
        },
          imgs:function(imgs){
              let img=imgs.split(",");
              return img[0];
          },
          rates:function(val){
            return parseInt(val)+'%';
          },
        getList:function (status) {
          let that=this;
          this.$get(this.$stors.state.ip+'/snatchtreasure/apporderrecords/?last_pk=999999999&status='+status).then(function (res) {
            that.dataList=res.data;
          })
        },
        scroll:function (event) {
          this.scrollText=event.target.scrollTop
        }
      },
      mounted() {
        this.getList('P');
        let that=this;
        that.bodyHeight=document.body.offsetHeight+'px';
        document.querySelector('body').setAttribute('style', 'overflow:hidden');
      },
      //进入该页面时，用之前保存的滚动位置赋值
      beforeRouteEnter (to, from, next) {
        next(vm => {
          if(from.name==='Personal'){
            document.getElementById('all_div').scrollTop=0;
          }else {
            document.getElementById('all_div').scrollTop=vm.scrollTop;
          }
        })
      },
      //在页面离开时记录滚动位置
      beforeRouteLeave (to, from, next) {
        this.scrollTop = this.scrollText;
        next()
      },
      watch: {
        'selected': function (newVal) {
            let that=this;
            that.selected=newVal;
            that.getList(newVal)

        },
      }
    }
</script>

<style scoped>
  .alltext{
    width: 100%;
    background: white;
  }
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom: 3px solid #fd061b;
    color: #fd061b;
    margin-bottom: -3px;
  }
  .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #eeeeee;
    margin-top: 4px;
    float: left;
    position: relative;
  }
  .header_img{
    width: 30%;
  }
  .allText_div{
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
  }
  .header_div{
    width: 70%;
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
  .jindutiao{
    margin-top: 10px;
  }
  .img_open{
    max-width: 90%;
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
  .now_text{
    font-size: 22px;
    color: red;
    font-weight: 600;
  }
  .time_sum{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .left_name{
    width: 65%;
  }
  .right_img{
    width: 35%;
  }
  .name_text{
    font-size: 13px;
    color: #bababa;
    text-align: left;
  }
  .all_progress{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #c8c8cd;
  }
  .myimg{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 35px;
    margin-right: 10px;
  }
  .progress{
    width: 67%;
    margin-left: 3%;
  }
  .gather{
    width: 30%;
  }
  .myprogress{
    font-size: 15px;
    color: #bababa;
    text-align: left;
  }
  .continue{
    display: inline-block;
    width: 80px;
    height: 30px;
    font-size: 13px;
    color: white;
    background: red;
    line-height: 30px;
    border-radius: 10px;
    margin-top: 5px;
  }

  .mt-progress{
    height: 0;
    line-height: 0;
  }
  .user_div{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .userImg{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
</style>
