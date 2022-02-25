<template>
  <div class="alltext" >
    <div :style="{height:bodyHeight}" class="allText_div"  ref="myScrollbar"  id="all_div" @scroll="scroll">
      <!--:top-method="loadTop"-->
      <mt-loadmore
                   :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   :bottomPullText='bottomText'
                   :bottomDistance="bottomDistance"
                   :autoFill='false'
                   ref="loadmore">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1"><span style="font-size: 15px;font-weight: 600">未领取</span></mt-tab-item>
            <mt-tab-item id="2"><span style="font-size: 15px;font-weight: 600">已领取</span></mt-tab-item>
          </mt-navbar>
          <div v-show="selected==2">
            <div v-for="(val,id) in dataList" v-if="dataList.length>0">
              <div class="header">
                <div class="header_img">
                  <img :src="imgs(val.commodity_images)" class="img_open" style="margin-top: 24px">
                </div>
                <div class="header_div">
                  <div class="now_money">
                    <span v-text="val.commodity_name"></span>
                  </div>
                  <div class="time_sum" >
                    <div class="left_name">
                      <div class="name_text" >期号：{{val.period_no}}</div>
                      <div class="name_text">幸运期号:{{val.luck_token}}</div>
                      <div class="name_text">参与人次:{{val.participate_renci}}人次  </div>
                      <div class="name_text">揭晓时间:{{val.reward_time}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="all_progress" style="height: 50px" @click="goDetails(val.prize_record_pk)">
                <div class="progress"></div>
                <div class="gather">
                  <span class="continuedtail">领取详情</span>
                </div>
              </div>
            </div>
            <div style="font-size: 14px;font-weight: 600;color: #a8a8a8;margin-top: 60px" v-if="dataList.length===0">
              暂无数据。。。
            </div>
          </div>

          <div v-show="selected==1">
          <div v-for="(val,id) in dataList" v-if="dataList.length>0">
            <div class="header">
              <div class="header_img">
                <img :src="imgs(val.commodity_images)" class="img_open" style="margin-top: 24px">
              </div>
              <div class="header_div">
                <div class="now_money">
                  <span v-text="val.commodity_name"></span>
                </div>
                <div class="time_sum" >
                  <div class="left_name">
                    <div class="name_text" >期号：{{val.period_no}}</div>
                    <div class="name_text">幸运期号:{{val.luck_token}}</div>
                    <div class="name_text">参与人次:{{val.participate_renci}}人次  </div>
                    <div class="name_text">揭晓时间:{{val.reward_time}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="all_progress" style="height: 50px">
              <div class="progress"></div>
              <div class="gather">
                <span class="continue" @click="awardPlatform(val.period_id,val.prize_record_pk)">去领取>></span>
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
    export default {
        name: "WinningRecord",
      data(){
          return {
            selected:'1',
            dataList:[],
            allLoaded:false,
            bottomText:'上拉加载更多...',
            bodyHeight:'',//body高度
            scrollText:0,
            bottomDistance:10,
            stopData:false
          }
      },
      methods:{
            //领取详情
        goDetails:function (pk) {
          this.$router.push({path:'/ReceiveDetails',query: {prize_record_pk: pk}})
        },
        // //下拉刷新
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
            that.bottomList(that.dataList[that.dataList.length-1].prize_record_pk,that.selected);
          }
        },
        showtast:function (msg) {
          this.$toast(msg);
        },
        bottomList:function(last_pk,status){
          let that=this;
          this.$get(this.$stors.state.ip+'/snatchtreasure/prizerecords/?last_pk='+last_pk+'&is_accept_prize='+status).then(function (res) {
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
          imgs:function(imgs){
              let img=imgs.split(",");
              return img[0];
          },
          //去领取
        awardPlatform:function (id,prize_record_pk) {
          this.$router.push({path:'/AwardPlatform',query:{commodity_id: id,prize_record_pk:prize_record_pk}})
        },
        getList:function (status) {
          let that=this;
          this.$get(this.$stors.state.ip+'/snatchtreasure/prizerecords/?last_pk=999999999&is_accept_prize='+status).then(function (res) {
            that.dataList=res.data;
          })
        },
        scroll:function (event) {
          this.scrollText=event.target.scrollTop
        }
      },
      beforeDestroy() {
        document.querySelector('body').setAttribute('style', 'overflow:scroll');
      },
      mounted() {
        this.getList(1);
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
        // console.log(this.scrollTop)
        next()
      },
      watch: {
        'selected': function (newVal) {
            let that=this;
            that.getList(newVal);
            that.selected=newVal
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
  .all_progress{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #c8c8cd;
  }

  .progress{
    width: 67%;
    margin-left: 3%;
  }
  .gather{
    width: 30%;
  }

  .continue,.continuedtail{
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
  .continuedtail{
    border: 1px solid red;
    background: white;
    color: red;
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
