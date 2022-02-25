<template>
    <div>
      <div class="header" v-for="(value,index) in dataList" v-if="dataList.length>0">
        <div class="names">
          <span v-text="value.recipents_name"></span>
          <span style="color: red;font-size: 13px" v-if="value.is_default">默认</span>
        </div>
        <div class="address">
          <span style="color: #727272" v-text="value.recipents_phone"></span>
          <span style="text-align: left" v-text="value.recipents_address"></span>
        </div>
        <div class="edits">
          <span class="fenge"></span>
          <span style="margin-right: 15px;font-weight: 600" @click="sublimit(value)">编辑</span>
        </div>
      </div>
      <div style="font-size: 14px;font-weight: 600;color: #a8a8a8;margin-top: 60px" v-if="dataList.length===0">
        暂无数据。。。
      </div>

      <div class="bottom_div"></div>
      <div class="addUser">
        <div class="user_div" @click="addAddress">添加收货地址</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Address",
      data() {
        return {
          dataList:[],
          isFirstEnter:''
        };
      },
      methods:{
        addAddress:function () {
          this.$router.push({path:'/AddAddress'})
        },
        sublimit:function(obj){
          this.$router.push({path: '/AddAddress', query: {obj: obj}});
        },
        getList:function () {
          let that=this;
          this.$get(this.$stors.state.ip+'/settings/shipping/address/').then(function (res) {
            that.dataList=res.data;
          })
        },
      },
      mounted(){
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

<style scoped>
  .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    background: white;
    margin-top: 5px;
    font-size: 13px;
  }
  .names{
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 45px;
  }
  .bottom_div{
    height: 60px;
    width: 100%;
  }
  .address{
    height: 45px;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  .edits{
    height: 45px;
    width: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .fenge{
    display: inline-block;
    width: 1px;
    height: 40px;
    background: #929292;
  }
  .addUser{
    width: 100%;
    display: flex;
    margin-top: 3px;
    left: 0;
    position: fixed;
    bottom: 20px;
    z-index: 100;
    justify-content: center;
  }
  .user_div{
    font-size: 16px;
    color: white;
    background: red;
    border-radius: 10px;
    height: 40px;
    line-height: 40px;
    width: 140px;
  }
</style>
