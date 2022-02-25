<template>
  <div class="alltext" :style="conheight">
    <div class="header">
      <div>
        <img src="../../static/img/login.png" class="header_img">
      </div>
    </div>

    <div >
      <div class="login_div">
        <span class="names">手机号</span>
        <span class="fenge"></span>
        <input type="number" class="login_input" placeholder="请输入手机号" v-model="phone">
      </div>
      <div class="login_div">
        <span class="names">验证码</span>
        <span class="fenge"></span>
        <input type="number" class="login_input" placeholder="请输入验证码" v-model="verificationCode">
        <span class="getcode" v-show="sendAuthCode" @click="getAuthCode">获取验证码</span>
        <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}} </span> 秒</span>
      </div>
      <div class="login_div">
        <span class="names">密 码</span>
        <span class="fenge"></span>
        <input type="password" class="login_input" placeholder="请输入密码" v-model="password">
      </div>
    </div>

    <div class="addUser">
      <div class="user_div" @click="goLogin">确认</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data(){
      return {
        conheight:{
          height:''
        },
        phone:'',
        verificationCode:'',//验证码
        password:'',
        shows:0,
        sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
        auth_time: 0, /*倒计时 计数器*/
        invite_code:''
      }
    },
    methods:{
      nopassLogin:function () {
        this.shows=1;
      },
      passLogin:function () {
        this.shows=0;
      },
      showTast:function(){
        this.$toast('注册成功');
      },
      goLogin:function(){
        let goto=this.$router;
        let that=this;
        let data;
        let ip=this.$stors.state.ip;
        if(this.password===''){
         return this.$toast('请输入密码');
        }else if(this.verificationCode===''){
          return this.$toast('请输入验证码');
        }else if(this.phone.length===11){
          if(that.invite_code===''){
            data={phone:that.phone,password:that.password,code:that.verificationCode}
          }else {
            data={phone:that.phone,password:that.password,code:that.verificationCode,invite_code:that.invite_code}
          }
          this.$post(ip+'/user/signup/player/',data).then(function (res) {
            if(res.code===0){
              that.showTast();
              goto.replace({path:'/Login'})
            }
          })
        }else {
          return this.$toast('请输入手机号');
        }
        // this.$router.push({path:'/Index/Home'})

      },
      getAuthCode:function () {
        let that=this;
        if(this.phone.length===11){
          this.$get(this.$stors.state.ip+'/user/sendsignupcode/?phone='+this.phone).then(function (res) {
            if(res){
              that.sendAuthCode = false;
              that.auth_time = 60;
              var auth_timetimer =  setInterval(()=>{
                that.auth_time--;
                if(that.auth_time<=0){
                  that.sendAuthCode = true;
                  clearInterval(auth_timetimer);
                }
              }, 1000);
            }
          })
        }else {
          this.$toast('请输入正确手机号');
        }

      }
    },
    mounted() {
      let that=this;
      let invite_code = this.$utils.getUrlKey('invite_code');
      if(invite_code){
        that.invite_code=invite_code;
        console.log(that.invite_code)
      }else {
        that.invite_code=''
      }

      this.conheight.height=window.innerHeight+'px';
    },
    beforeRouteLeave(to,from,next){
      to.meta.keepAlive=true;
      next()
    },
  }
</script>

<style scoped>
  .alltext{
    width: 100%;
    background: white;
  }
  .header{
    width: 100%;
    height: 190px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .header_img{
    width: 110px;
    height: 110px;
    border-radius: 10px;
    margin-top: 50px;
  }
  .logins{
    width: 100%;
    border-bottom: 1px solid #aaaa99;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
  }
  .fenge{
    display: inline-block;
    width: 1px;
    background: #8c8c7e;
    height: 30px;
  }
  .pass_login{
    width: 40%;
    height: 44px;
    text-align: center;
    margin-left: 20px;
    font-weight: 600;
  }
  .colors{
    border-bottom: 3px solid #ce0000;
    color: #ce0000;

  }
  .login_div{
    width: 90%;
    margin-left: 5%;
    border-radius: 10px;
    height: 50px;
    margin-top: 20px;
    display: flex;
    justify-content: start;
    align-items: center;
    border: 1px solid #cfcfcf;
  }
  .names{
    font-size: 15px;
    font-weight: 600;
    display: inline-block;
    width: 80px;
  }
  .login_input{
    height: 50px;
    border: 0;
    margin-left: 10px;
  }
  .getcode{
    text-decoration: underline;
    color: #dc0000;
    margin-left: 20px;
  }
  .auth_text{
    color: #188fed;
    margin-left: 20px;
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
