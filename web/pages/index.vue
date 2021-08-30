<template>
  <div class="animate__animated animate__fadeIn">
    <v-row>
      <!--<v-col v-if="txtInfo===''" cols="12">
        <v-skeleton-loader
          v-bind="attrs"
          type="date-picker-options,actions"
        ></v-skeleton-loader>
      </v-col>-->

      <v-col >
        <v-alert
          v-model="alert"
          class="pa-1 pl-3"
          style="font-size:12px"
          close-text="Close Alert"
          dismissible
          border="left"
          colored-border

          color="cyan accent-4"
          elevation="2">
          <span class="animate__animated animate__fadeIn">{{txtInfo}}</span>
        </v-alert>

        <v-row>
          <v-col sm="6" md="6">
            <v-card  flat  color="basil">
              <v-card-title class="text-center justify-center pa-0">
                <v-carousel
                  cycle
                  height="200"
                  interval="3000"
                  :show-arrows="false"
                  hide-delimiter-background
                  hide-delimiters
                  show-arrows-on-hover>
                  <v-carousel-item
                    v-for="(url, i) in slides"
                    :key="i">
                    <div v-if="url===''" class="text-h3">
                      没了
                    </div>
                    <v-img :src="url"></v-img>
                  </v-carousel-item>
                </v-carousel>
              </v-card-title>

              <v-tabs
                v-model="tab"
                background-color="transparent"
                color="basil"

                grow>
                <v-tab
                  v-for="item in items"
                  :key="item">
                  {{ item }}
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item
                  v-for="item in items"
                  :key="item">
                  <v-card
                    color="basil"
                    flat>
                    <v-card-text>{{ text }}</v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>

          <v-col sm="6" md="6">

          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        alert: true,
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        timer: null,
        slides: [
          'https://api.btstu.cn/sjbz/?lx=dongman',
          'https://api.xiaobaibk.com/api/pic/?pic=girl',
          'https://api.btstu.cn/sjbz/?lx=dongman',
          'https://www.dmoe.cc/random.php',
          'https://api.nmb.show/1985acg.php',
        ],
        tab: null,
        items: [
          '还', '没', '想', '好',
        ],
        text: '做什么',
        txtInfo: '',
        tip: 'Tips：白云轻舍是集博客、资源工具、技术导航于一体的超集博客网站，无论是开发者或是普通浏览者，\n' +
          '      在这里你都可以发现一些有趣的内容或工具，祝你浏览愉快~',
        attrs: {
          class: 'mb-6',
          boilerplate: false,
          elevation: 2,
        },
        CloseLoader: false,
      }
    },
    created() {
      this.fetchTxt()
    },
    mounted() {
      this.timer = setInterval(() =>{
        this.fetchTxt()
      }, 6000)
    },
    destroyed() {
      clearInterval(this.timer)
    },
    methods: {
      async fetchTxt(){
        const res = await this.$axios.get('/findtxt')
        this.txtInfo= '【妙语】'+ res.data
      }
    }
  }
</script>

<style>
  #top-bar {
    background: #f56689;
    box-shadow: inset -5px 5px 0px #622937,
    inset 5px -5px 0px #ffa3db;
  }
</style>
