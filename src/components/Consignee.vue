<template>
    <div class="alltext" >
      <div class="header" v-for="(val,id) in dataList" v-if="dataList.length>0">
        <div class="first_name">
          <div>收货人：{{val.consignee_name}}</div>
          <div style="margin-top: 5px">收货商手机号：{{val.phone}}</div>
        </div>
        <div class="last_div">
          <span class="fenge"></span>
          <span class="shouka">收卡</span>
          <span class="shouka" style="margin-right: 5px" @click="editthis(id)">编辑</span>
        </div>
      </div>
      <div style="font-size: 14px;font-weight: 600;color: #a8a8a8;margin-top: 60px" v-if="dataList.length===0">
        暂无数据。。。
      </div>

      <div class="addUser">
        <div class="user_div" @click="addUser">添加收货人</div>
      </div>
      <div class="bottom_div"></div>
    </div>
</template>

<script>
    export default {
        name: "Consignee",
      data() {
        return {
          dataList:[],
          isFirstEnter:''
        };
      },
      methods:{
          //添加收获人
        addUser:function () {
          this.$router.push({path:'/AddUser'})
        },
        //更新收货人
        editthis:function(id){
          this.$router.push({path:'/AddUser',query:{pk:this.dataList[id].pk,phone:this.dataList[id].phone,
              name:this.dataList[id].consignee_name}})
        },
        getList:function () {
          let that=this;
          this.$get(this.$stors.state.ip+'/businessman/userconsignees/').then(function (res) {
            that.dataList=res.data;
          })
        },
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

<style scoped>
  .alltext{
    width: 100%;
  }
  .bottom_div{
    height: 60px;
    width: 100%;
  }
  .header{
    width: 100%;
    background: white;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    height: 60px;
    align-items: center;
    margin-top: 5px;

  }
  .first_name{
    width: 57%;
    margin-left: 3%;
    text-align: left;
  }
  .last_div{
    width: 40%;
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
  .shouka{
    display: inline-block;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #6f6f6f;
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
    width: 100px;
  }
</style>
