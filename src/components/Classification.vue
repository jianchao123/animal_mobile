<template>
    <div class="all">
      <div class="header" >
        <div class="first">
          <div class="first_div">
            <ul class="first_ul">
              <li v-for="(item,id) in leftData" @click="secarchs(item.pk,id)">
                <span v-text="item.type_name" :class="{span_color:type_color===id}"></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="secound" :style="conheight">
          <div class="first_div" :style="conheight">
            <div class="first_ul colors" :style="conheight">
              <div class="all_div" v-for="(val,index) in rightData" @click="goDetails(val.period_pk)">
               <div class="div_img">
                 <img :src="handleImg(val.commodity_images)" class="rigth_img">
               </div>
               <div class="div_text">
                 <div class="div_names"><span v-text="val.commodity_name"></span></div>
                 <div class="div_jindu">揭晓进度<span style="color: red" v-text="percentage(val.rate)+'%'"></span></div>
                 <div class="jindutiao">
                   <div style="width: 71%;margin-left: 3%"><mt-progress :value="percentage(val.rate)" :bar-height="5"></mt-progress></div>
                 </div>
               </div>
             </div>

            </div>
          </div>
        </div>
      </div>
      <!--<div class="bottom_div"></div>-->
      <WinningBox v-show="showbox==='true'"/>
    </div>
</template>

<script>
  import WinningBox from '@/components/WinningBox'
    export default {
        name: "Classification",
      data(){
          return {
            conheight:{
              height:''
            },
            showbox:false,
            leftData:[],//分类
            rightData:[],//分类详情
            type_color:0,//分类颜色
            realTime:null,
            isFirstEnter:false
          }
      },
      components:{
        'WinningBox':WinningBox
      },
      methods: {
        getHeight() {
          this.conheight.height = window.innerHeight - 80 + 'px';
        },
        //处理图片
        handleImg:function(img){
          let image=img.split(',');
          if(image.length>=1){
            return image[0];
          }
        },
        //百分比
        percentage:function(id){
          return parseInt(id*100)
        },
          //详情
        goDetails:function(pk){
            this.$router.push({path:'/CommodityDetails' ,query: {pk: pk}})
        },
        getList:function (type) {
          let that=this;
          this.$get(this.$stors.state.ip+'/snatchtreasure/commoditytag/').then(function (res) {
            that.leftData=res.data;
            that.secarchs(res.data[0].pk,0);
          })
        },
        secarchs:function (pk,id) {
          let that=this;
          that.type_color=id;
          that.pkText=pk;
          this.$get(this.$stors.state.ip+'/snatchtreasure/periodbytag/?tag_id='+pk).then(function (res) {
              that.rightData=res.data;
          })
        },
        processingData:function () {
          let that=this;
          //每0.5秒监测是否中奖
          that.realTime=setInterval(function (){
            that.showbox=localStorage.getItem('showWinning');
            if(that.showbox==='true'){
              //修改body样式
              document.querySelector('body').setAttribute('style', 'overflow:hidden')
            }else {
              document.querySelector('body').setAttribute('style', 'overflow:scroll')
            }
          },500);
          this.getList();
          window.addEventListener('resize', this.getHeight);
          this.getHeight()
        }
      },
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
          // that.processingData();
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
          let that=this;
        next(vm => {

        })
      },
      //在页面离开时记录滚动位置
      beforeRouteLeave(to,from,next){
        let that=this;
        that.type_color= this.type_color;
        that.pkText=this.pkText;
        to.meta.keepAlive=true;
        localStorage.setItem('showWinning','false');
        clearInterval(that.realTime);
        next()
      },
    }
</script>

<style scoped>
  .all{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .first{
    width: 30%;
    height: 100%;

  }
  .header{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    background: #eeeeee;
  }
  .first_div{
    width: 100%;
    height: 450px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .span_color{
    color: red;
    font-size: 16px;
  }
  .first_ul{
    width: 109%;
    height: 450px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .first_ul li{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #969696;
    font-weight: 600;
  }

  .secound{
    width: 100%;
    height: 100%;
    background: #eeeeee;
  }
  .all_div{
    width: 100%;
    float: left;
    display: flex;
    justify-content: space-between;
    margin-top: 1px;

  }
  .div_img{
    width: 30%;
    background: white;
    /*height: 80px;*/
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .mt-progress{
    height: 10px;
    line-height: 10px;
    margin-bottom: 5px;
  }
  .rigth_img{
    width: 60px;
    height: 60px;
    border-radius: 10px;
  }
  .div_text{
    width: 70%;
    background: white;
  }
  .div_names{
    width: 161px;
    margin-top: 5px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
    font-size: 12px;
    margin-left: 3%;
    font-weight: 600;
  }
  .div_jindu{
    width: 100%;
    font-size: 12px;
    color: #888888;
    text-align: left;
    margin-top: 10px;
    margin-left: 3%;
  }
</style>
