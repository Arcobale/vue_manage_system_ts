<template>
  <div class="travel-map">
    <div id="main"></div>
  </div>
</template>

<script>
import geoJson from '@/assets/data.json';
import { getTravelMap } from '@/api/api';
export default {
  data() {
    return {
      data: [],
    }
  },
  created() {
    getTravelMap().then(res => {
      if (res.data.status == 200) {
        let { points, linesData } = res.data.data;
        this.draw(points, linesData);
      }
    }).catch(error => {
      throw error;
    });
  },
  methods: {
    draw(points, linesData) {
      let myChart = this.$echarts.init(document.getElementById('main'));
      this.$echarts.registerMap('china', geoJson); //注册可用的地图
      let option = {
        backgroundColor: 'rgb(121, 145, 209)',
        //地理坐标系组件
        geo: {
          map: 'china',
          aspectScale: 0.75, // 地图长宽比
          zoom: 1.1,
          itemStyle: {
            normal: {
              areaColor: {
                type: 'radial', //径向渐变
                x: 0.5,
                y: 0.5,
                r: 0.8, //半径
                colorStops: [
                  {
                    //0%处的颜色
                    offset: 0,
                    color: '#09132c',
                  },
                  {
                    offset: 1,
                    color: '#274d68',
                  }
                ],
                globalCoord: true,
              },
              shadowColor: 'rgb(58, 115, 192)',
              shadowOffsetX: 10,
              shadowOffsetY: 10,
            }
          },
          regions: [{
            name: '南海诸岛',
          }]
        },
        //配置地图相关参数，绘制地图，关于地图图表的相关设置
        series: [
          {
            type: 'map',
            label: {
              normal: {
                show: true, //label默认展示
                textStyle: {
                  color: '#1DE9B6',
                }
              },
              emphasis: {
                textStyle: {
                  color: 'rgb(183, 185, 14)',
                }
              }
            },
            zoom: 1.1,
            map: 'china',
            itemStyle: {
              backgroundColor: 'rgb(147, 235, 248)',
              borderWidth: 1,
              normal: {
                areaColor: {
                  type: 'radial', //径向渐变
                  x: 0.5,
                  y: 0.5,
                  r: 0.8, //半径
                  colorStops: [
                    {
                      //0%处的颜色
                      offset: 0,
                      color: 'rgb(31, 54, 150)',
                    },
                    {
                      offset: 1,
                      color: 'rgb(89, 128, 142)',
                    }
                  ],
                  globalCoord: true,
                }
              },
              //设置高亮
              emphasis: {
                areaColor: 'rgb(46, 229, 206)',
                borderWidth: 0.1,
              }
            },
          },
          //关于地图中散点图的配置
          {
            type: 'effectScatter', //带有涟漪特效动画的散点（气泡）图
            coordinateSystem: 'geo', //坐标系
            showEffectOn: 'render', //绘制完成显示特效
            zlevel: 1,
            symbolSize: 10, //散点大小
            data: points,
            //涟漪特效相关配置
            rippleEffect: {
              period: 15, //动画周期
              scale: 4, //波纹的最大缩放比例
              brushType: 'fill', //波纹的绘制方式
            }
          },
          //关于地图中线路动画效果设置
          {
            type: 'lines',
            zlevel: 2, //层级
            effect: {
              show: true,
              period: 4,
              symbol: 'arrow',
              symbolSize: 7,
              trailLength: 0.4,
            },
            lineStyle: {
              normal: {
                color: '#1DE9B6',
                width: 1,
                opacity: 0.1,
                curveness: 0.3,
              }
            },
            data: linesData,
          }
        ]
      };
      myChart.setOption(option);
    },
  }
}
</script>

<style lang="scss">
.travel-map {
  width: 100%;

  #main {
    width: 100%;
    height: 600px;
  }
}
</style>