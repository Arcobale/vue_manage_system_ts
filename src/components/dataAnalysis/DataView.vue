<template>
  <div class="data-view">
    <el-card>
      <div id="main1"></div>
    </el-card>
    <el-card>
      <div id="main2"></div>
    </el-card>
  </div>
</template>

<script>
import { getDataView } from '@/api/api';
export default {
  data() {
    return {

    }
  },
  mounted() {
    let myChart = this.$echarts.init(document.getElementById('main1'));
    myChart.setOption({
      title: {
        text: '初一',
      },
      xAxis: {
        data: ['一班', '二班', '三班', '四班', '五班', '六班'],
      },
      yAxis: {},
      series: [{
        type: 'bar',
        data: [45, 42, 46, 48, 52, 47],
      }]
    });

    //初始化Echarts实例
    getDataView()
    .then(res => {
      if (res.data.status == 200) {
        let { legend, xAxis, series } = res.data.data;
        this.draw(legend, xAxis, series);
      }
    })
    .catch(error => {
      throw error;
    });
  },
  methods: {
    draw(legend, xAxis, series) {
      let myChart2 = this.$echarts.init(document.getElementById('main2'));
      let option2 = {
        title: {
          text: '会话量',
        },
        toolkip: {
          trigger: 'axis',
        },
        legend: {
          data: legend,
        },
        xAxis: {
          type: 'category',
          data: xAxis,
        },
        yAxis: {
          type: 'value',
        },
        series,
      }
      myChart2.setOption(option2);
    }
  }
}
</script>

<style lang="scss">
.data-view {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 50%;

    #main1,
    #main2 {
      height: 500px;
    }
  }
}
</style>