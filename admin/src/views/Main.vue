<template>
  <el-container >

    <el-header class="header-bar">
      <!-- Header content -->
      <h3>视频资源管理界面 <el-tag type="info" plain> By XXG0</el-tag></h3>
      <el-dropdown style="float: right;marginTop: -45px; marginRight:50px">
        <span class="el-dropdown-link">
          <i class="iconfont icon-apertureguangquan"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown style="float: right;marginTop: -45px; marginRight:10px">
        <span class="el-dropdown-link">
          <i class="iconfont icon-jia"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">新建系列</el-dropdown-item>
          <el-dropdown-item icon="el-icon-plus">上传资源</el-dropdown-item>
          <el-dropdown-item icon="el-icon-plus">新建用户</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>


    </el-header>

    <el-container >
      <el-aside width="200px">
        <!-- Aside content -->
        <el-menu mode="vertical" style="height:100vh" :default-active="$route.path" router>
          <el-submenu v-for="(item, index) in menu.items"
            :index="String(index) + 1"
            :key="`menu-item-${index}`">

            <template slot="title">{{item.title}}</template>

            <el-menu-item v-for="(subItem, subIndex) in item.items"
              :index="subItem.path"
              :key="`menu-item-${index}-${subIndex}`">
                {{subItem.title}}
            </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
      <el-container >
        <el-main height="">
          <!-- Main content -->
          <!-- 设置routerView基于路径更新 -->
          <router-view :key="$route.path"></router-view>
        </el-main>
        <el-footer height="">
          <!-- Footer content -->

        </el-footer>
      </el-container>
    </el-container>

  </el-container>

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default  class Main extends Vue{
  menu = {
    items: [
      {
        title: '内容管理',
        items: [
          { title: '首页', path: '/' },
          { title: '系列管理', path: '/courses/list' },
          { title: '资源管理', path: '/episodes/list' },
        ]
      },
      {
        title: '文档管理',
        items: [
          { title: '文档编辑', path: '/docs/list' },
        ]
      },
      {
        title: '运营管理',
        items: [
          { title: '用户管理', path: '/users/list' },
        ]
      },
    ]
  }

}
</script>

<style>
  body {
    margin: 0
  }
  .header-bar {
    background: linear-gradient(145deg, #b6c7d1, #d8ecf8);
  }
</style>
