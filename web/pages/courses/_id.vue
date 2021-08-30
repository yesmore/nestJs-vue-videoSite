<template>
  <div>
    <div class="animate__animated animate__fadeInRightBig">
      <h3 >{{course.name}}</h3>
      <v-select
        v-if="course"
        v-model="currentIndex"
        :items="course.episodes.map((v,i)=>({text: v.name, value: i}))">
      </v-select>

      <v-row>
        <v-col xs="12" sm="12" md="9">
          <v-card
            transition="scale-transition"
            color="cyan"
            dark
            min-width="300"
            max-width="100%" >
            <video :src="episode.file" controls width="100%"></video>
            <v-card-actions class="pa-0">
              <v-list-item class="grow">
                <v-list-item-content>
                  <v-list-item-title>{{course.name}}</v-list-item-title>
                </v-list-item-content>

                <v-row
                  align="center"
                  justify="end">
                  <v-icon class="mr-1">
                    mdi-heart
                  </v-icon>
                  <span class="subheading mr-3">0</span>

                  <v-icon class="mr-1">
                    mdi-star
                  </v-icon>
                  <span class="subheading mr-3">0</span>

                  <v-icon class="mr-1">
                    mdi-share-variant
                  </v-icon>
                  <span class="subheading">0</span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col xs="12" sm="12" md="3" class="">
          <v-card
            :loading="loading"
            class="mx-auto" >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="100%"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-card-actions>
              <v-btn color="cyan" depressed @click="$router.go(-1)">
                返回
              </v-btn>
            </v-card-actions>
            <v-card-title class="py-1">{{course.name}}</v-card-title>
            <v-card-text class="pb-1"><strong>正在观看：</strong>{{episode.name}}</v-card-text>
            <v-card-text>
              <v-row
                align="center"
                class="mx-0" >
                <v-rating
                  v-model="rating"
                  color="amber"
                  dense
                  empty-icon="$ratingFull"
                  half-increments
                  hover
                  size="18"
                ></v-rating>

                <div class="grey--text ms-4">
                  {{ rating }}
                </div>
              </v-row>

              <div class="mt-4"> 当前系列共 {{course.episodes.length}} 部 </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-alert
              v-model="alert"
              dismissible
              color="cyan lighten-3"
              border="left"
              style="font-size: 13px"
              elevation="2"
              colored-border
              icon="mdi-alert">
              资源来源于<strong>互联网</strong>，侵权请联系
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                <span
                  style="color:cyan"
                  dark
                  v-bind="attrs"
                  v-on="on" >
                  站长
                </span>
                </template>
                <span>Email：zihei@prtop.com</span>
              </v-tooltip>
            </v-alert>
          </v-card>
        </v-col>
      </v-row>

    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    // async asyncData({ params, $axios }){
    //   const { id } = params
    //   const course = await $axios.$get(`courses/${id}`, {
    //     params: {
    //       query: {
    //         populate: 'episodes'
    //       }
    //     }
    //   })
    //   return {
    //     id,
    //     course,
    //
    //   }
    // },
    data () {
      return {
        currentIndex: 0,
        loading: false,
        selection: 1,
        rating: 0,
        alert: true,
        course: {
          episodes: []
        },

      }
    },

    computed: {
      // 当前选中的课时
      episode() {
        return this.course.episodes[this.currentIndex]
      }
    },
    created (){
      this.fetchEpisodes ()
    },
    methods: {
      async fetchEpisodes () {
        const { id } = this.$route.params
        const course = await this.$axios.get(`http://aoau.top:3006/courses/${id}`, {
          params: {
            query: {
              populate: 'episodes'
            }
          }
        })
        this.course = course.data
      },

      reserve () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
    },

  }
</script>

<style scoped>

</style>
