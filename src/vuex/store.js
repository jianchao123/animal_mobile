import Vuex from 'vuex';
const state = {
    // ip:'https://shalilai.cn',//正式服务器
    // qiniuyunurl:'http://image-pro.shalilai.cn/',//七牛云正式服务器
    // uploadImg: 'https://up-z1.qiniup.com/',  //正式上传域地址

    // ip:'https://47.106.227.96',//测试服务器
    ip:'http://animal.xhty.site',//测试服务器
    qiniuyunurl:'http://img-shopping-test.xhty.site/',//七牛云测试服务器
    uploadImg:'https://up-z2.qiniup.com/',//测试上传域地址
    login:false,//登录时
    soonOpen:false,//倒计时
    showWinning:true,//中奖的弹框显示与否
    monitor:null,//实时监测中奖的定时器
    commodity_name:'',//商品名字
    period_no:'',//周期号
    prize_record_pk:'',//商品id
    myfunction:true,//实时监测中奖的方法只能进入一次
    showscroll:false,//
};

const mutations = {
  changeTestMsg(state){
    state.myfunction = true;
  },
  changeChildText(state){
    state.myfunction = false;
  },
  showchangeis(){
    state.showscroll = true;
  },
  showchangeno(){
    state.showscroll = false;
  }
};

const store = new Vuex.Store({
  state: state,
  mutations: mutations
});

export default store;
