<template>
  <div>
    <v-container fluid class="px-0">
      <v-row  dense>
        <v-col class="pb-0" sm="12" md="12"  style="margin-top: -16px">

          <v-card>
            <v-tabs
              background-color="cyan accent-4"
              center-active
              dark >
              <v-tab
                v-for="(item,index) in items" :key="item"
                @click="changePhotos(index)">
                {{item}}
              </v-tab>

            </v-tabs>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-0" dense>
        <v-col
          v-for="(card) in photosList"
          :key="card.title"
          :cols="card.flex"
          class="pa-0 pt-1 animate__animated animate__fadeIn"
          md="3"
          sm="4">
          <v-hover
            v-slot="{ hover }" >
            <v-card class='ma-1' :elevation="hover ? 16 : 2" @click="toDetail(card)" >
              <v-img
                :src="card.src"
                transition="scale-transition"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.3)"
                height="200px" >
                <v-card-title class='pa-1 cyan--text'>
                  <i class='iconfont icon-zhaopian1'></i>
                </v-card-title>
              </v-img>

            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <div class="btn-control">
        <v-btn class="mx-2" fab dark color="cyan" @click="$router.go(-1)">
          <i class="iconfont icon-quxiao2" style="font-size:18px"></i>
        </v-btn>

        <v-btn class="mx-2" fab dark @click="toTop">
          <i class="iconfont icon-jiantoushang" style="font-size:20px"></i>
        </v-btn>
      </div>

    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    value: 'recent',
    tab: null,
    items: [
      '线路1', '线路2', '线路3', '线路4', '线路5', '线路6', '线路7', '线路8', '线路9', '线路10', '线路11', '线路12', '线路13', '线路14'
    ],
    photosList: [ ],
    currentPage: 14

  })
  ,
  created() {
    this.makePhotos()
  },
  mounted(){
    window.addEventListener("scroll",this.scrollCount,true)
  },
  methods: {
    makePhotos(page){
      page = this.currentPage
      // let photo = 1
      let url = ''
      let type='jpg'
      if (page === 1 || page === 2 || page === 3 || page === 4) {
        type = 'png'
      }
      for(let j=1; j<=100; j++){
        const item = { flex: 6}
        url='http://api.aoau.top:9999/photos/'+page+'/%20%28'+j+'%29.'+type
        // const item = { src: '', flex: 6 }
        this.$set(item, 'src', url)
        this.photosList.push(item)
      }
    },
    changePhotos(currentPage){
      this.photosList = []
      this.currentPage = 14-currentPage
      this.makePhotos(this.currentPage)
    },
    toDetail(item){
      this.$router.push({
        path: '/courses/ps/detial',
        query: {
          photo: item.src
        }
      })
    },

    toTop(){
      window.scrollTo(0, 0)
    }
  },

}
</script>

<style lang="scss" scope>
  .btn-control {
    position: fixed;
    bottom: 60px;
    right: 20px;
  }
</style>
