<template>
    <div>
      <div class="search">
        <input class="search_input" placeholder="请输入夺宝号" type="number" v-model="treNum">
        <img src="../../static/img/duobao.png" class="search_img" @click="querys">
      </div>

      <div class="treasure">
        <ul class="treasure_ul">
          <li class="treasure_li" v-for="(val,id) in dataList"><span v-text="val"></span></li>

        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TreasureNumber",
      data(){
          return{
            dataList:[],
              treNum:'',//夺宝号
          }
      },
      methods:{
          querys:function(){
              let that=this;
              this.$get(this.$stors.state.ip+'/snatchtreasure/querytokens/?period_id='+this.$route.query.id+'&text='+that.treNum).then(function (res) {
                  that.dataList=res.data;
              })
          },
            //获取夺宝号
        getList:function (id) {
            let that=this;
          this.$get(this.$stors.state.ip+'/snatchtreasure/querytokens/?period_id='+id).then(function (res) {
              that.dataList=res.data;
          })
        },
        processingData:function () {
          let that=this;
          that.getList(this.$route.query.id);
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
<style>
  body{
    overflow: hidden;
    overflow-y: scroll;
  }
</style>
<style scoped>
  .search{
    width: 70%;
    margin-left: 15%;
    height: 50px;
    border: 1px solid #d0adb4;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    margin-top: 60px;
  }
  .search_input{
    border: 0;
    width: 80%;
    height: 40px;
    margin-left: 5px;
    border-radius: 10px;
    font-size: 15px;
  }
  .search_img{
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .treasure{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .treasure_ul{
    width: 95%;
  }
  .treasure_li{
    width: 20%;
    float: left;
    margin-top: 10px;
    border: 1px solid #f7d5f8;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
    background-color: indianred; /* 浏览器不支持时显示 */
    background-image: linear-gradient(#b4e3fe, #d5f0fe,#f9d4f6, #fad5ea);
    margin-left: 4%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    font-weight: 600;
    color: #787878;
  }
</style>
