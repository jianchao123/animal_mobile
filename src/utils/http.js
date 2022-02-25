import axios from 'axios';
import store from '../vuex/store'
// import { Loading } from 'element-ui'
import vue from '../main'

// 允许携带cookie
axios.defaults.withCredentials=true;
//发送请求后，60s还没有收到请求答复，就超时报错
axios.defaults.timeout = 60000;
axios.defaults.baseURL ='';
//http request 拦截器
axios.interceptors.request.use(
  config => {
    if(store.state.soonOpen===false){
      vue.$indicator.open();
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
      vue.$indicator.close();
    if(response.data.code===0){
      return response;
    }else {
      vue.$toast(response.data.detail);
    }
  },
  err => {
    vue.$indicator.close();
    if(err.response.status){
      if (err.response.status == 504||err.response.status == 404) {
        vue.$toast('服务器被吃了⊙﹏⊙∥！');
      } else if (err.response.status == 403){
        localStorage.clear();
        store.commit('changeChildText');
        clearInterval(store.state.monitor);
        store.state.monitor=null;
        vue.$toast('登陆状态已结束！');
        vue.$router.replace({path:'/Login'});
      } else {
        vue.$toast('未知错误');
      }
    }else {
      localStorage.clear();
      store.commit('changeChildText');
      clearInterval(store.state.monitor);
      store.state.monitor=null;
      vue.$router.replace({path:'/Login'});
    }



  }
);


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}


/**
 * 封装del方法
 * @param url
 * @param del
 * @returns {Promise}
 */

export function del(url,params={}){
  return new Promise((resolve,reject) => {
    axios.delete(url,{
      params:params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}



