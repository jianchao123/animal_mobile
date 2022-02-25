<template>
  <div>
    <div class="detail">晾单</div>

    <div class="zj_detail"><span style="">商品信息</span></div>
    <div class="header">
      <div class="header_img">
        <img :src="imgs" class="img_open" style="margin-top: 24px">
      </div>
      <div class="header_div">
        <div class="now_money">
          <span>{{dataList.commodity_name}}</span>
        </div>
        <div class="time_sum" >
          <div class="left_name">
            <div class="name_text" >第{{dataList.period_no}}期</div>
            <div class="name_text">我参与的人次:{{dataList.participate_amounts}}人次</div>
            <div class="name_text">揭晓时间:{{dataList.time}}</div>
            <div class="name_text">幸运号码:{{dataList.luck_token}}  </div>
          </div>
        </div>
      </div>
    </div>
    <div style="clear: both"></div>

    <div class="zj_div" style="margin-top: 20px">
      <img src="../../static/img/caise.png" class="zj_img">
    </div>

    <div class="zj_detail"><span style="">领奖信息</span></div>

    <div class="zj_way">
      <div style="text-align: left;margin-top: 8px">
        <span class="way_span">领取方式</span>
        <span class="text_span" v-text="receive(dataList.accept_prize_type)"></span>
      </div>
      <div style="text-align: left;margin-top: 8px">
        <span class="way_span">价值</span>
        <span class="text_span">￥1800</span>
      </div>
      <div style="text-align: left;margin-top: 8px" v-if="dataList.is_card===false">
        <span class="way_span">物流公司</span>
        <span class="text_span" v-text="dataList.express_company">顺丰快递</span>
      </div>
      <div style="text-align: left;margin-top: 8px" v-if="dataList.is_card===false">
        <span class="way_span">物流单号</span>
        <span class="text_span" v-text="dataList.express_number"></span>
      </div>
      <div style="text-align: left;margin-top: 8px" v-if="dataList.is_card===false">
        <span class="way_span">收货人名</span>
        <span class="text_span" v-text="dataList.recipents_name"></span>
      </div>
      <div style="text-align: left;margin-top: 8px" v-if="dataList.is_card===false">
        <span class="way_span">收货地址</span>
        <span class="text_span" v-text="dataList.recipents_address"></span>
      </div>
      <div style="text-align: left;margin-top: 8px" v-if="dataList.is_card">
        <span class="way_span">卡号</span>
        <span class="text_span" v-text="dataList.card_number"></span>
      </div>
      <div style="text-align: left;margin-top: 8px" v-if="dataList.is_card">
        <span class="way_span">卡密</span>
        <span class="text_span" >请到卡号卡密页面查看</span>
      </div>
    </div>


    <div class="bottom_back"></div>

    <div class="jiucai">
      <textarea placeholder="请发表获奖感言" class="sayOne" v-model="saytext"></textarea>
    </div>

    <div style="margin-left: 10px">
      <img :src="val" class="url_img" v-for="(val,id) in imageUrl" v-if="imageUrl.length>0">
      <div class="input_Img">
        <img src="../../static/img/addimg.png" class="url_img_back">
        <input @change="uploadInputchange"   id="uploadFileInput" type="file" accept="image/*" class="imgInp">
      </div>
      <div style="clear: both"></div>
    </div>

    <div class="addUser" @click="addSblimt" v-if="dataList.is_sun_the_order===false">
      <div class="user_div" >提交</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "AiringOrder",
    data() {
      return {
        dataList:[],
        imgs:'',
        imageUrl:[],//上传展示的图片
        saytext:'',//获奖感言
      }
    },
    methods:{
      //领取方式
      receive:function(type){
        if(type===1){
          return '兑换牛逼豆'
        }else if(type===2){
          return '转到回收商'
        }else if(type===3){
          return '领取相应奖品([实物 | 卡密])'
        }
      },
      //触发input change事件
      uploadInputchange(){
        let that=this;
        if(that.imageUrl.length<4){
          let file = document.getElementById("uploadFileInput").files[0];//选择的图片文件
          this.$get(this.$stors.state.ip+'/user/getqiniutoken/?upload_file_name=headimg/'+file.name)
            .then(function (res) {
              if(res.code===0){
                that.uploadImgToQiniu(file,res.data.upload_token);
              }
            });
        }else {
          that.showtast('最多上传三张图片哦！');
        }



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
            that.imageUrl.push(url+res.data.key);
        }).catch(function(err) {
          //上传失败
        });
      },
      showtast:function(msg){
        this.$toast(msg);
      },
      //提交
      addSblimt:function () {
        let that=this;
        let upload_img=that.imageUrl.join(',');//上传时的图片
        let pk=this.$route.query.pk;
        // let goto=this.$router;
        this.$post(this.$stors.state.ip+'/activitys/suntheorders/',
          {commodity_name:that.dataList.commodity_name,
          img_url:that.imgs,period_no:that.dataList.period_no,
            reward_time:that.dataList.time,luck_player_name:that.dataList.luck_player_name,
          luck_player:that.dataList.game_player_pk,period:that.dataList.period_pk,
            text:that.saytext,upload_img:upload_img,luck_player_headimg:that.dataList.luck_player_headimg}).then(function (res) {
              if(res.code===0){
                that.showtast('提交成功！');
                that.getList(pk);
                // goto.replace({path:'/WinningRecord'});
              }
        })
      },
      getList:function (pk) {
        let that=this;
        this.$get(this.$stors.state.ip+'/user/accept/prize/info/?prize_record_pk='+pk).then(function (res) {
          that.dataList=res.data;
          that.imgs=res.data.commodity_image[0].image_path;
        })
      },
      processingData:function () {
        let that=this;
        that.getList(this.$route.query.pk);
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
  .detail{
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin-top: 20px;
  }
  .zj_div,.zj_detail{
    width: 94%;
    margin-left: 3%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
  .zj_img{
    width: 100%;
  }
  .zj_detail{
    height: 50px;
    font-size: 17px;
    font-weight: 600;
    justify-content: start;
    border-bottom: 1px solid #b3b3b3;
  }
  .zj_way{
    width: 94%;
    margin-left: 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
  }
  .sayOne{
    height: 48px;
    border-radius: 5px;
    width: 100%;
  }
  .url_img{
    width: 100px;
    height: 100px;
    float: left;
    margin-top: 20px;
    margin-right: 15px;
  }
  .way_span{
    font-size: 14px;
    color: #989898;
    display: inline-block;
    width: 56px;
  }
  .text_span{
    font-size: 14px;
    color: #3a3a3a;
    margin-left: 15px;
  }
  .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #eeeeee;
    margin-top: 4px;
    float: left;
    position: relative;
    border-bottom: 1px solid #c0c0c0;
  }
  .header_img{
    width: 30%;
  }
  .header_div{
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .img_open{
    width: 80%;
    margin-top: 15px;
    height: 86px;
    margin-left: 5%;
    border-radius: 10px;
    margin-bottom: 8px;
  }
  .now_money{
    width: 220px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
    font-size: 15px;
    font-weight: 600;
    margin-top: 8px;
  }

  .time_sum{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .left_name{
    width: 90%;
  }

  .name_text{
    font-size: 13px;
    color: #bababa;
    text-align: left;
    width: 100%;
  }
  .bottom_back{
    width: 100%;
    height: 1px;
    background: #bcbcbc;
    margin-top: 15px;
  }
  .jiucai{
    width: 94%;
    margin-left: 3%;
    margin-top: 20px;
    border: 1px solid #d0d0d0;
    border-radius: 10px;
    text-align: left;
    height: 50px;
    font-size: 14px;
    font-weight: 600;
    color: #767676;
  }
  .input_Img{
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .url_img_back{
    width: 100px;
    height: 100px;
    border-radius: 10px;
    line-height: 40px;
    position: absolute;
    font-size: 15px;
    color: #606060;
    top: 20px;
  }
  .imgInp{
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-top: 20px;
    opacity: 0;

  }
  .addUser{
    width: 100%;
    display: flex;
    margin-top: 40px;
    margin-bottom: 20px;
    justify-content: center;
  }
  .user_div{
    display: inline-block;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 600;
    color: white;
    background: #fa334a;
    border-radius: 10px;
    height: 50px;
    line-height: 50px;
    width: 180px;
  }
</style>
