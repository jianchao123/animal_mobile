<template>
    <div>
      <div class="text_div" v-for="(val,id) in dataList" v-if="dataList.length>0">
        <div class="user_div">
          <div class="img_div">
            <img :src="val.luck_player_headimg" class="user_img" @click="goUserDetail(val.luck_player,val.luck_player_headimg,val.luck_player_name)">
            <span style="font-size: 14px;color: #8cc893;font-weight: 600">赵日天</span>
          </div>
          <div class="time_text">
            <div class="names">{{val.commodity_name}}</div>
            <div class="timeUser">期号：<span>{{val.period_no}}</span>&nbsp;&nbsp;<span>时间：{{val.reward_time}}</span></div>
          </div>
        </div>
        <div class="describe">{{val.text}}</div>
        <div class="describe_url">
          <img :src="img" class="describe_img" v-for="(img,index) in imgs(val.upload_img)">

        </div>
        <div class="bottom_div">
          <div class="div_dian">
            <img src="../../static/img/dianzan.png" class="dianzan" v-show="val.is_praise===false" @click="addshows(id)">
            <img src="../../static/img/dianzan1.png" class="dianzan" v-show="val.is_praise">
            <span>{{val.praise_count}}</span>
            <span style="margin-left: 20px;margin-right: 20px" @click="goDetails(val.period)">去试试>></span>
          </div>
        </div>
      </div>
      <div style="font-size: 14px;font-weight: 600;color: #a8a8a8;margin-top: 60px" v-if="dataList.length===0">
        暂无数据。。。
      </div>
    </div>
</template>

<script>
    export default {
        name: "DryingList",
      data(){
          return {
            dataList:[],
          }
      },
      methods:{
        addshows:function (index) {
          let that=this;
          let stors=this.$stors;
          //不需要加载icon
          stors.state.soonOpen=true;
          this.$post(this.$stors.state.ip+'/activitys/praise/',
            {sun_the_order_pk:that.dataList[index].id,
              praise_player_pk:that.dataList[index].luck_player}).then(function (res) {
              if(res.code===0){
                that.dataList[index].is_praise=true;
                that.dataList[index].praise_count=that.dataList[index].praise_count+1;
              }
            stors.state.soonOpen=true;
          });

        },
        //用户中奖，参与记录
        goUserDetail:function(player_pk,luckyUrl,luckyName){
          this.$router.push({path:'/UserDetail',query: {player_pk: player_pk,luckyUrl:luckyUrl,luckyName:luckyName}})
        },
        //查看商品详情
        goDetails:function (pk) {
          this.$router.push({path:'/CommodityDetails' ,query: {pk: pk}})
        },
          imgs:function(img){
             return  img.split(",")
          },
        getList:function () {
            let that=this;
            this.$get(this.$stors.state.ip+'/activitys/suntheorders/').then(function (res) {
              that.dataList=res.data;
            })
        }
    },
      mounted() {
        this.getList();
      },
      activated() {
        if(!this.$route.meta.isBack || this.isFirstEnter){
          // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
          // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
          // this.allTaskList= [];// 把数据清空，可以稍微避免让用户看到之前缓存的数据
          let that=this;
          that.getList();
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
  body{
    overflow: hidden;
    overflow-y: scroll;
  }
</style>
<style scoped>
  .text_div{
    width: 100%;
    margin-top: 5px;
  }
  .img_div{
    width: 20%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .user_div{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .user_img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .time_text{
    width: 78%;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #c3c3c3;
  }
  .names{
    font-size: 15px;
    font-weight: 600;
    text-align: left;
    width: 100%;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .timeUser{
    width: 100%;
    font-size: 13px;
    text-align: left;
    margin-bottom: 10px;
  }
  .describe{
    width: 90%;
    margin-left: 5%;
    text-align: left;
    margin-top: 10px;
    font-size: 15px;
    font-weight: 600;
    color: #636363;
  }
  .describe_url{
    width: 90%;
    margin-left: 5%;
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    align-items: center;
  }
  .describe_img{
    width: 30%;
    height: 90px;
  }
  .bottom_div{
    width: 100%;
    display: flex;
    color: #b3b3b3;
    height: 50px;
    justify-content: flex-end;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    margin-top: 15px;
    border-bottom: 1px solid #b0b0b0;
  }
  .div_dian{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dianzan{
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }

</style>
