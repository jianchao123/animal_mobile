// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import Vue from 'vue'
import router from './router'
import store from './vuex/store'
import moment from 'moment'
import jquery from 'jquery'
import 'default-passive-events'
import {post,get,del,patch} from './utils/http'
import getUrl_utils from './utils/dates'
Vue.prototype.$utils = getUrl_utils;
//定义全局变量
Vue.config.productionTip = false;
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$delete=del;
Vue.prototype.$patch=patch;
Vue.prototype.$stors=store;
Vue.prototype.$moment=moment;
Vue.prototype.$jquery=jquery;

const vue=new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
});
export default vue;
