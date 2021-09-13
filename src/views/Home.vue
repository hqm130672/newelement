<template>
  <el-container class="home">
    <el-header class="home-head">
      <div class="home-img">
        <img src="../assets/home.png" alt="" />
        <span>后台管理系统</span>
      </div>

      <div class="home-back">
        <el-button type="info" @click="homeBack">后退</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左边部分 -->
      <el-aside>
        <el-row>
          <el-col>
            <el-menu
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>

                <el-menu-item-group>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>

                <el-menu-item-group>
                  <el-menu-item index="1-2">选项1</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>

                <el-menu-item-group>
                  <el-menu-item index="1-3">选项1</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>

                <el-menu-item-group>
                  <el-menu-item index="1-4">选项1</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>

      <!-- 中间区域 -->
      <el-main></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    homeBack() {
      // 清空token
      window.sessionStorage.clear("token");
      this.$router.go(-1);
    },
  },
};
</script>

<style  scoped>
.home-head {
  display: flex;
  justify-content: space-between;

  height: 85px !important;

  background-color: pink;
}
.el-aside {
  margin: 0;
  padding: 0;
  width: 200px;
  height: 100vh;
  background-color: plum;
}
.el-main {
  background-color: rgba(0, 0, 0, 0.3);
}
.home-img {
  display: flex;
  margin-top: 10px;
  line-height: 60px;
  height: 60px;
  font-size: 21px;
}
.home-img img {
  width: 60px;
  vertical-align: middle;
  margin-right: 10px;
}
.home-back {
  margin: 10px 10px 0 0;
}
</style>
