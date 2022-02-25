<template>
    <div class="all_div">
      <div class="hader_div">
        <img src="../../static/img/shouhuo.png" class="hader_img">
        <input class="hader_input" v-model="username" placeholder="收货人名称">
        <div class="last_div"></div>
      </div>
      <div class="hader_div">
        <img src="../../static/img/phone.png" class="hader_img">
        <input class="hader_input" type="number" v-model="userPhone" placeholder="收货人号码">
        <div class="last_div"></div>
      </div>
      <div class="addUser" v-if="showText===0">
        <div class="user_div" @click="adduser">确认添加</div>
      </div>
      <div class="addUser" v-else>
        <div class="user_div" @click="updateuser">确认更新</div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "AddUser",
      data(){
          return {
            username:'',
            userPhone:'',
            userPk:'',
            showText:0,
            isFirstEnter:''
          }
      },
      methods:{
          //添加
        adduser:function () {
          let that=this;
          if(this.userPhone.length===11){
            this.$post(this.$stors.state.ip+'/businessman/userconsignees/',{phone:this.userPhone,
              consignee_name:this.username}).then(function (res) {
              if(res.code===0){
                that.showtast('添加成功!')
              }
            })
          }else if(this.username===''){
            return that.showtast('请输入收货人姓名')
          }else {
            return that.showtast('请输入11位数的号码')
          }
        },
        //更新
        updateuser:function(){
          let that=this;
          if(this.userPhone.length===11){
            this.$post(this.$stors.state.ip+'/businessman/userconsignees/',{phone:this.userPhone,
              consignee_name:this.username,user_consignee_pk:that.userPk}).then(function (res) {
              if(res.code===0){
                that.showtast('更新成功!')
              }
            })
          }else if(this.username===''){
            return that.showtast('请输入收货人姓名')
          }else {
            return that.showtast('请输入11位数的号码')
          }
        },
        showtast:function (msg) {
          this.$toast(msg);
        },
        processingData:function () {
          let that=this;
          if(this.$route.query.pk){
            that.username=this.$route.query.name;
            that.userPhone=this.$route.query.phone;
            that.userPk=this.$route.query.pk;
            that.showText=1;
          }else {
            that.username='';
            that.userPhone='';
            that.userPk='';
            that.showText=0;
          }
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
  .hader_div{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    height: 70px;
    border-bottom: 1px solid #a3a3a3;
  }
  .hader_img{
    width: 25px;
    height: 28px;
    margin-left: 20px;
  }
  .hader_input{
    width: 50%;
    height: 40px;
    border: 0;
    font-size: 16px;
  }
  .last_div{
    width: 30%;
  }
  .addUser{
    width: 100%;
    display: flex;
    margin-top: 80px;
    justify-content: center;
  }
  .user_div{
    font-size: 18px;
    font-weight: 600;
    color: white;
    background: red;
    border-radius: 10px;
    height: 50px;
    line-height: 50px;
    width: 150px;
  }
</style>
