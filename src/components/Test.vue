<template>
      <!--<li v-for='item in items'>{{item.name}}</li>-->
    <!--</ul>-->
  <div class="vueBox">
    <div class="marquee">
      <div class="marquee_title">
        <span>最新战报</span>
      </div>
      <div class="marquee_box">
        <ul class="marquee_list" :class="{marquee_top:animate}">
          <li v-for="(item, index) in marqueeList">
            jdkgjgowejgoj
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>

  export default {
    name:'Test',
    data(){
      return {
        animate: false,
        marqueeList: [
          {
            name: '1军',
            city: '北京',
            amount: '10'
          },
          {
            name: '2军',
            city: '上海',
            amount: '20'
          },
          {
            name: '3军',
            city: '广州',
            amount: '30'
          },
          {
            name: '4军',
            city: '重庆',
            amount: '40'
          }
        ]
      }
    },
    mounted(){
      // setInterval(this.scroll,2000)//上下滚动
      // this.start();//左右滚动

    },
    created: function () {
      setInterval (this.showMarquee, 2000)
    },
    methods: {
      showMarquee: function () {
        this.animate = true;
        setTimeout (() => {
          this.marqueeList.push (this.marqueeList[ 0 ]);
          this.marqueeList.shift ();
          this.animate = false;
        }, 500);

      }
    }

  }
</script>
<style>
  /*div, ul, li, span, img {*/
    /*margin: 0;*/
    /*padding: 0;*/
    /*display: flex;*/
    /*box-sizing: border-box;*/
    /*width: 100%;*/
  /*}*/

  .marquee {
    width: 100%;
    height: 50px;
    align-items: center;
    color: #3A3A3A;
    background-color: #b3effe;
    display: flex;
    box-sizing: border-box;
  }

  .marquee_title {
    padding: 0 20px;
    height: 30px;
    font-size: 14px;
    border-right: 1px solid #d8d8d8;
    align-items: center;
  }

  .marquee_box {
    display: block;
    position: relative;
    width: 60%;
    height: 30px;
    overflow: hidden;
  }

  .marquee_list {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }

  .marquee_top {
    transition: all 0.5s;
    margin-top: -30px
  }

  .marquee_list li {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding-left: 20px;
  }

  .marquee_list li span {
    padding: 0 2px;
  }

  .red {
    color: #FF0101;
  }

</style>
