<template>
    <div>
      <div class="header" v-show="commodity_reward_type===1">
        <div class="lucky">
          <span style="margin-top: 13px">幸运</span>
          <span style="margin-bottom: 13px">号码</span>
        </div>
        <div style="margin-left: 5px">=数值A%商品总人次+10000001</div>
      </div>
      <div class="header" v-show="commodity_reward_type===2">
        <div class="lucky">
          <span style="margin-top: 13px">幸运</span>
          <span style="margin-bottom: 13px">号码</span>
        </div>
        <div style="margin-left: 5px;text-align: left;">=(数值A+数值B)%商品总人次+10000001</div>
      </div>
      <div class="number_div" >
        <div style="width: 100%">
          <div class="nmubera">数值A</div>
        </div>
        <div style="margin-left: 3%;width: 95%;display: flex;margin-top: 5px">
          <div style="width: 30px">A</div>
          <div style="font-size: 15px;">=截止该奖品开奖时间点前本站商品的最后</div>
        </div>
        <div style="margin-left: 3%;width: 95%;display: flex;margin-top: 5px">
          <div style="width: 30px"></div>
          <div style="font-size: 15px;">50个参与时间数值之和</div>
        </div>
        <div style="margin-left: 3%;width: 95%;display: flex;margin-top: 5px;border-bottom: 1px solid #cacaca">
          <div style="width: 30px"></div>
          <div style="display: flex;justify-content: space-between;align-items: center;width: 100%">
            <div>=<span style="color: #e30000">{{dataA}}</span></div>
            <img src="../../static/img/xiala.png" class="xiala" @click="openthis" v-show="isshow===1">
            <img src="../../static/img/shouqi.png" style="width: 19px;height: 21px;" @click="openthis" v-show="isshow===0">
          </div>
        </div>
        <div style="margin-left: 3%;width: 95%;display: flex;margin-top: 5px;font-size: 13px;color: #b6b6b6" v-show="isshow===1">
          <div style="width: 65%">参与时间</div>
          <div style="width: 35%">用户</div>
        </div>
        <div class="name_text" v-show="isshow===1">
          <div class="orderthis" v-for="(val,id) in dataList">
            <div style="width: 65%">{{val[0]}}-{{val[1]}}</div>
            <div style="width: 122px;text-align: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{val[2]}}</div>
          </div>
        </div>
      </div>

      <div class="number_div"  v-show="commodity_reward_type===2">
        <div style="width: 100%">
          <div class="nmubera">数值B</div>
        </div>
        <div style="margin-left: 3%;width: 95%;display: flex;margin-top: 5px">
          <div style="width: 30px">A</div>
          <div style="text-align: left;font-size: 15px;">=最新一期中国福利彩票"重庆时时彩"的开奖结果</div>
        </div>
        <div style="margin-left: 3%;width: 95%;display: flex;margin-top: 5px;">
          <div style="width: 30px"></div>
          <div style="display: flex;justify-content: space-between;align-items: center;width: 100%">
            <div>=<span style="color: #e30000">{{dataB}}(第{{ssc_period_no}}期)</span></div>
            <!--<img src="../../static/img/xiala.png" class="xiala">-->
          </div>
        </div>

      </div>

      <div class="jieguo">
        计算结果：<span style="color: red">{{luck_token}}</span>
      </div>

      <div class="number_div zhuyi">
        <div style="width: 10%;margin-top: 10px">注：</div>
        <div style="width: 90%;text-align: left;margin-top: 10px;font-size: 15px;">如果遇到彩票中心通讯故障，无法获取"重庆时时彩"开奖结果，最后一个号码分配时间距离故障时间大于2小时，默认"重庆时时彩"开奖结果为000000</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Calculation",
      data() {
        return {
          dataA:'',
          dataB:'',
          dataresult:'',//计算结果
          ssc_period_no:'',//期数
          dataList:[],//参与用户
          luck_token:'',//开奖结果
          isshow:0,
          commodity_reward_type:0
        }
      },
      methods:{
        openthis:function(){
          if(this.isshow===0){
            this.isshow=1
          }else {
            this.isshow=0
          }
        },
        getList:function (pk) {
            let that=this;
            this.$get(this.$stors.state.ip+'/snatchtreasure/commoditydetailpage/?period_pk='+pk).then(function (res) {
                that.dataA=res.data.commodity_detail_data.a_value;
                that.dataB=res.data.commodity_detail_data.b_value;
                that.luck_token=res.data.commodity_detail_data.luck_token;
                that.ssc_period_no=res.data.commodity_detail_data.ssc_period_no;
                that.commodity_reward_type=res.data.commodity_detail_data.commodity_reward_type;
                let dataList=JSON.parse(res.data.commodity_detail_data.content);
                that.dataList=dataList.a_time_list;
            })
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
  .header{
    width: 100%;
    background: white;
    display: flex;
    font-size: 18px;
    align-items: center;
    height: 100px;
    font-weight: 600;
  }
  .lucky{
    width: 80px;
    height: 80px;
    border: 1px solid #b5b5b5;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .orderthis{
    margin-left: 3%;
    width: 95%;
    display: flex;
    margin-top: 3px;
    font-size: 13px;
    color: #b6b6b6;
  }
  .number_div{
    width: 92%;
    margin-left: 4%;
    margin-top: 20px;
    background: white;
  }
  .nmubera{
    width: 80px;
    height: 40px;
    line-height: 40px;
    background: #fb5060;
    color: white;
    font-weight: 600;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

  }
  .xiala{
    width: 15px;
    height: 10px;
  }
  .name_text{
    width: 100%;

  }
  .jieguo{
    width: 100%;
    text-align: center;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 600;
  }
  .zhuyi{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    height: 100px;
    color: #b6b6b6;
  }
</style>
