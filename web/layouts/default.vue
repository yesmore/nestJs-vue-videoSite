<template>
  <v-app id="default">
    <v-app-bar app flat color='#f44873' hide-on-scroll horizontal>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>白云轻舍 & SuperSet Blog</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-responsive class="float-right d-none d-sm-block d-md-block" max-width="200">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
          placeholder="搜索..."
        ></v-text-field>
      </v-responsive>
      <v-menu rounded="0" offset-y>
        <template #activator="{ attrs, on }">
          <i style="font-size:22px;"
             class="white--text mx-3 iconfont icon-Profile"
             v-bind="attrs"
             v-on="on">
          </i>
        </template>

        <v-list>
          <v-list-item link to="/">
            <v-list-item-title>我的收藏</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet dark color="cyan " class="pa-4">
        <v-menu
          v-model="menu"
          bottom
          right
          transition="scale-transition"
          origin="top left">
          <template #activator="{ on }">
            <v-chip
              color="cyan lighten-2"
              pill
              v-on="on">
              <v-avatar left>
                <v-img :src="userAvatar"></v-img>
              </v-avatar>
              <span v-if="$store.state.auth.user">
                {{ $store.state.auth.user.username }}
              </span>
              <span v-else> 请登录 </span>
            </v-chip>
          </template>

          <v-card width="260">
            <v-list dark>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="userAvatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content v-if="$store.state.auth.user">
                  <v-list-item-title>{{$store.state.auth.user.username}}</v-list-item-title>
                  <v-list-item-subtitle>上次登陆：{{$store.state.auth.user.updatedAt.slice(0, 10)}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-list>
              <v-list-item v-if="!$store.state.auth.user" @click="isShowLoginForm = true">
                登陆
              </v-list-item>
              <v-list-item v-if="!$store.state.auth.user" @click="() => {}">
                注册
              </v-list-item>
              <v-list-item v-if="$store.state.auth.user" @click="logout">
                退出
              </v-list-item>
            </v-list>
          </v-card>

        </v-menu>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <span style="font-size: 12px" v-bind="attrs" v-on="on" >
              d——(￣▽￣*)b
            </span>
          </template>
          <span>{{tip}}</span>
        </v-tooltip>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item class="d-block d-sm-none d-md-none">
          <v-responsive max-width="250">
            <v-text-field
              dense
              flat
              hide-details
              rounded
              solo-inverted
              placeholder="搜索..."
            ></v-text-field>
          </v-responsive>
        </v-list-item>

        <v-list-item
          v-for="[icon, text, link] in links"
          :key="icon"
          :to='link' link >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-switch
            v-model="$vuetify.theme.dark"
            inset
            color="cyan"
            label="夜间模式"
            persistent-hint
          ></v-switch>
        </v-list-item>
        <v-divider></v-divider>


      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="py-4 px-4"  fluid >
        <nuxt-child  v-scroll.self="onScroll"/>
      </v-container>
    </v-main>
    <v-footer padless>
      <v-col
        class="text-center"
        style="position: relative"
        cols="12">
        {{ new Date().getFullYear() }} — <strong>By XXG0</strong>
        <a href="https://github.com/bai-23" target="_blank" class="text-decoration-none">
          <i class="ml-2 iconfont icon-github1" style="font-size:18px;color:whitesmoke"></i>
        </a>
        <span class=""
              style="font-size: 12px;position: absolute;right:20px;bottom:15px">
          网站已运行：{{day}}天
        </span>
      </v-col>
    </v-footer>
    <v-alert
      v-if="showTip"
      style="margin:0 auto"
      icon="mdi-shield-lock-outline"
      prominent
      text
      z-index="10001"
      type="info"
      width="200">
      {{authMsg}}
    </v-alert>
    <v-bottom-sheet v-model="isShowLoginForm" max-width="800" overlay-color="black" overlay-opacity="0.8" inset >
      <v-form class="pa-8 mb-4" @submit.prevent="login">
        <v-text-field v-model="loginModel.username" label="用户名"></v-text-field>
        <v-text-field v-model="loginModel.password" type="password" label="密码" autocomplete="new-password"></v-text-field>
        <v-btn color="cyan" type="submit">登陆</v-btn>
        <v-btn @click="isShowLoginForm=false">注册</v-btn>

      </v-form>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
  export default {
    name: '',
    data: () => ({
      day: 0,
      cards: ['Today', 'Yesterday'],
      drawer: null,
      white: 'white',
      tip: 'Tips：白云轻舍是集博客、资源工具、技术导航于一体的超集博客网站，无论是开发者或是普通浏览者，\n' +
        '      在这里你都可以发现一些有趣的内容或工具，祝你浏览愉快~',
      links: [
        ['mdi-home', '首页', '/'],
        ['mdi-console-line', '小舍博客', '/make'],
        ['mdi-dice-6', '小舍资源', '/courses'],
        ['mdi-alien', '小舍工具', '/box'],
        // ['mdi-beach', '热们评论', '/comments'],
        ['mdi-book', '开发文档', '/book'],
        // ['desktop-mac', '科学上网', '/science'],
        ['mdi-account-group', '合作接单', '/cooperate'],
      ],
      offsetTop: 0,
      menu: false,
      isShowLoginForm: false, // 显示登陆表单
      loginModel:{},
      authMsg: '登陆成功',
      showTip: false,
      userAvatar: 'https://www.dmoe.cc/random.php',
      user: {},

    }),
    created () {
      this.countDay()
    },
    methods: {
      onScroll (e) {
        this.offsetTop = e.target.scrollTop
      },
      async login(){
        if (this.loginModel) {
          await this.$auth.loginWith('local', {
            data: this.loginModel
          })
          // const res = await this.$axios.post('http://aoau.top:3006/auth/login', this.loginModel)
          if (this.$store.state.auth.user) {
            this.isShowLoginForm = false
            this.showTip = true
            this.authMsg = '登陆成功'
            setTimeout(() => {
              this.showTip = false
            }, 1500)
          }
        }
      },
      logout() {
        if( this.$store.state.auth.user) {
          this.$store.dispatch('logout')
        }
      },
      countDay(){
        const urodz = new Date("7/1/2021");
        const now = new Date();
        const ile = now.getTime() - urodz.getTime();
        this.day = Math.floor(ile / (1000 * 60 * 60 * 24));
      }
    },
  }
</script>

<style>
  #top-bar {
    background: linear-gradient(225deg, #dd5c7b, #ff6d93);
    box-shadow:  -5px 5px 0px #8c3a4e,
    5px -5px 0px #ff92c4;
  }
</style>
