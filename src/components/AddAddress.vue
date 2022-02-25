<template>
    <div>
      <div class="list_div">
        <span style="margin-left: 15px;font-size: 16px;color: #535353">姓名：</span>
        <input v-model="recipents_name" placeholder="姓名" class="input_text">
      </div>
      <div class="list_div">
        <span style="margin-left: 15px;font-size: 16px;color: #535353">电话：</span>
        <input v-model="recipents_phone"  type="number" placeholder="电话号码" class="input_text">
      </div>
      <div class="list_div" v-show="secarchs===0">
        <span style="margin-left: 15px;font-size: 16px;color: #535353">地址</span>
        <el-select v-model="savesName" placeholder="请选择">
          <el-option
          v-for="item in saves"
          :key="item.pk"
          :label="item.name"
          :value="item.pk"
          >
          </el-option>
        </el-select>
        <el-select v-model="citysName" placeholder="请选择">
          <el-option
            v-for="item in citys"
            :key="item.pk"
            :label="item.name"
            :value="item.pk"
          >
          </el-option>
        </el-select>
        <el-select v-model="areaName" placeholder="请选择">
          <el-option
            v-for="item in area"
            :key="item.pk"
            :label="item.name"
            :value="item.pk"
          >
          </el-option>
        </el-select>
      </div>
      <div class="list_div" v-show="secarchs===1">
        <span style="margin-left: 15px;font-size: 16px;color: #535353">地址:</span>
        <span v-text="province_span" style="margin-left: 5px"></span>
        <span v-text="city_span" style="margin-left: 5px"></span>
        <span v-text="area_span" style="margin-left: 5px"></span>
        <span style="margin-left: 15px;color: #e10000" @click="changeaddress">修改</span>
      </div>
      <div class="list_div">
        <span style="margin-left: 15px;font-size: 16px;color: #535353">详细地址：</span>
        <input v-model="recipents_address" placeholder="如街道，门牌号，小区，单元室等" class="input_text">
      </div>
      <div style="position: relative;text-align: left;margin-top: 20px;margin-left: 20px">
        <input :class="{'input_div':checkes===1}" id="item1" type="radio" name="item" value="选项一" checked>
        <label for="item1" @click="checklist"></label>
        <span style="margin-left: 10px">设为默认地址</span>
      </div>
      <div class="addUser" v-if="showText===0">
        <div class="user_div" @click="saveAll">保存</div>
      </div>
      <div class="addUser" v-else>
        <div class="user_div" @click="toUpdate">更新</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "AddAddress",
      data(){
          return {
            checkes:0,
            savesName:'',//省的名字
            citysName:'',//市的名字
            areaName:'',//区的名字
            saves:[],//省
            citys:[],//市
            area:[],//区
            recipents_name:'',//名字
            recipents_phone:'',//手机号
            recipents_address:'',//详细地址
            userPk:'',//用户id
            showText:0,//更新或者添加
            secarchs:0,
            province_span:'',
            city_span:'',
            area_span:'',
          }
      },
      methods:{
        checklist:function () {
          if(this.checkes===0){
            this.checkes=1
          }else {
            this.checkes=0
          }
        },
        //添加
        saveAll:function(){
          let that=this;
          this.$post(this.$stors.state.ip+'/settings/shipping/address/',{recipents_name:this.recipents_name,
            recipents_phone:this.recipents_phone,recipents_address:this.recipents_address,province:this.savesName,
            city:this.citysName,area:this.areaName,is_default:this.checkes}).then(function (res) {
            if(res.code===0){
              that.toast('保存成功');
            }
          })
        },
        changeaddress:function(){
          this.secarchs=0;
        },
        //更新
        toUpdate:function(){
          let that=this;
          let data;
          if(that.savesName===''){
            data={recipents_name:this.recipents_name,
              recipents_phone:this.recipents_phone,recipents_address:this.recipents_address,is_default:this.checkes}
          }else {
            data={recipents_name:this.recipents_name,
              recipents_phone:this.recipents_phone,recipents_address:this.recipents_address,province:this.savesName,
              city:this.citysName,area:this.areaName,is_default:this.checkes}
          }
          this.$patch(this.$stors.state.ip+'/settings/shipping/address/'+this.userPk+'/',data).then(function (res) {
            if(res.code===0){
              that.toast('更新成功');
            }
          })
        },
        toast:function(msg){
          this.$toast(msg)
        },
        getaddress:function () {
          let that=this;
          this.$get(this.$stors.state.ip+'/settings/arealist/?level=1').then(function (res) {
            that.saves=res.data.results;
          })
        },
        processingData:function () {
          let that=this;
          this.$stors.state.soonOpen=true;
          if(this.$route.query.obj){
            that.secarchs=1;
            let obj=this.$route.query.obj;
            that.recipents_name=obj.recipents_name;
            that.recipents_phone=obj.recipents_phone;
            that.province_span=obj.province_name;
            that.city_span=obj.city_name;
            that.area_span=obj.area_name;
            that.recipents_address=obj.recipents_address;
            that.userPk=obj.pk;
            if(obj.is_default){
              that.checkes=1
            }else {
              that.checkes=0
            }
            this.showText=1;
          }else {
            that.secarchs=0;
            that.recipents_name='';
            that.recipents_phone='';
            that.province_span='';
            that.city_span='';
            that.area_span='';
            that.recipents_address='';
            that.userPk='';
            that.checkes=0;
            that.showText=0;
          }
          this.getaddress();
        }

      },
      beforeRouteLeave(to,from,next){
       to.meta.keepAlive=true;
        next()
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
      watch: {
        savesName: {
          handler(newId, oldName) {
            let that=this;
            this.$get(this.$stors.state.ip+'/settings/arealist/?level=2&pid='+newId).then(function (res) {
              that.citys=res.data.results;
              that.citysName=that.citys[0].pk;
            })
          },
        },
        citysName:{
          handler(newId, oldName) {
            let that=this;
            this.$get(this.$stors.state.ip+'/settings/arealist/?level=3&pid='+newId).then(function (res) {
              that.area=res.data.results;
              that.areaName=that.area[0].pk;
            })
          },
        }
      },
      destroyed() {
        this.$stors.state.soonOpen=false;
      }
    }
</script>

<style scoped>
  .list_div{
    width: 100%;
    text-align: left;
    font-size: 15px;
    background: white;
    height: 60px;
    margin-top: 2px;
    border-bottom: 1px solid #bbbbbb;
    display: flex;
    align-items: center;
  }
  .input_text{
    height: 50px;
    border: 0;
    width: 60%;
    font-size: 15px;
    color: #8e8e8e;
  }
  .xuanzeqi{
    width: 85px;
    height: 40px;
    margin-left: 10px;
  }
  input[type="radio"] {
    width: 20px;
    height: 20px;
    opacity: 0;
  }

  label {
    position: absolute;
    left: 5px;
    top: 3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #999;
    cursor: pointer;
  }

  /*设置选中的input的样式*/
  /* + 是兄弟选择器,获取选中后的label元素*/
  .input_div:checked+label {
    background-color: #fe6d32;
    border: 1px solid #fe6d32;
  }
  /*添加的加号与label进行拼接(一个矩形边框去掉上和左的边框),再旋转45度*/
  input:checked+label::after {
    position: absolute;
    content: "";
    width: 5px;
    height: 10px;
    top: 3px;
    left: 6px;
    border: 2px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
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
