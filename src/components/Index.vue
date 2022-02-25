<template>
  <div class="index">
    <router-view></router-view>
    <Tabbaer :data="tabbarData" />
  </div>
</template>
<script>
  import Tabbaer from '@/components/Tabbaer'
  export default {
    inject:['reload'],
    name:'index',
    data() {
      return {
        // test:1,
        tabbarData:[
          //上传正式服务器的时候要用allFile/本地用static
          {title:'首页',icon:true,path:'/Index/Home',img:'/allFile/img/shouye.png',selection:'/allFile/img/shouye1.png'},
          {title:'揭晓',icon:false,path:'/Index/Unveiled',img:'/allFile/img/jiexiao.png',selection:'/allFile/img/jiexiao1.png'},
          {title:'分类',icon:false,path:'/Index/Classification',img:'/allFile/img/fenlei.png',selection:'/allFile/img/fenlei1.png'},
          {title:'我的',icon:false,path:'/Index/Personal',img:'/allFile/img/wode.png',selection:'/allFile/img/wode1.png'},
        ],
        isFirstEnter:false
      }
    },
    methods:{
      gobacks:function () {
        this.reload()
      },
      processingData:function () {
        let that=this;
        let login=localStorage.getItem('login');
        let stors=this.$stors;
        let goto=this.$router;
        let path=this.$route.path;
        // console.log(stors.state.myfunction)
        if(login!==null&&login!=='2'&&stors.state.myfunction){
          stors.state.monitor=setInterval(()=>{
            stors.state.soonOpen=true;
            this.$get(this.$stors.state.ip+'/snatchtreasure/popprizedialog/').then(function (res) {
              if(res.data.period_no){
                localStorage.setItem('commodity_name',res.data.commodity_name);
                localStorage.setItem('period_no',res.data.period_no);
                localStorage.setItem('period_pk',res.data.period_pk);
                localStorage.setItem('prize_record_pk',res.data.prize_record_pk);
                localStorage.setItem('showWinning','true');
                stors.commit('changeTestMsg');
                goto.go(path);
                // that.gobacks();
              }

              stors.state.soonOpen=false;
            });
            if(login===null){
              clearInterval(stors.state.monitor);
            }
          },2000);
          stors.commit('changeChildText');
        }
      }
    },
    components:{
      'Tabbaer':Tabbaer
    },
      mounted(){
          this.processingData();
      },
    activated() {
      if(!this.$route.meta.isBack || this.isFirstEnter){
        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
        // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
        this.allTaskList= [];// 把数据清空，可以稍微避免让用户看到之前缓存的数据
        this.processingData();
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
  .index{
    width:100%;
    height:100%;
  }


</style>
