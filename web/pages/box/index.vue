<template>
  <div class="">
    <h3 class='mb-4'>黒盒子</h3>

    <v-row>
      <v-col xs="12" sm="6" md="4">
        <v-card
          :loading="isLoading"
          class="mx-auto"
          min-width="270"
          height="180"
          @mouseover="reveal = true"
          @mouseleave="reveal=false">
          <v-card-text>
            <p class="text-h5 text--primary">
              QQ号查手机号
            </p>
            <v-chip
              v-if="chip4"
              class="ma-2"
              color="orange"
              label
              outlined
              @click:close="chip4 = false">
              请勿泄露他人信息
            </v-chip>
          </v-card-text>

          <v-expand-transition>
            <v-card
              v-if="reveal"
              class="transition-fast-out-fast-in v-card--reveal-top"
              style="height: 100%;"
            >
              <v-card-text class="pb-0">
                <v-text-field v-model="QQ" label="输入QQ号" >
                  <v-icon
                    slot="append"
                    color="cyan"
                    @click.native="fetchPhone">
                    Go
                  </v-icon>
                </v-text-field>
                <v-chip
                  v-if="chip1"
                  class="ma-0 mb-2"
                  close
                  color="cyan"
                  outlined
                  @click:close="closeQQFindPhone">
                  电话: {{phone.phone}}
                </v-chip>
                <v-chip
                  v-if="chip1"
                  class="ma-0 mb-2"
                  close
                  color="cyan"
                  outlined
                  @click:close="closeQQFindPhone">
                  地区: {{phone.phonediqu}}
                </v-chip>
<!--                <p>请勿泄露他人信息！</p>-->
              </v-card-text>

            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>

      <v-col  xs="12"  sm="6" md="4">
        <v-card
          :loading="isLoading1"
          class="mx-auto"
          min-width="270"
          height="180"
          @mouseover="reveal1 = true"
          @mouseleave="reveal1=false">
          <v-card-text>
            <p class="text-h5 text--primary">
              手机号查QQ号
            </p>
            <v-chip
              v-if="chip4"
              class="ma-2"
              color="orange"
              label
              outlined
              @click:close="chip4 = false">
              请勿泄露他人信息
            </v-chip>
          </v-card-text>

          <v-expand-transition>
            <v-card
              v-if="reveal1"
              class="transition-fast-out-fast-in v-card--reveal-top"
              style="height: 100%;"
            >
              <v-card-text class="pb-0">
                <v-text-field v-model="phone1" label="输入手机号" >
                  <v-icon
                    slot="append"
                    color="cyan"
                    @click.native="fetchQQ">
                    Go
                  </v-icon>
                </v-text-field>
                <v-chip
                  v-if="chip2"
                  class="ma-0 mb-2"
                  close
                  color="cyan"
                  outlined
                  @click:close="closePhoneFindQQ">
                  QQ: {{QQ1.qq}}
                </v-chip>
                <v-chip
                  v-if="chip2"
                  class="ma-0 mb-2"
                  close
                  color="cyan"
                  outlined
                  @click:close="closePhoneFindQQ">
                  地区: {{QQ1.phonediqu}}
                </v-chip>

              </v-card-text>

            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>

      <v-col  xs="12"  sm="6" md="4">
        <v-card
          :loading="isLoading2"
          class="mx-auto"
          min-width="270"
          height="180"
          @mouseover="reveal2 = true"
          @mouseleave="reveal2=false">
          <v-card-text>
            <p class="text-h5 text--primary">
              微博ID查手机号
            </p>
            <v-chip
              v-if="chip4"
              class="ma-2"
              color="orange"
              label
              outlined
              @click:close="chip4 = false">
              请勿泄露他人信息
            </v-chip>
          </v-card-text>

          <v-expand-transition>
            <v-card
              v-if="reveal2"
              class="transition-fast-out-fast-in v-card--reveal-top"
              style="height: 100%;">
              <v-card-text class="pb-0">
                <v-text-field v-model="webId" label="输入微博ID" >
                  <v-icon
                    slot="append"
                    color="cyan"
                    @click.native="fetchPhone1">
                    Go
                  </v-icon>
                </v-text-field>
                <v-chip
                  v-if="chip3"
                  class="ma-0 mb-2"
                  close
                  color="cyan"
                  outlined
                  @click:close="closeIdFindPhone">
                  电话: {{phone2.phone}}
                </v-chip>
                <v-chip
                  v-if="chip3"
                  class="ma-0 mb-2"
                  close
                  color="cyan"
                  outlined
                  @click:close="closeIdFindPhone">
                  地区: {{phone2.phonediqu}}
                </v-chip>

              </v-card-text>

            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>

      <v-col  xs="12"  sm="6" md="4">
        <v-card
          :loading="isLoading3"
          class="mx-auto"
          min-width="270"
          height="180"
          @mouseover="reveal3 = true"
          @mouseleave="reveal3=false">
          <v-card-text>
            <p class="text-h5 text--primary">
              查看QQ头像
            </p>
            <v-chip
              v-if="chip4"
              class="ma-2"
              color="orange"
              label
              outlined
              @click:close="chip4 = false">
              请勿泄露他人信息
            </v-chip>
          </v-card-text>

          <v-expand-transition>
            <v-card
              v-if="reveal3"
              class="transition-fast-out-fast-in v-card--reveal-top"
              style="height: 100%;">
              <v-card-text class="pb-0">
                <v-text-field v-model="QQ2" label="输入QQ号" >
                  <v-icon
                    slot="append"
                    color="cyan"
                    @click.native="fetchImg">
                    Go
                  </v-icon>
                </v-text-field>
                <v-chip
                  v-if="chip5"
                  class="ma-0 mb-2"
                  close
                  color="cyan"
                  outlined
                  @click:close="closeQQFindImg">
                  查询成功！
                  <a target="_blank" :href="`https://api.xiaobaibk.com/api/qq.php?qq=${QQ2}`">点击查看</a>
                </v-chip>

              </v-card-text>

            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>

      <v-col  xs="12"  sm="6" md="4">
        <v-card
          :loading="isLoading4"
          class="mx-auto"
          min-width="270"
          height="180"
          @click="fetchImg1"
          @mouseleave="reveal4=false">
          <v-card-text>
            <p class="text-h5 text--primary">
              获取随机图片
            </p>
            <v-chip
              v-if="chip4"
              class="ma-2"
              color="cyan"
              label
              outlined
              @click:close="chip4 = false">
              点击刷新即可获取
            </v-chip>
          </v-card-text>

          <v-expand-transition>
            <v-card
              v-if="reveal4"
              class="transition-fast-out-fast-in v-card--reveal-top"
              style="height: 100%;">

              <v-img transition="scale-transition" height="180" :src="imgurl1"></v-img>
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>


    </v-row>
  </div>
