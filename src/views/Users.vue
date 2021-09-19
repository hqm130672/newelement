<template>
  <div class="user">
    <!-- 面包写导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索模块用el-row划分 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUsersList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchName"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUsers">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 表单区域 -->
      <el-table
        :data="userList"
        border
        style="width: 100%"
        stripe
        align="center"
      >
        <!-- 索引区 -->
        <el-table-column type="index" label="#" width="50" align="center">
        </el-table-column>
        <!-- 姓名 -->
        <el-table-column
          prop="username"
          label="姓名"
          width="180"
          align="center"
        >
        </el-table-column>
        <!-- 邮箱 -->
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <!-- 电话 -->
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <!-- 角色 -->
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              @change="valueChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" width="200px">
          <template>
            <!-- 修改按钮 -->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
            ></el-button>
            <!-- 设置按钮 -->
            <el-button
              icon="el-icon-s-tools"
              size="mini"
              type="warning"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户的弹窗 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="35%">
      <el-form ref="form" :model="addFrom" label-width="80px">
        <!-- 账号 -->
        <el-form-item label="账号">
          <el-input v-model="username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码">
          <el-input v-model="password"></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item label="电话">
          <el-input v-model="mobile"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱">
          <el-input v-model="email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      // 请求的全部数据参数
      userList: [],
      // 需要请求所需要的参数
      queryInfo: {
        query: "",
        // 页数
        pagenum: 1,
        // 条数
        pagesize: 5,
      },
      total: 0,
      // 滑动开关状态
      value: false,
      // 添加按钮弹窗显示
      addDialogVisible: false,
      // 添加用户的参数名
      addFrom: {
        username: "",
        password: "",
        mobile: null,
        email: "",
      },
    };
  },
  computed: {},
  created() {
    this.getUsersList();
  },
  methods: {
    async getUsersList() {
      const { data: res } = await this.$http.get("/users", {
        params: this.queryInfo,
      });
      console.log(res);
      if (res.meta.status != 200) return this.$message.error("请求失败");
      this.userList = res.data.users;
      this.total = res.data.total;
    },

    // 滑动状态控制
    async valueChange(value) {
      const { data: res } = await this.$http.put(
        `users/${value.id}/state/${value.mg_state}`
      );
      if (res.meta.status != 200) {
        value.mg_state = !value.mg_state;
        return this.$message.error("更新状态失败");
      }

      console.log(res);
    },
    // 条数
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this.getUsersList();
    },
    // 页数
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage;
      this.getUsersList();
    },

    searchName() {
      this.handleCurrentChange(1);
      // this.getUsersList();
    },

    //添加用户事件
    addUsers() {
      this.addDialogVisible = true;
    },
  },
};
</script>
<style  scoped>
</style>