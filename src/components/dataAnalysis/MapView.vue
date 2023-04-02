<template>
  <div class="map-view">
    <div id="main"></div>
  </div>
</template>

<script>
import geoJson from '@/assets/data.json';
export default {
  data() {
    return {

    }
  },
  mounted() {
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
        }
      ]
    };
    myChart.setOption(option);
  }
}
</script>

<style lang="scss">
.map-view {
  width: 100%;

  #main {
    width: 100%;
    height: 600px;
  }
}
</style>