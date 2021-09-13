<template>
  <div class="login">
    <div class="login-contain">
      <div class="login-img">
        <img src="../assets/logo.png" alt="" />
      </div>

      <!-- 表单区域 -->
      <el-form
        :model="loginform"
        :rules="loginRules"
        ref="ruleForm"
        label-width="100px"
      >
        <!-- 账号 -->
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginform.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginform.password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button
            type="primary"
            @click="loginPass"
            v-loading="loading"
            element-loading-spinner="el-icon-loading"
            >登录</el-button
          >
          <el-button type="info" @click="btnsRest">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      loginform: {
        username: "admin",
        password: "123456",
      },
      // 验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在6到12位字符", trigger: "blur" },
        ],
      },

      loading: false,
    };
  },
  computed: {},
  created() {},
  methods: {
    // 点击之后会对表单进行验证
    loginPass() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("/login", this.loginform);
        if (res.meta.status !== 200) {
          this.loading = false;
          return this.$message.error("登录失败");
        }
        this.$message.success("登录成功");
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      });
      this.loading = true;
    },

    // 关闭之后重置表单
    btnsRest() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style  scoped>
.login {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100%;
  background-color: orange;
}
.login-contain {
  width: 500px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}
.login-img {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: aliceblue;
}
.login-img img {
  width: 100%;
  overflow: hidden;
  border-radius: 50%;
  background-color: rgb(237, 239, 241);
}
.el-form {
  position: absolute;
  width: 450px;
  top: 50%;
  transform: translate(0, -50%);
}
.btns {
  position: absolute;
  right: 0;
}
</style>