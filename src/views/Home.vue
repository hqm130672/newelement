<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/home.png" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="homeBack">后退</el-button>
    </el-header>

    <!-- 页面主体 -->
    <el-container>
      <!-- 左边部分 -->
      <el-aside :width="toggerChanger ? '65px' : '200px'">
        <!-- 折叠栏 -->
        <div class="toggle_button" @click="toggleChange">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="toggerChanger"
          :collapse-transition="false"
          :default-active="isdefaultactive"
          router
        >
          <!-- 一级菜单 -->
          <el-submenu
            v-for="(item, index) in menulist"
            :key="item.id"
            :index="'/' + item.path"
          >
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <i :class="iconObj[index]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              v-for="items in item.children"
              :key="items.id"
              :index="'/' + items.path"
              @click="selectDefault('/' + items.path)"
            >
              <!-- 二级菜单模板区 -->
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ items.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 中间区域 -->
      <el-main>
        <!-- welcome占位符 -->

        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      // 左侧菜单列表
      menulist: [],
      homeData: {
        pagenum: 1,
        pagesize: 10,
        total: "",
      },

      iconObj: [
        "el-icon-user-solid",
        "el-icon-s-tools",
        "el-icon-s-goods",
        "el-icon-mobile",
        "el-icon-data-line",
      ],

      // 折叠动画
      toggerChanger: false,

      //默认高亮
      isdefaultactive: "",
    };
  },
  created() {
    this.getMenusList();
    this.isdefaultactive = window.sessionStorage.getItem("active");
    console.log(this.isdefaultactive);
  },

  methods: {
    homeBack() {
      // 清空token
      window.sessionStorage.clear("token");
      this.$router.go(-1);
    },
    // 获取菜单数据
    async getMenusList() {
      const { data: res } = await this.$http.get("/menus");
      if (res.meta.status !== 200) return this.$message.error("获取菜单失败");
      this.menulist = res.data;
      console.log(this.menulist);
    },
    // 折叠功能实现
    toggleChange() {
      this.toggerChanger = !this.toggerChanger;
    },
    // 默认高亮
    selectDefault(active) {
      window.sessionStorage.setItem("active", active);
      this.isdefaultactive = active;
    },
  },
};
</script>

<style lang="scss"  scoped>
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  color: aliceblue;
  height: 85px !important;
  align-items: center;
  background-color: #373d41;
  font-size: 20px;
  & > div {
    display: flex;
    align-items: center;

    img {
      width: 60px;
      margin-right: 10px;
    }
    span {
      margin-left: 15px;
    }
  }
}

.el-menu {
  border: none;
}
.el-aside {
  background-color: #333744;
  & .toggle_button {
    height: 30px;
    width: 100%;
    background-color: rgb(102, 101, 101);
    color: #fff;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
}

.el-main {
  background-color: rgba(0, 0, 0, 0.01);
}
</style>
