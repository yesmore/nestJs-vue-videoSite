<template>
  <div>
    <v-row justify="space-around">
      <v-col class="d-flex" sm="6" md="6" flex="12">
        <v-card width="100%">
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)">
            <v-toolbar-title class="text-h6 white--text pl-0">
              业务范围1
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-app-bar>
          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
              前端架构
            </div>
            <v-timeline align-top dense>
              <v-timeline-item
                v-for="message in messages"
                :key="message.time"
                :color="message.color"
                small>
                <div>
                  <div class="font-weight-normal">
                    <strong>{{ message.from }}</strong> {{ message.time }}
                  </div>
                  <div>
                    技术栈：<v-badge
                      v-for="item in message.message" :key="item"
                      color="black"
                      inline
                      :content="item">
                    </v-badge>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="d-flex" sm="6" md="6" flex="12">
        <v-card width="100%">
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)">
            <v-toolbar-title class="text-h6 white--text pl-0">
              业务范围2
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-app-bar>
          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
              全栈架构
            </div>
            <v-timeline align-top dense>
              <v-timeline-item
                v-for="message in messages1"
                :key="message.time"
                :color="message.color"
                small>
                <div>
                  <div class="font-weight-normal">
                    <strong>{{ message.from }}</strong> {{ message.time }}
                  </div>
                  <div>
                    技术栈：<v-badge
                      v-for="item in message.message" :key="item"
                      color="black"
                      inline
                      :content="item">
                    </v-badge>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col sm="12" md="12" flex="12">
        <v-card
          style="background: #1e1e1e;"
          class="white--text text-center">
          <v-card-text>
            <div>
              <i class="mx-2 white--text iconfont icon-qq"></i>
              <i class="mx-2 white--text iconfont icon-youjian1"></i>
              <i class="mx-2 white--text iconfont icon-vx3"></i>
            </div>
          </v-card-text>

          <v-card-text class="white--text pt-0">
            支持网站设计、网站搭建、后台管理平台搭建以及接口编写业务，
            如果你有意愿与我合作或个人接单，请通过以上联系方式与我(站长)交流沟通具体细节。
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: "",
    data: () => ({
      messages: [
        {
          from: 'Web网站',
          message: ['H5原生', 'H5+Jquery', 'Vue原生', 'Vue+BootStrap', 'Vue+Vuetify','Vue+ElementUi', 'Vue+NuxtJs'],
          time: '(PC端，移动端)',
          color: 'cyan',
        },
        {
          from: '微信小程序',
          message: ['mina(原生)', 'uni-app'],
          time: '(移动端)',
          color: 'cyan',
        },
        {
          from: 'App',
          message: ['Vue+Vuetify'],
          time: '(工具打包)',
          color: 'cyan',
        },
      ],
      messages1: [
        {
          from: '后台管理',
          message: ['Vue+ElementUi+NodeJs+MongoDB'],
          time: '(PC端)',
          color: '#f44873',
        },
        {
          from: '后台接口',
          message: ['NodeJs(Express)+MongoDB', 'NodeJs(Koa2)+MongoDB', 'NodeJs(NestJs)+MongoDB'],
          time: '',
          color: '#f44873',
        },
      ],


    }),

  }
</script>

<style scoped>

</style>
