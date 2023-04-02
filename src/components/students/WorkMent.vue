<template>
  <div class="workList">
    <!-- 内容展示区域 -->
    <el-table :data="workList" v-loading="loading" border style="width: 100%">
      <el-table-column prop="id" label="用户ID">
      </el-table-column>
      <el-table-column prop="userId" label="所属班级">
      </el-table-column>
      <el-table-column prop="title" label="作业名称">
      </el-table-column>
      <el-table-column prop="completed_text" label="完成情况">
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <Pagination :total="total" :url="url"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/common/Pagination.vue';
export default {
  data() {
    return {
      workList: [],
      total: 0,
      loading: true, //加载效果
      url: '/works',
    }
  },
  components: {
    Pagination,
  }
}
</script>

<style lang="scss">

</style>