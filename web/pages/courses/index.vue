<template>
  <div>
    <!--<v-col v-if="gc===''" cols="12">
      <v-skeleton-loader
        v-bind="attrs"
        type="date-picker"
      ></v-skeleton-loader>
    </v-col>-->

    <div >
      <v-banner elevation="2" class="text-sm-h6 text-md-h6 my-2" >
        B站热推
        <span style="font-size:15px; color:gray" class="text--muted float-right">2021-7-01</span>
      </v-banner>
      <v-row>
        <v-col xs='6' sm='4' md='4' cols="6">
          <v-card
            max-width="360"
            @mouseover="reveal=true"
            @mouseleave="reveal=false">
            <v-img
              src="https://api.nmb.show/1985acg.php"
              style="filter: blur(0.2px);"
              gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.5)"
              height="132px">
              <v-card-title class="text-h5" style="color:cyan;">推荐榜</v-card-title>
            </v-img>

            <v-expand-transition>
              <v-card
                v-if="reveal"
                dark
                class="transition-fast-out-fast-in v-card--reveal-top overflow-hidden overflow-y-auto"
                style="height: 100%;">
                <v-card-text class="pb-0">
                <span v-for="(item,index) in Bz" :key="item.aid">
                  <a class="overline text-decoration-none white--text"
                     :href="item.short_link"
                     style="height:20px;line-height: 20px"
                  >{{(Number(index)+1)+'.'+item.title}}</a><br>
                </span>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    text
                    color="teal accent-4"
                    @click="fetchData" >
                    刷新一下
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col xs='6' sm='4' md='4' cols="6">
          <v-card
            max-width="360"
            @mouseover="reveal1=true"
            @mouseleave="reveal1=false">
            <v-img
              src="https://www.dmoe.cc/random.php"
              style="filter: blur(0.2px);"
              gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.5)"
              height="132px">
              <v-card-title class="text-h5" style="color:cyan;">鬼畜排行榜</v-card-title>
            </v-img>
            <v-expand-transition>
              <v-card
                v-if="reveal1"
                class="transition-fast-out-fast-in v-card--reveal-top overflow-hidden overflow-y-auto"
                dark
                style="height: 100%;">
                <v-card-text class="pb-0">
                <span v-for="(item,index) in gc" :key="item.aid">
                  <a class="overline text-decoration-none white--text"
                     :href="item.short_link"
                     style="height:20px;line-height: 20px"
                  >{{(Number(index)+1)+'.'+item.title}}</a><br>
                </span>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    text
                    color="teal accent-4"
                    @click="fetchData1" >
                    刷新一下
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col xs='6' sm='4' md='4' cols="6">
          <v-card
            max-width="360"
            @mouseover="reveal2=true"
            @mouseleave="reveal2=false">
            <v-img
              src="https://api.btstu.cn/sjbz/?lx=dongman"
              style="filter: blur(0.2px);"
              gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.5)"
              height="132px">
              <v-card-title class="text-h5" style="color:cyan;">电影排行榜</v-card-title>
            </v-img>
            <v-expand-transition>
              <v-card
                v-if="reveal2"
                class="transition-fast-out-fast-in v-card--reveal-top overflow-hidden overflow-y-auto"
                dark
                style="height: 100%;">
                <v-card-text class="pb-0">
                <span v-for="(item,index) in movie" :key="item.aid">
                  <a class="overline text-decoration-none white--text"
                     :href="item.short_link"
                     style="height:20px;line-height: 20px"
                  >{{(Number(index)+1)+'.'+item.title}}</a><br>
                </span>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    text
                    color="teal accent-4"
                    @click="fetchData2" >
                    刷新一下
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>

      <v-banner elevation="2" class="text-sm-h6 text-md-h6  my-2" >
        上传视频
        <span style="font-size:15px; color:gray" class="text--muted float-right">2021-7-01</span></v-banner>
      <v-row>
        <v-col  v-for="item in courses" :key="item._id"
                xs='6' sm='4' md='3' cols="6">
          <v-hover
            v-slot="{ hover }" >
            <v-card
              :elevation="hover ? 16 : 2"
              :to="`/courses/${item._id}`"
              transition="fade-transition"
              class="mx-auto"


              max-width="344" >
              <v-img
                transition="scale-transition"
                class="mx-auto white--text align-end"
                height="150px"
                :src="item.cover">
                <i class="cyan--text iconfont icon-luxiang1 pa-2"></i>
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex pa-2 transition-fast-out-fast-in cyan darken-2 v-card--reveal  white--text"
                    style="height: 100%; fontSize: 14px;" >
                    最近更新：{{item.updatedAt.slice(0,10)}}
                  </div>
                </v-expand-transition>
              </v-img>

              <v-card-title  style="fontSize: 16px;">{{ item.name }}</v-card-title>
              <v-card-subtitle class="pb-0">
                {{ item.createdAt.slice(0,10) }}
              </v-card-subtitle>

            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-banner elevation="2" class="text-sm-h6 text-md-h6  my-2" >
        精品好图
        <span style="font-size:15px; color:gray" class="text--muted float-right">2021-7-01</span>
      </v-banner>
      <v-row>
        <v-col xs='12' sm='4' md='3'>
          <v-card
            class="mx-auto"
            outlined
            @click="$router.push('/courses/ps')">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                  小舍图片(千张)
                </v-list-item-title>
                <v-list-item-subtitle>资源来自<a class="text-decoration-none" target="_blank" href="https://github.com/bai-23/photosapi"><strong>小舍图片Api</strong></a> ，喜欢的朋友可以点个star~</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar
                tile
                size="80"
                color="grey">
                <v-img src="http://api.aoau.top:9999/photos/3/%20%2834%29.png"></v-img>
              </v-list-item-avatar>
            </v-list-item>

          </v-card>
        </v-col>

        <v-col xs='12' sm='4' md='3' >
          <v-card
            class="mx-auto"
            outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                  拍摄
                </v-list-item-title>
                <v-list-item-subtitle>By XXG0，详情<a class="text-decoration-none" target="_blank" href="https://500px.com.cn/community/user-details/816c1507a4879ad3a9ab28b2cdf655701"><strong>戳这里</strong></a> </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar
                tile
                size="80"
                color="grey">
                <v-img src="https://api.btstu.cn/sjbz/?lx=dongman"></v-img>
              </v-list-item-avatar>
            </v-list-item>

          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>

</template>

<script>
export default {
  // async asyncData({ $axios }) {
  //   const data = await $axios.$get('courses')
  //
  //   return {
  //     courses: data.data,
  //   }
  // },
  data() {
    return {
      reveal: false,
      reveal1: false,
      reveal2: false,
      Bz: '',
      gc: '',
      movie: '',
      courses: {},
      showPs: false,
      attrs: {
        class: 'mb-6',
        boilerplate: false,
        elevation: 2,
      },
    }
  },
  created() {
    this.fetchData()
    this.fetchData1()
    this.fetchData2()
    this.fetchCourses()
  },
  mounted() {

  },
  methods: {
    async fetchCourses() {
      const data = await this.$axios.get('http://aoau.top:3006/courses')
      this.courses = data.data.data
    },
    async fetchData() {
      const Bz = await this.$axios.get('/bz')
      this.Bz = Bz.data.douga
    },
    async fetchData1() {
      const Bz = await this.$axios.get('/bz')
      this.gc = Bz.data.kichiku
    },
    async fetchData2() {
      const Bz = await this.$axios.get('/bz')
      this.movie = Bz.data.movie
    }
  },

}
</script>

<style lang="scss">
  .v-card--reveal-top {
    z-index: 1000;
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
</style>
