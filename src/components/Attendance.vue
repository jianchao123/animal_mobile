<template>
  <div>
    <div class="detials" v-for="(val,id) in dataList" @click="goUserDetail(val.player_id,val.player_headimage,val.player_nickname)">
      <div class="header_div">
        <img :src="val.player_headimage" class="header">
        <span style="color: #9b1119;width: 60px;overflow: hidden;text-align: center;text-overflow: ellipsis;white-space: nowrap;" v-text="val.player_nickname"></span>
      </div>
      <div class="name_img">
        <div class="renci">I P：<span v-text="val.player_ip"></span></div>
        <div class="renci">地 址：<span v-text="val.player_ip_address"></span></div>
        <div class="renci">参与人次：<span v-text="val.participate_renci"></span></div>
        <div class="jiage">揭晓时间：<span v-text="val.participate_time"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Attendance",
    data(){
      return{
        dataList:[]
      }
    },
    methods:{
      getList:function (pk) {
        let that=this;
        this.$get(this.$stors.state.ip+'/snatchtreasure/currentperiodparticipates/?period_pk='+pk).then(function (res) {
          that.dataList=res.data;
        })
      },
      //用户中奖，参与记录
      goUserDetail:function(player_pk,luckyUrl,luckyName){
        this.$router.push({path:'/UserDetail',query: {player_pk: player_pk,luckyUrl:luckyUrl,luckyName:luckyName}})
      },
      processingData:function () {
        let that=this;
        that.getList(this.$route.query.period_pk);
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
  .detials{
    width: 100%;
    background: white;
    display: flex;
    height: 99px;
    align-items: center;
    font-size: 15px;
    margin-top: 5px;
    border-bottom: 1px solid #cecece;
  }
  .detail_img{
    border-radius: 10px;
    width: 80px;
    height: 80px;
    margin-left: 10px;
  }
  .name_img{
    width: 70%;
    margin-left: 5px;
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
