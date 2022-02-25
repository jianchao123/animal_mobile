<template lang="html">
  <div >
  <mt-loadmore :top-method="loadTop"
               :bottom-method="loadBottom"
               :bottom-all-loaded="allLoaded"
               :bottomPullText='bottomText'
               :auto-fill="false"
               ref="loadmore">

  </mt-loadmore>
  </div>
</template>

<script>
  export default {
    name: "PublicRefresh",
    data() {
      return {
        curPage:1,
        allLoaded:false,
        bottomText: '上拉加载更多...',
        list:[1,2,3,4,5,6,7,8,9,10,11,12,13,14],
        loading:false,
      }
    },
    mounted(){
      // document.querySelector('body').setAttribute('style', 'overflow:hidden')
    },
    methods: {
      // 下拉刷新
      loadTop() {
        this.$refs.loadmore.onTopLoaded();
        console.log(22222222)
      },
      loadMore() {
        let that=this;
        that.loading = true;
        setTimeout(() => {
          that.loading = false;
        }, 1000);
      },
      // 加载更多数据
      loadBottom() {
        this.allLoaded = true;
        console.log(11111111111)
        this.$refs.loadmore.onBottomLoaded();
        console.log(11111111111)
      },
      getloadBottomList(){
        let that=this;
        // that.allLoaded = false;
        this.$get(this.$stors.state.ip+'/snatchtreasure/newdrawlottery/?last_pk=9999').then(function (res) {
          // that.list=res.data;
          that.loading = true;
          setTimeout(() => {
            let last = that.list[that.list.length - 1];
            for (let i = 1; i <= 10; i++) {
              that.list.push(last + i);
            }
            that.loading = false;
          }, 2500);
        });
      },
      getloadTopList(){
        let that=this;
        this.allLoaded = false;
        this.$get(this.$stors.state.ip+'/snatchtreasure/newdrawlottery/?last_pk=9999').then(function (res) {
          that.list=res.data;
          // 下拉刷新 加载更多
          setTimeout(() => {
            that.$refs.loadmore.onTopLoaded();
            console.log(222)
            that.allLoaded = true;
            // that.$refs.loadmore.onBottomLoaded();
          }, 2000);
        });

        // let dateCreated = this.dateCreated
        // this.$api.childLocationList({
        //   params:{
        //     pageNum:this.curPage,//第几页
        //     pageSize:this.pageSize//每页显示数据条数
        //   }
        // }).then(res=>{
        //   if(res.code==2000){
        //     if(res.row){
        //       let _list = res.row.list
        //       this.curPage = res.row.pageNum
        //       this.pageSize = res.row.pageSize
        //       let totalPages = res.row.pages//总页数
        //       // 下拉刷新 加载更多
        //       setTimeout(() => {
        //         this.$refs.loadmore.onTopLoaded();
        //         this.$refs.loadmore.onBottomLoaded();
        //       }, 1000);
        //       if(this.curPage==1){
        //         this.list = _list;
        //       }else{
        //         if(this.curPage==totalPages){
        //           this.allLoaded = true;// 若数据已全部获取完毕
        //         }
        //         this.list = this.list.concat(_list);//数组追加
        //       }
        //     }else{
        //       this.$refs.loadmore.onTopLoaded();
        //       this.allLoaded = true;// 若数据已全部获取完毕
        //       this.list = []
        //     }
        //   }else{
        //     this.$refs.loadmore.onTopLoaded();
        //   }
        // })
      },
    },
    beforeRouteLeave(to,from,next){
      to.meta.keepAlive=true;
      next()
    },
  }
</script>
<style>
  .yo-scroll {
    position: absolute;
    top: 2.5rem;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #ddd
  }
  .yo-scroll .inner {
    position: absolute;
    top: -2rem;
    width: 100%;
    transition-duration: 300ms;
  }
  .yo-scroll .pull-refresh {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .yo-scroll.touch .inner {
    transition-duration: 0ms;
  }
  .yo-scroll.down .down-tip {
    display: block;
  }
  .yo-scroll.up .up-tip {
    display: block;
  }
  .yo-scroll.refresh .refresh-tip {
    display: block;
  }
  .yo-scroll .down-tip,
  .yo-scroll .refresh-tip,
  .yo-scroll .up-tip {
    display: none;
  }
  .yo-scroll .load-more {
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
