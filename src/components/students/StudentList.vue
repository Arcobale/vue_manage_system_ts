<template>
  <div class="studentList">
    <!-- 查询、重置 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
      <el-form-item label="学生">
        <el-input v-model="formInline.name" placeholder="请输入姓名查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 内容展示区域 -->
    <el-table :data="currentData" border style="width: 100%">
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
      <el-table-column prop="sex_text" label="性别">
      </el-table-column>
      <el-table-column prop="number" label="学号">
      </el-table-column>
      <el-table-column prop="class" label="班级">
      </el-table-column>
      <el-table-column prop="state_text" label="状态">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getStudentList, deleteStudent, findStudent } from '@/api/api';
export default {
  data() {
    return {
      studentList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      formInline: {
        name: '',
      }
    }
  },
  computed: {
    currentData() {
      return this.studentList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(params) {
      getStudentList(params).then((res) => {
        if (res.data.status == 200) {
          this.studentList = res.data.data;
          this.studentList.forEach(item => {
            // 尽量不要修改原数据，添加新字段
            item.sex_text = item.sex == 1 ? "男" : "女";
            item.state_text = item.state == 1 ? "已入学" : item.state == 2 ? "未入学" : "休学中";
          });
          this.total = res.data.total;
        };
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    del(id) {
      deleteStudent(id).then(res => {
        if (res.data.status == 200) {
          this.$message({ message: res.data.message, type: 'success' });
          this.getData();
        }
      })
    },
    find() {
      this.getData(this.formInline);
    },
    reset() {
      this.formInline = {},
      this.getData(this.formInline);
    }
  }
}
</script>

<style lang="scss">
.studentList {
  .demo-form-inline {
    text-align: left;
  }
  .el-pagination {
    text-align: left;
    margin-top: 20px;
  }
}
</style>