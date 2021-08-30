<template>
  <v-container fluid class="pa-0">
    <v-row dense>
      <v-col xs="12" sm="12" md="8">
        <v-card>
          <v-img
            :src="src"
            width="100%"
            transition="scale-transition"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.15)" >
          </v-img>

        </v-card>
      </v-col>

      <v-col xs="12" sm="12" md="4" class="">
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
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn
              :loading="loading3"
              :disabled="loading3"
              color="cyan"
              class="ma-2 white--text"
              @click="loader = 'loading3'">
              <a :download="src" :href="src" class="white--text text-decoration-none">下载</a>
            </v-btn>

            <v-btn color="cyan" depressed @click="$router.go(-1)">
              返回
            </v-btn>
          </v-card-actions>

          <v-card-title>站站手打中</v-card-title>
          <v-card-text>
            <v-row
              align="center"
              class="" >
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

          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-alert
            v-model="alert"
            dismissible
            color="cyan"
            border="left"
            style="font-size: 13px"
            elevation="2"
            colored-border
            icon="mdi-alert">
            图片来源于<strong>互联网</strong>，仅供个人娱乐
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "",
    data(){
      return {
        src: this.$route.query.photo,
        loading: false,
        selection: 1,
        loading3: false,
        rating: 0,
        alert: true,
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
    methods: {

    },

  }
</script>

<style scoped>

</style>
