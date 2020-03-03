<template>
  <el-container class="home-container">
     <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="@/assets/logo.png" width="20px">
        <span>后台管理系统</span>
      </div>
          <el-button type="danger" class="logout" @click="logout">退出</el-button>  
      </el-header>
   
    <el-container>
       <el-aside width="200px">
      <el-menu router   
      :default-active="this.$route.path"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-goods"></i>商品管理
          </template>
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/item/create">新建物品</el-menu-item>
            <el-menu-item index="/item/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>运营管理
          </template>
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-tools"></i>系统设置
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
      <!-- 右侧内容区 -->
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<style lang="scss" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffd04b;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
    }
  }

}
.el-main{
  background-color:white;
}
.home-container{
  width: 100%;
}
.el-menu{
  border: #373d41
}
</style>
<script>
export default {
   data() {
    return {
      auth: {
        username: ""
      }
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/login");
      this.$set(this.auth, "username", res.data.username);
    },
    // 退出账号
    logout() {
      localStorage.token = "";
      this.$router.push("/login");
    }
  }
};
</script>