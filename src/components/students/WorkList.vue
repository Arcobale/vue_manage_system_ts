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
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[5, 10, 20, 30, 50]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getWorkList } from '@/utils/table';
export default {
  data() {
    return {
      workList: [],
      page: 1,
      size: 10,
      total: 0,
      loading: true, //加载效果
    }
  },
  mounted() {
    getWorkList(this, '/works', {page: this.page, size: this.size});
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.page = 1;
      this.loading = true;
      getWorkList(this, '/works', {page: this.page, size: this.size});
    },
    handleCurrentChange(val) {
      this.page = val;
      this.loading = true;
      getWorkList(this, '/works', {page: this.page, size: this.size});
    },
  }
}
</script>

<style lang="scss">
.workList {
  .el-pagination {
    text-align: left;
    margin-top: 20px;
  }
}
</style>