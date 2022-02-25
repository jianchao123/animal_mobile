<template>
    <div>
      <div class="header_div"></div>
      <div class="trendchart">
        <div class="header_img">
          <div style="width: 20%"><img class="run_span" :src="commodity_images"></div>
          <div style="width: 78%;margin-left: 2%;text-align: left;font-weight: 600">
            {{commodity_name}}
          </div>
        </div>

        <div style="width: 100%;text-align: left;display: flex;justify-content: space-between;margin-top: 20px;">
          <div style="width: 22%;line-height: 40px;font-weight: 600">
            <span>剩余人次</span>
            <span>|</span>
          </div>
          <div style="width: 76%;margin-left: 1%">
            <div style="font-size: 13px;color: #aeaeae;float: left;line-height: 20px;height: 20px">
              <span style="width: 18px;height: 5px;display: inline-block;background: #22ff74;margin-bottom: 2px;"></span>
              <span>头部:</span>
              <span>2期</span>
            </div>
            <div style="font-size: 13px;color: #aeaeae;float: left;line-height: 20px;height: 20px;margin-left: 2px">
              <span style="width: 18px;height: 5px;display: inline-block;background: #a299ff;margin-bottom: 2px;"></span>
              <span>前腰:</span>
              <span>{{each_part_data[0]}}期</span>
            </div>
            <div style="font-size: 13px;color: #aeaeae;float: left;line-height: 20px;height: 20px;margin-left: 2px">
              <span style="width: 18px;height: 5px;display: inline-block;background: #ff8532;margin-bottom: 2px;"></span>
              <span>中部:</span>
              <span>{{each_part_data[1]}}期</span>
            </div>
            <div style="font-size: 13px;color: #aeaeae;float: left;line-height: 20px;height: 20px;">
              <span style="width: 18px;height: 5px;display: inline-block;background: #ff4ce9;margin-bottom: 2px;"></span>
              <span>后腰:</span>
              <span>{{each_part_data[2]}}期</span>
            </div>
            <div style="font-size: 13px;color: #aeaeae;float: left;line-height: 20px;height: 20px;margin-left: 2px">
              <span style="width: 18px;height: 5px;display: inline-block;background: #ffd44d;margin-bottom: 2px;"></span>
              <span>尾部:</span>
              <span>{{each_part_data[3]}}期</span>
            </div>
          </div>
        </div>

          <div class="echart" id="trendChart"></div>

        <div>
          <div style="width: 100%;display: flex;justify-content: flex-end;font-weight: 600"><span>商品期数</span></div>
          <table class="number_table">
            <tr>
              <td style="width: 25%;text-align: right">商品期数：</td>
              <td style="width: 75%">指该商品的期数。 </td>
            </tr>
            <tr>
              <td style="width: 25%;text-align: right">剩余人次：</td>
              <td style="width: 75%">指剩余多少人次时买入，比如商品总需100人次，已参与80人次，剩余20人次，那么剩余人次买入就是20。 </td>
            </tr>
            <tr >
              <td style="width: 25%;text-align: right">注：</td>
              <td style="width: 75%">走势图是在开奖之后产生的，不会对开奖结果产生任何影响，仅供参考。 </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
  import echarts from 'echarts'
    export default {
        name: "TrendChart",
      data() {
        return {
          commodity_images:'',
          commodity_name:'',
          each_part_data:[],
        }
      },
      methods:{
        trendchart:function (data_x,data_y,pieces,maxdata,color_this) {
          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById('trendChart'));
          myChart.setOption({
            tooltip: {
              trigger: 'axis',
              show : true
            },
            // legend: {
            //   data:['购入人次']
            // },
            toolbox: {
              show: false,
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
              }
            },
            xAxis:{
              splitLine:{
                show:false
              },
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                interval:1,
                rotate:40
              },
              data: data_x
            },
            yAxis: {
              type: 'value',
              show:true,
              splitLine:{
                // show:false
              },
              min:0,
              max:maxdata,
              interval:maxdata/5,
              splitNumber:5,
              axisLine:{
                lineStyle:{
                  color:'rgb(150,150,150)',
                  width:3
                },  //y轴坐标轴颜色

              },
              axisTick:{
                lineStyle:{color:'rgb(150,150,150)' }//y轴坐标刻度颜色
              },
            },
            visualMap: [
              { // 第二个 visualMap 组件
                show: false,
                type: 'piecewise', // 定义为分段型 visualMap
                pieces: pieces,//分段颜色div_scroll_y
              }
            ],
            grid:{
              left:"11%",
              backgroundColor: '#fff',
              right:'7%',
              width:"87%", //图例宽度
            },
            dataZoom: [
              { //Y轴固定,让内容滚动
                type: 'slider',
                show: false,
                xAxisIndex: 0,
                start: 0,
                end: 40,//设置X轴刻度之间的间隔(根据数据量来调整)
                zoomLock: true, //锁定区域禁止缩放(鼠标滚动会缩放,所以禁止)
              },
              {
                type: 'inside',
                xAxisIndex: 0,
                start: 0,
                end: 40,
                zoomLock: true, //锁定区域禁止缩放
              }
              ],
            series: [
              {
                name:'中奖人次',
                type: 'line',
                symbol:'circle', //设定为实心点
                symbolSize: 10,   //设定实心点的大小
                data:data_y,
                lineStyle:{
                  normal:{
                    color:'#d6d6d6',
                    width:2
                  }
                },
                markArea: { //标记区域
                  itemStyle: { //全局的
                    normal: {color:'#eeeeee'},
                  },
                  data: [
                    [{
                      yAxis:color_this[0],//y轴坐标控制
                    },{
                      yAxis:color_this[1],
                    }],[{
                      yAxis:color_this[1],//y轴坐标控制
                      itemStyle: {
                        normal: {color:'white'},
                      },
                    },{
                      yAxis:color_this[2],
                    }],
                    [{
                      yAxis:color_this[2],//y轴坐标控制
                    },{
                      yAxis:color_this[3],
                    }],
                    [{
                      yAxis:color_this[3],//y轴坐标控制
                      itemStyle: {
                        normal: {color:'white'},
                      },
                    },{
                      yAxis:color_this[4],
                    }],
                    [{
                      yAxis:color_this[4],//y轴坐标控制
                    },{
                      yAxis:color_this[5],
                    }],
                  ]
                },
                markPoint: {
                  symbol: 'pin', //标记(气泡)的图形
                  symbolSize: 50, //标记(气泡)的大小
                  itemStyle : {
                    normal : {
                      color:'#8cd5c2', //改变折线点的颜色
                      // lineStyle:{
                      //   color:'#8cd5c2' //改变折线颜色
                      // }
                    }
                  }, //标注(气泡)的样式
                },

              },
            ]
          });

        },
        getList:function (pk) {
          let that=this;
          this.$get(this.$stors.state.ip+'/snatchtreasure/commoditydetailpage/?period_pk='+pk).then(function (res) {
            let commodity_images=res.data.commodity_detail_data.commodity_images.split(',');
            that.commodity_images=commodity_images[0];
            that.commodity_name=res.data.commodity_detail_data.commodity_name;
            that.each_part_data=res.data.trend_map_data.each_part_data;
            let list_x=[];
            let list_y=[];
            let pieces=[];
            for (let i=0;i<res.data.trend_map_data.trend_map_data.length;i++){
              list_x[i]=res.data.trend_map_data.trend_map_data[i].period_no+'期';
              list_y.push(res.data.trend_map_data.trend_map_data[i].residue_ren_ci);
              // list_y[i]=res.data.trend_map_data.trend_map_data[i].residue_ren_ci;
            }
            pieces.push(
              {min: res.data.trend_map_data.y_axis_data[0], max: res.data.trend_map_data.y_axis_data[1],color: '#22ff74'},
              {min: res.data.trend_map_data.y_axis_data[1], max: res.data.trend_map_data.y_axis_data[2],color: '#a299ff'},
              {min: res.data.trend_map_data.y_axis_data[2], max: res.data.trend_map_data.y_axis_data[3],color: '#ff8532'},
              {min: res.data.trend_map_data.y_axis_data[3], max: res.data.trend_map_data.y_axis_data[4],color: '#ff4ce9'},
              {min: res.data.trend_map_data.y_axis_data[4], max: res.data.trend_map_data.y_axis_data[5],color: '#ffd44d'},
              );
            let maxPersonal=5-(res.data.trend_map_data.y_axis_data[5]%5)+res.data.trend_map_data.y_axis_data[5];
            that.trendchart(list_x,list_y,pieces,maxPersonal,res.data.trend_map_data.y_axis_data);
          })
        }
      },
      mounted() {
          // this.trendchart();
        this.getList(this.$route.query.period_pk);
      },
      activated() {
        if(!this.$route.meta.isBack || this.isFirstEnter){
          // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
          // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
          // this.allTaskList= [];// 把数据清空，可以稍微避免让用户看到之前缓存的数据
          let that=this;
          that.getList(this.$route.query.period_pk);
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
  .header_div{
    width: 100%;
    height: 120px;
    background: #e6514e;
  }
  .trendchart{
    width: 90%;
    position: absolute;
    background: white;
    left: 5%;
    top: 50px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .header_img{
    width: 90%;
    margin-left: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 105px;
  }
  .div_scroll_y{
    width: 100%;
    /*overflow-x: scroll;*/
    /*overflow-y: hidden;*/
    /*white-space: nowrap;*/
  }
  .run_span{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .echart{
    width: 100%;
    /*margin-top: 20px;*/
    height: 400px;
  }
  .number_table{
    width: 90%;
    font-size: 13px;
    margin-left: 5%;
    margin-bottom: 40px;
  }
  .number_table td{
    text-align: left;
    margin-top: 10px;
    font-weight: 600;
    height: 50px;
  }
</style>
