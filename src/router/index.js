import Router from 'vue-router'
export default new Router({
  mode: 'history',
  serollBehavior(to,from,savePostion){
  if(savePostion){
    return savePostion
  }else {
    return{x:0,y:0}
  }
  },
  // base:'../dist',
  routes: [
    {
      path: '/',
      redirect: '/Index/Home',
      // //懒加载
      // meta: {allowBack: false},
      component: resolve => require.ensure([], () => resolve(require('../components/Home.vue')),'Home'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path: '/Login',
      name: 'Login',
      meta: {allowBack: false},
      component: resolve => require.ensure([], () => resolve(require('../components/Login.vue')),'Login'),
    },
    {
      path:'/Register',
      name: 'Register',
      component: resolve => require.ensure([], () => resolve(require('../components/Register.vue')),'Register'),
      meta:{keepAlive:true,isBack:false}
    },
    {
    path:'/CardDealer',
    name: 'CardDealer',//
    component: resolve => require.ensure([], () => resolve(require('../components/CardDealer.vue')),'CardDealer'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/CardDealerIndex',
      name: 'CardDealerIndex',//
      component: resolve => require.ensure([], () => resolve(require('../components/CardDealerIndex.vue')),'CardDealerIndex'),
      meta:{keepAlive:true,isBack:false}
    },
    {
    path:'/WinningBox',
    name: 'WinningBox',
    component: resolve => require.ensure([], () => resolve(require('../components/WinningBox.vue')),'WinningBox'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/SubstituteCharge',
      name: 'SubstituteCharge',
      component: resolve => require.ensure([], () => resolve(require('../components/SubstituteCharge.vue')),'SubstituteCharge'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/BitcoinList',
      name: 'BitcoinList',
      component: resolve => require.ensure([], () => resolve(require('../components/BitcoinList.vue')),'BitcoinList'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/CardCollection',
      name: 'CardCollection',
      component: resolve => require.ensure([], () => resolve(require('../components/CardCollection.vue')),'CardCollection'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/InvitationList',
      name: 'InvitationList',//
      component: resolve => require.ensure([], () => resolve(require('../components/InvitationList.vue')),'InvitationList'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/PublicRefresh',
      name: 'PublicRefresh',//
      component: resolve => require.ensure([], () => resolve(require('../components/PublicRefresh.vue')),'PublicRefresh'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/Test',
      name: 'Test',
      component: resolve => require.ensure([], () => resolve(require('../components/Test.vue')),'Test'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/Tabbaer',
      name: 'Tabbaer',
      component: resolve => require.ensure([], () => resolve(require('../components/Tabbaer.vue')),'Tabbaer'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/UserDetail',
      name: 'UserDetail',
      component: resolve => require.ensure([], () => resolve(require('../components/UserDetail.vue')),'UserDetail'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/TrendChart',
      name: 'TrendChart',
      component: resolve => require.ensure([], () => resolve(require('../components/TrendChart.vue')),'TrendChart'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/AwardPlatform',
      name: 'AwardPlatform',
      component: resolve => require.ensure([], () => resolve(require('../components/AwardPlatform.vue')),'AwardPlatform'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/Recharge',
      name: 'Recharge',
      component: resolve => require.ensure([], () => resolve(require('../components/Recharge.vue')),'Recharge'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/ReceiveDetails',
      name: 'ReceiveDetails',
      component: resolve => require.ensure([], () => resolve(require('../components/ReceiveDetails.vue')),'ReceiveDetails'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/TreasureNumber',
      name: 'TreasureNumber',
      component: resolve => require.ensure([], () => resolve(require('../components/TreasureNumber.vue')),'TreasureNumber'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/Calculation',
      name: 'Calculation',
      component: resolve => require.ensure([], () => resolve(require('../components/Calculation.vue')),'Calculation'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/Attendance',
      name: 'Attendance',
      component: resolve => require.ensure([], () => resolve(require('../components/Attendance.vue')),'Attendance'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/PastPeriod',
      name: 'PastPeriod',
      component: resolve => require.ensure([], () => resolve(require('../components/PastPeriod.vue')),'PastPeriod'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/CommodityDetails',
      name: 'CommodityDetails',
      component: resolve => require.ensure([], () => resolve(require('../components/CommodityDetails.vue')),'CommodityDetails'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/AiringOrder',
      name: 'AiringOrder',
      component: resolve => require.ensure([], () => resolve(require('../components/AiringOrder.vue')),'AiringOrder'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/CustomerService',
      name: 'CustomerService',
      component: resolve => require.ensure([], () => resolve(require('../components/CustomerService.vue')),'CustomerService'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/FindFun',
      name: 'FindFun',
      component: resolve => require.ensure([], () => resolve(require('../components/FindFun.vue')),'FindFun'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/DryingList',
      name: 'DryingList',
      component: resolve => require.ensure([], () => resolve(require('../components/DryingList.vue')),'DryingList'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/OrderRecord',
      name: 'OrderRecord',
      component: resolve => require.ensure([], () => resolve(require('../components/OrderRecord.vue')),'OrderRecord'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/WinningRecord',
      name: 'WinningRecord',
      component: resolve => require.ensure([], () => resolve(require('../components/WinningRecord.vue')),'WinningRecord'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/Kalman',
      name: 'Kalman',
      component: resolve => require.ensure([], () => resolve(require('../components/Kalman.vue')),'Kalman'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/SetUp',
      name: 'SetUp',
      component: resolve => require.ensure([], () => resolve(require('../components/SetUp.vue')),'SetUp'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/AddAddress',
      name: 'AddAddress',
      component: resolve => require.ensure([], () => resolve(require('../components/AddAddress.vue')),'AddAddress'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/Address',
      name: 'Address',
      component: resolve => require.ensure([], () => resolve(require('../components/Address.vue')),'Address'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/AddUser',
      name: 'AddUser',
      component: resolve => require.ensure([], () => resolve(require('../components/AddUser.vue')),'AddUser'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/Consignee',
      name: 'Consignee',
      component: resolve => require.ensure([], () => resolve(require('../components/Consignee.vue')),'Consignee'),
      meta:{keepAlive:true,isBack:false}
    },
    {
      path:'/Index',
      name: 'Index',
      component: resolve => require.ensure([], () => resolve(require('../components/Index.vue')),'Index'),
      meta:{keepAlive:true,isBack:false},
      children:[
        {
          path: '/Index/Home',
          name: 'Home',
          component: resolve => require.ensure([], () => resolve(require('../components/Home.vue')),'Home'),
          meta:{keepAlive:true,isBack:false}
        },
        {
          path: '/Index/Unveiled',
          name: 'Unveiled',
          component: resolve => require.ensure([], () => resolve(require('../components/Unveiled.vue')),'Unveiled'),
          meta:{keepAlive:true,isBack:false}
        },
        {
          path: '/Index/Classification',
          name: 'Classification',
          component: resolve => require.ensure([], () => resolve(require('../components/Classification.vue')),'Classification'),
          meta:{keepAlive:true,isBack:false}
        },
        {
          path: '/Index/Personal',
          name: 'Personal',
          component: resolve => require.ensure([], () => resolve(require('../components/Personal.vue')),'Personal'),
          meta:{keepAlive:true,isBack:false}
        },
        ]
    },

  ]
})
