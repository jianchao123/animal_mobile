<template>
    <div  class="alltext" :style="conheight">
      <div class="header" @click="updateImg">
        <div class="header_name">头像</div>
        <div style="display: flex;justify-content: center;align-items: center">
          <img :src='imageUrl'  class="user_img">
          <img src="../../static/img/you.png" class="you_img">
        </div>
      </div>
      <div class="header">
        <div class="header_name">性别</div>
        <div style="display: flex;justify-content: center;align-items: center">
          <span class="header_name" style="margin-right: 10px" v-text="sixname"></span>
          <mt-switch v-model="sixs" style="margin-right: 20px"></mt-switch>
        </div>
      </div>
      <div class="header">
        <div class="header_name">昵称</div>
        <div>
          <input class="password" type="text"  v-model="nickName" autocomplete="false"  placeholder="请输入昵称">
        </div>
      </div>
      <div class="header">
        <div class="header_name">密码</div>
        <div>
         <input class="password"  autocomplete="false" v-model="passwords" type="password" placeholder="请输入密码">
        </div>
      </div>
      <div class="addUser">
        <div class="user_div"  @click="savePosonal">保存</div>
      </div>

      <div class="img_text">
        <mt-popup
          v-model="popupVisible"
          position="bottom">
          <div>
            <div class="input_Img">
              <span class="updatas">上传照片</span>
              <input @change="uploadInputchange"  id="uploadFileInput" type="file" accept="image/*" class="imgInp">
            </div>
            <span class="updatas2" @click="cancel">取消</span>
          </div>


        </mt-popup>

      </div>
      <!--<div>-->
        <!--<label>图片二</label>-->
        <!--&lt;!&ndash;调取相机&ndash;&gt;-->

      <!--</div>-->
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "SetUp",
      data(){
          return{
            popupVisible:false,
            sixs:true,
            sixname:'男',
            imageUrl:'',
            nickName:'',
            passwords:'',
            upimgurl:''
          }
      },
      methods:{
        updateImg:function () {
          this.popupVisible=true;
        },
        cancel:function () {
          this.popupVisible=false;
        },
        //保存
        savePosonal:function(){
          let that=this;
          let sex;
          let data;
          let goBack=this.$router;
          let stors=this.$stors;
          if(that.sixname==='男'){
                sex=1;
            }else {
                sex=2;
            }
            if(that.passwords===''){
              data={nickname:that.nickName,sex:sex,headimage:that.upimgurl}
            }else {
              data={nickname:that.nickName,sex:sex,headimage:that.upimgurl,password:that.passwords}
            }

          this.$post(this.$stors.state.ip+'/user/update/player/',data).then(function (res) {
              if(res.code===0){
                localStorage.clear();
                stors.commit('changeChildText');
                goBack.push({path:'/Login'});
              }
          })
        },
        //触发input change事件
        uploadInputchange(){
            let that=this;
            let file = document.getElementById("uploadFileInput").files[0];   //选择的图片文件
            this.$get(this.$stors.state.ip+'/user/getqiniutoken/?upload_file_name=headimg/'+file.name)
                .then(function (res) {
                    if(res.code===0){
                        that.uploadImgToQiniu(file,res.data.upload_token);
                    }
            });

        },
        //上传图片到七牛
        uploadImgToQiniu(file,upload_token){
            let that=this;
            let url=this.$stors.state.qiniuyunurl;
            let stors=this.$stors;
            const axiosInstance = axios.create({withCredentials: false});    //withCredentials 禁止携带cookie，带cookie在七牛上有可能出现跨域问题
            let data = new FormData();
            data.append('token', upload_token);     //七牛需要的token，叫后台给，是七牛账号密码等组成的hash
            data.append('file', file);
            data.append('key', 'headimg/'+file.name);
            axiosInstance({
                method: 'POST',
                url: stors.state.uploadImg,
                data: data,
                timeout:30000,      //超时时间，因为图片上传有可能需要很久
                onUploadProgress: (progressEvent)=> {
                    //imgLoadPercent 是上传进度，可以用来添加进度条
                    let imgLoadPercent = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                },
            }).then(res =>{
                document.getElementById("uploadFileInput").value = '';//上传成功，把input的value设置为空，不然 无法两次选择同一张图片
                //上传成功...  (登录七牛账号，找到七牛给你的 URL地址) 和 data里面的key 拼接成图片下载地址
                //这tm是外链地址
                that.imageUrl=url+res.data.key;
                that.upimgurl=res.data.key;
            }).catch(function(err) {
                //上传失败
            });
        },
        getList:function () {
          let that=this;
          this.$get(this.$stors.state.ip+'/user/userinformation/').then(function (res) {
            that.imageUrl=res.data.headimage;
            that.nickName=res.data.nickname;
            if(res.data.sex===1){
              that.sixname='男'
            }else {
              that.sixname='女'
            }
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
      watch:{
          'sixs':function (newval) {
            if(newval){
              this.sixname='男'
            }else {
              this.sixname='女'
            }
          }
      }
    }
</script>

<style scoped>
  .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 60px;
    border-bottom: 1px solid #c4c4c4;
    align-items: center;
  }
  .alltext{
    width: 100%;
    background: white;
  }
  .mint-popup-bottom{
    width: 100%;
    height: 147px;
  }
  .header_name{
    font-size: 16px;
    color: #646464;
    margin-left: 20px;
    font-weight: 600;
  }
  .user_img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .you_img{
    width: 10px;
    height: 15px;
    margin-right: 20px;
  }
  .password{
    width: 200px;
    border: 0;
    height: 40px;
    margin-right: 20px;
    background: #e4e4e4;

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
  .img_text{
    width: 100%;
    height: 300px;
    background: white;
  }
  .imgInp{
    width: 200px;
    height: 40px;
    border-radius: 10px;
    margin-top: 20px;
    opacity: 0;

  }
  .input_Img{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .updatas{
    display: inline-block;
    width: 200px;
    height: 40px;
    border-radius: 10px;
    background: #ece9e9;
    line-height: 40px;
    position: absolute;
    font-size: 15px;
    color: #606060;
    top: 20px;
  }
  .updatas2{
    display: inline-block;
    width: 200px;
    height: 40px;
    border-radius: 10px;
    line-height: 40px;
    background: red;
    margin-top: 20px;
  }
</style>
