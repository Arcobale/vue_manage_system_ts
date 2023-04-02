<template>
  <div class="infoList">
    <!-- 添加 -->
    <el-form :inline="true" class="demo-form-inline" size="small">
      <el-form-item>
        <el-button type="primary" @click="addStudent">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 内容展示区域 -->
    <el-table :data="infoList" border style="width: 100%">
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
      <el-table-column prop="sex_text" label="性别">
      </el-table-column>
      <el-table-column prop="father" label="父亲姓名">
      </el-table-column>
      <el-table-column prop="mather" label="母亲姓名">
      </el-table-column>
      <el-table-column prop="time" label="入校时间">
      </el-table-column>
      <el-table-column prop="address" label="家庭住址">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出对话框 -->
    <el-dialog :title="state ? '添加学生信息' : '修改学生信息'" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父亲姓名" :label-width="formLabelWidth" prop="father">
          <el-input v-model="form.father" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="母亲姓名" :label-width="formLabelWidth" prop="mather">
          <el-input v-model="form.mather" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入校时间" :label-width="formLabelWidth" prop="time">
          <el-date-picker v-model="form.time" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getInfoList, deleteInfo, addInfo, updateInfo } from '@/api/api';
export default {
  data() {
    return {
      infoList: [],
      total: 0,
      dialogFormVisible: false,
      form: {
        name: '',
        sex: '1',
        age: '',
        father: '',
        mather: '',
        time: '',
        address: '',
        phone: '',
      },
      formLabelWidth: '80px',
      //表单校验
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        sex: [{ required: true }],
        age: [{ required: true, message: "请输入年龄" }],
        time: [{ required: true, message: "请输入入学时间" }],
        address: [{ required: true, message: "请输入家庭住址" }],
        phone: [{ required: true, message: "请输入联系方式" }],
      },
      //控制对话框标题
      state: true,
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getInfoList().then(res => {
        if (res.data.status == 200) {
          this.infoList = res.data.data;
          this.infoList.forEach(item => {
            item.sex_text = item.sex == 1 ? "男" : "女";
          })
          this.total = res.data.total;
        }
      })
    },
    del(row) {
      this.$alert('你确定要删除吗', '提示', {
        confirmButtonClass: '确定',
        callback: () => {
          deleteInfo(row.id).then(res => {
            if (res.data.status == 200) {
              this.$message({ message: res.data.message, type: 'success' });
              this.getData();
            }
          });
        }
      })
    },
    edit(row) {
      this.state = false;
      this.form = { ...row }; // 不要直接赋值
      this.dialogFormVisible = true;
    },
    addStudent() {
      this.$nextTick(() => {
        this.$refs['form'].resetFields();
      });// 清除校验规则
      this.state = true;
      //重置为默认值
      this.form = {
        name: '',
        sex: '1',
        age: '',
        father: '',
        mather: '',
        time: '',
        address: '',
        phone: '',
      };
      //显示对话框
      this.dialogFormVisible = true;
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    sure() {
      //取到表单元素，校验
      this.$refs['form'].validate(valid => {
        //添加
        if (valid) {
          if (this.state) {
            addInfo(this.form).then(res => {
              if (res.data.status == 200) {
                this.getData();
                this.$message({ message: res.data.message, type: 'success' });
                this.dialogFormVisible = false;
              }
            });
          } else {
            //编辑
            updateInfo(this.form).then(res => {
              if (res.data.status == 200) {
                this.getData();
                this.$message({ message: res.data.message, type: 'success' });
                this.dialogFormVisible = false;
              }
            });
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">
.infoList {
  .demo-form-inline, .el-dialog {
    text-align: left;
  }
}
</style>