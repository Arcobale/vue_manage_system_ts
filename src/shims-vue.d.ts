declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
//用来做一些第三方库没有支持ts的，让代码中可以将其import进来
declare module 'echarts'
declare module '*.js'