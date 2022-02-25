<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isRorterAlive"></router-view>
    </keep-alive>
    <!--<router-view v-if="isRorterAlive &&!keepAlive"></router-view>-->
  </div>
</template>

<script>
// import Login from './components/Login'

export default {
  name: 'App',
  provide(){
    return {
      reload:this.reloads
    }
  },
  data(){
    return {
      data:0,
      isRorterAlive:true,
      keepAlive:''
    }
  },
  methods:{
    reloads:function () {
      let that=this;
      that.isRorterAlive=false;
    this.$nextTick(function () {
      that.isRorterAlive=true;
    })
    }
  },
  mounted() {
    this.keepAlive=this.$route.meta.keepAlive
  }
}

</script>

<style>
#app {
  font-family:'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html, body {
  height: 100%;
  width: 100%;
  background: white;
  -webkit-overflow-scrolling: touch;
}
.mint-swipe-indicator{
  opacity: 0.8!important;
}
/*.mint-searchbar{*/
  /*padding: 0 !important;*/
/*}*/
ul li{
  list-style-type:none;
}
/* input不要箭头*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

input:-webkit-autofill,select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white  inset !important;
}


input {
  outline-color: invert;
  outline-style: none;
  outline-width: 0px;
  border: none;
  border-style: none;
  text-shadow: none;
  -webkit-appearance: none;
  -webkit-user-select: text;
  outline-color: transparent;
  box-shadow: none;
}
table{
  border-collapse:collapse;

}
.mt-progress-progress{
  background-color: #f86829;
}
* {
  margin: 0;
  padding: 0;
}
</style>
