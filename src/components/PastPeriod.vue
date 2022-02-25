<template>
    <div style="overflow: hidden">
      <div :style="{height:bodyHeight}" class="allText_div"  ref="myScrollbar"  id="all_div" @scroll="scroll">
        <mt-loadmore
                     :bottom-method="loadBottom"
                     :bottom-all-loaded="allLoaded"
                     :bottomPullText='bottomText'
                     :autoFill='false'
                     :bottomDistance="bottomDistance"
                     ref="loadmore">
          <div class="detials" style="background: #f5f7fa;height: 130px">
            <img class="detail_img" :src="imgs[0]">
            <div class="name_img">
              <div class="name" v-text="textList.commodity_name"></div>
              <div class="renci">总需人次：<span style="color: red">{{textList.target_amounts}}</span>人次</div>
              <div class="jiage" >商品价格：<span style="color: red">￥{{textList.unit_price}}</span></div>
            </div>
          </div>
          <div class="secound_detials" v-for="(val,id) in dataList">
            <div class="secoun_div" >
              <div class="header_div">
                <img src="../../static/img/zhong.png" class="zhongjiang">
                <img :src="val.luck_player_headimage" class="header" @click="goUserDetail(val.luck_player_id,val.luck_player_headimage,val.luck_player_nickname)">
                <span style="color: #e50000">{{val.participate_renci}}人次</span>
                <span style="color: #009700;width: 85px;overflow: hidden;text-align: center;text-overflow: ellipsis;white-space: nowrap;" v-text="val.luck_player_nickname"></span>
              </div>
              <div class="name_img" @click="goDetails(val.period_pk)">
                <div class="renci">期 号：<span v-text="val.period_no"></span></div>
                <div class="renci">揭晓时间：<span v-text="val.open_lottery_time"></span></div>
                <div class="jiage">幸运号码：<span v-text="val.luck_token"></span></div>
              </div>
            </div>
            <div style="width: 90%;margin-left: 5%;background: #d4d4d4;height: 1px;margin-top: 5px"></div>
          </div>
        </mt-loadmore>
      </div>

    </div>
</template>

<script>
    export default {
        name: "PastPeriod",//往期揭晓
      data(){
          return {
            dataList:[],
                imgs:[],
              textList:[],
            allLoaded:false,
            bottomText:'上拉加载更多...',
            bodyHeight:'',//body高度
            commodity_pk:'',
            scrollText:0,
            bottomDistance:10
          }
      },
      methods:{
        //下拉刷新
        // loadTop:function(){
        //   let that=this;
        //   that.allLoaded = true;
        //   that.getList(that.commodity_pk);
        //   that.allLoaded = false;
        //   setTimeout(function () {
        //     that.$refs.loadmore.onTopLoaded();
        //   },1000);
        // },
        //上拉加载
        loadBottom:function(){
          let that = this;
          let sh = that.$refs['myScrollbar'].scrollHeight;// 滚动条高度
          let st = that.$refs['myScrollbar'].scrollTop; // 滚动条距离顶部的距离
          let ch = that.$refs['myScrollbar'].clientHeight; // 滚动条外容器的高度
          if (st + ch >= sh) {
            //到底了-业务逻辑
            that.allLoaded = true;
            setTimeout(function () {
              that.$refs.loadmore.onBottomLoaded();
            },1000);
            that.bottomList(that.dataList[that.dataList.length-1].period_pk,that.commodity_pk);
          }
        },
        bottomList:function(last_pk,commodity_pk){
          let that=this;
          this.$get(this.$stors.state.ip+'/snatchtreasure/previousperiod/?last_pk='+last_pk+'&commodity_pk='+commodity_pk).then(function (res) {
            if(res.data.length>0){
              for (let i=0;i<res.data.length;i++){
                that.dataList.push(res.data[i]);
              }
            }
            that.allLoaded = false;
          })
        },
        getList:function (pk) {
            let that=this;
            this.$get(this.$stors.state.ip+'/snatchtreasure/previousperiod/?commodity_pk='+pk+'&last_pk=999999999').then(function (res) {
                that.dataList=res.data;

            });
            this.$get(this.$stors.state.ip+'/snatchtreasure/commoditydetailpage/?commodity_pk='+pk).then(function (res) {
                let img=res.data.commodity_detail_data.commodity_images;
                that.imgs=img.split(",");
                that.textList=res.data.commodity_detail_data;


            })
        },
        //用户中奖，参与记录
        goUserDetail:function(player_pk,luckyUrl,luckyName){
          this.$router.push({path:'/UserDetail',query: {player_pk: player_pk,luckyUrl:luckyUrl,luckyName:luckyName}})
        },
        //详情
        goDetails:function (pk) {
          this.$router.push({path:'/CommodityDetails' ,query: {pk: pk}})
        },
        processingData:function () {
          let that=this;
          that.bodyHeight=document.body.offsetHeight+'px';
          document.querySelector('body').setAttribute('style', 'overflow:hidden');
          that.commodity_pk=this.$route.query.id;
          this.getList(this.$route.query.id);
        },
        scroll:function (event) {
          this.scrollText=event.target.scrollTop
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
      //进入该页面时，用之前保存的滚动位置赋值
      beforeRouteEnter (to, from, next) {
        next(vm => {
          if(from.name==='CommodityDetails'){
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
    }
</script>

<style scoped>
  .detials{
    width: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .detail_img{
    border-radius: 10px;
    width: 80px;
    height: 80px;
    margin-left: 10px;
  }
  .allText_div{
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
  }
  .secoun_div{
    width: 95%;
    background: white;
    display: flex;
    height: 118px;
    align-items: center;
    font-size: 15px;
    margin-left: 9%;
    margin-top: 5px;
  }
  .name_img{
    width: 69%;
    margin-left: 13px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
  }
  .name{
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .renci,.jiage{
    color: #bfbfbf;
  }
  .header_div{
    width: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    position: relative;
  }
  .header{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 12px;
  }
  .zhongjiang{
    width: 30px;
    height: 30px;
    position: absolute;
    top: -9px;
    left: 24px;

  }
</style>
