<template>
  <div >
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
      <span class="animate__animated animate__fadeIn">
        文档收集于互联网，有需求添加可联系站长
      </span>
    </v-alert>

    <v-row>
      <v-col class="pb-0">
        <div class="text-center">

          <h2 style=""><i class="iconfont icon-github"></i> 文档导航</h2>

        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="pb-0" offset-md="3" offset-sm="3" sm="6" md="6">
        <v-autocomplete
          :items="docsList.map(item => item.name)"
          placeholder="请输入文档名"
          auto-select-first
          clearable
          dense
          filled
          rounded
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="doc in docsList"
        :key="doc._id"
        flex="10">
        <v-card class="mx-auto" height="150">
          <v-list-item three-line>
            <v-list-item-content>
              {{doc.name}}
            </v-list-item-content>
            <v-list-item-avatar
              tile
              class=" text-center"
              size="50"
              color="">
              <span style="color: #f44873;font-weight:700;font-size:24px">{{doc.name.slice(0, 1)}}</span>
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions class="pt-0">
            <v-btn
              text
              class="pa-0"
              color="cyan "
              @click="doc.reveal = true">
              简介
            </v-btn>
            <v-btn text class="pa-0">
              <a class="text-decoration-none " style="color:cyan" :href="doc.docurl" target="_blank">链接</a>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <v-card
              v-if="doc.reveal"
              class="transition-fast-in-fast-out v-card--reveal overflow-y-auto"
              style="height: 100%;">
              <v-card-text class="pb-0">
                <div class="text--primary">
                  <strong>{{doc.name}}</strong>
                </div>
                <p>
                  {{doc.info}}
                </p>
              </v-card-text>

              <v-card-actions class="pt-0">
                <v-btn
                  text
                  color="cyan accent-4"
                  @click="doc.reveal = false">
                  关闭
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

    <v-row >
      <v-col>
        <v-pagination
          v-model="currentPage"
          :length="4"
          circle
          color="cyan "
          @click.native="changePage"
        ></v-pagination>
      </v-col>

    </v-row>
  </div>
</template>

<script>
  export default {
    name: "",
    data: () => ({
      currentPage: 1,
      alert: true,
      docsList: [
        {
          name: "",
          docurl: "",
          info: "",
          reveal: false
        },
      ]
    }),
    created() {
      this.fetchDocs(this.currentPage)
    },
    methods: {
      async fetchDocs(currentPage) {
        const data = await this.$axios.get(`http://aoau.top:3006/documents?query={"page":${currentPage}}`)
        this.docsList = data.data.data
        this.docsList.map((doc) => {
          return this.$set(doc, 'reveal', false)
        })
      },
      changePage() {

        this.fetchDocs(this.currentPage)
      }
    },
  }
</script>

<style scoped>
  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
</style>