</template>

<script>
  export default {
    name: "",
    asyncData() {
      return {}
    },
    data: () => ({
      chip4:true,
      reveal: false,
      chip1: false,
      QQ: '',
      phone: '',
      isLoading: false,
      reveal1: false,
      chip2: false,
      QQ1: '',
      phone1: '',
      isLoading1: false,
      reveal2: false,
      chip3: false,
      webId: '',
      phone2: '',
      isLoading2: false,
      reveal3: false,
      chip5: false,
      QQ2: '',
      imgurl: '',
      isLoading3: false,
      reveal4: false,
      imgurl1: '',
      chip6: false,
      isLoading4: false,
    }),
    methods: {
      async fetchPhone(){
        this.isLoading = true
        const num = await this.$axios.get('/findphone?qq='+this.QQ)
        if (num ) {
          this.isLoading = false
          this.phone = num.data
          this.chip1 = true
        }
      },
      async fetchQQ() {
        this.isLoading1 = true
        const num = await this.$axios.get('/findqq?phone='+this.phone1)
        if (num ) {
          this.isLoading1 = false
          this.QQ1 = num.data
          this.chip2 = true
        }
      },
      async fetchPhone1(){
        this.isLoading2 = true
        const num = await this.$axios.get('/findwbphone?id='+this.webId)
        if (num ) {
          this.isLoading2 = false
          this.phone2 = num.data
          this.chip3 = true
        }
      },
      async fetchImg(){
        this.isLoading3 = true
        const num = await this.$axios.get('/findimg?qq='+this.QQ2)
        if (num ) {
          this.isLoading3 = false
          this.imgurl = num.data
          this.chip5 = true
        }
      },
      async fetchImg1(){
        this.reveal4=true
        this.isLoading4 = true
        const num = await this.$axios.get('/findbea?return=json')
        if (num ) {
          this.isLoading4 = false
          this.imgurl1 = num.data.imgurl
          this.chip6 = true
        }
      },

      closeQQFindPhone(){
        this.reveal = false
        this.chip1 = false
        this.phone = ''
        this.QQ = ''
      },
      closePhoneFindQQ(){
        this.reveal1 = false
        this.chip2 = false
        this.phone1 = ''
        this.QQ1 = ''
      },
      closeIdFindPhone(){
        this.reveal2 = false
        this.chip3 = false
        this.phone2 = ''
        this.webId = ''
      },
      closeQQFindImg(){
        this.reveal3 = false
        this.chip5 = false
        this.imgurl = ''
        this.QQ2 = ''
      }
    },
  }
</script>

<style scoped>
  .v-card--reveal-top {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
</style>
