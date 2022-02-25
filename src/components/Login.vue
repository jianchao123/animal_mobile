<template>
    <div class="alltext" :style="conheight">
      <div class="header">
        <div>
          <img src="../../static/img/login.png" class="header_img">
        </div>
        <div class="logins">
          <div class="pass_login" :class="{'colors':shows===0}" @click="passLogin">密码登陆</div>
          <span class="fenge"></span>
          <div class="pass_login"  style="margin-left: 0;margin-right: 20px" :class="{'colors':shows===1}" @click="nopassLogin">免密登陆</div>
        </div>
      </div>

      <div v-if="shows===0">
        <div class="login_div">
          <span class="names" >账号</span>
          <span class="fenge"></span>
          <input id="number"  type="text" class="login_input" v-model="userId" placeholder="请输入账号">
        </div>
        <div class="login_div">
          <span class="names">密码</span>
          <span class="fenge"></span>
          <input id="password" type="password" class="login_input"  v-model="password" placeholder="请输入密码">
        </div>
      </div>

      <div v-else>
        <div class="login_div">
          <span class="names" >手机号</span>
          <span class="fenge"></span>
          <input type="number" v-model="phone" class="login_input" placeholder="请输入手机号">
        </div>
        <div class="login_div">
          <span class="names">验证码</span>
          <span class="fenge"></span>
          <input type="number" class="login_input" v-model="code" placeholder="请输入验证码">
          <span class="getcode" v-show="sendAuthCode" @click="getAuthCode">获取验证码</span>
          <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}} </span> 秒</span>
        </div>
      </div>
      <div class="register" @click="register">还没有账号？立即注册</div>

      <div class="addUser" v-show="shows===0">
        <div class="user_div" @click="userLogin">确认</div>
      </div>
      <div class="addUser" v-show="shows===1">
        <div class="user_div" @click="codeLogin">确认</div>
      </div>
    </div>
</template>

<script>
    export default {
      inject:['reload'],
        name: "Login",
      data(){
          return {
            conheight:{
              height:''
            },
            shows:0,
            phone:'',//手机号
            code:'',//验证码
            userId:'',//用户id
            password:'',
            sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
            auth_time: 0, /*倒计时 计数器*/
          }
      },
      methods:{
        nopassLogin:function () {
          this.shows=1;
        },
        passLogin:function () {
          this.shows=0;
        },
        gobacks:function () {
          this.reload()
        },
        //账号登陆
        userLogin:function(){
          let that=this;
          let goin=this.$router;
          let stors=this.$stors;
          if(that.userId===''){
            return this.$toast('请输入账号')
          }else if(that.password===''){
            return this.$toast('请输入密码')
          }else {
            let data={phone:that.userId,password:that.password};
            this.$post(this.$stors.state.ip+'/user/app/signin/',data).then(function (res) {
              if(res.data.role==='玩家'){
                localStorage.setItem('login','1');
                stors.commit('changeTestMsg');
                goin.push({path:'/Index/Home'})
              }else {
                localStorage.setItem('login','2');
                goin.push({path:'CardDealer'})
              }
            })
          }
        },
        //免密登陆
        codeLogin:function(){
          let that=this;
          let goin=this.$router;
          let stors=this.$stors;
          if(that.phone.length===11&&that.code!==''){
            let data={phone:that.phone,code:that.code};
            this.$post(this.$stors.state.ip+'/user/app/signin/',data).then(function (res) {
              if(res.data.role==='玩家'){
                localStorage.setItem('login','1');
                stors.commit('changeTestMsg');
                goin.push({path:'/Index/Home'})
              }else {
                localStorage.setItem('login','2');
                goin.push({path:'CardDealer'})
              }

            })
          }else {
            this.$toast('请输入正确的手机号或验证码')
          }
        },
        register:function(){
          this.$router.push({path:'/Register'})
        },
        getAuthCode:function () {
          let that=this;
          if(this.phone.length===11){
            this.$get(this.$stors.state.ip+'/user/sendsignincode/?phone='+this.phone).then(function (res) {
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
        localStorage.clear();
        //防止页面后退
        // this.reload();
        // let stors=this.$stors;
        // stors.commit('changeTestMsg');
        // this.gobacks();
        // history.pushState(null, null, document.URL);
        // window.addEventListener('popstate', function () {
        //   history.pushState(null, null, document.URL);
        // });
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
    height: 250px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .register{
    width: 92%;
    margin-left: 4%;
    font-weight: 600;
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
    color: red;
    margin-top: 15px;
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
