<template>
  <div class="">
    <!-- 我的标签 -->
    <v-banner elevation="2" class="text-sm-h6 text-md-h6 mb-2" @click.native="showLabel=!showLabel" >
      我的标签
      <v-badge
        color="cyan"
        inline
        class="float-right mr-4"
        :content="labelList.length">
      </v-badge>
    </v-banner>
    <v-expand-transition>
      <v-row v-if="labelList && showLabel" justify="center" >
        <v-col cols="12" class="">
          <v-sheet
            elevation="10"
            rounded="xl">
            <div class="pa-4">
              <v-chip-group
                active-class="cyan--text"
                column>
                <v-chip
                  v-for="tag in labelList"
                  :key="tag._id"
                  class="animate__animated animate__flipInX"
                  :color="tag.color">
                  <v-tooltip top>
                    <template #activator="{ on, attrs }">
                      <span
                        v-bind="attrs"
                        v-on="on">
                        {{ tag.title || tag.name }}
                      </span>
                    </template>
                    <span style="color:cyan">{{tag.info || '熟练度：'+tag.prof}}</span>
                  </v-tooltip>

                </v-chip>
              </v-chip-group>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-expand-transition>
    <!-- 我的项目 -->
    <v-banner elevation="2" class="text-sm-h6 text-md-h6 my-2"  @click.native="changeCategory" >
      项目源码
      <v-menu transition="slide-y-transition" bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            class="cyan mr-4 pa-3 float-right"
            height="22"
            color="cyan"
            dark
            v-bind="attrs"
            v-on="on">
            {{category+'项目'}} <i style="transform:rotate(180deg)" class="iconfont icon-jiantoushang"></i>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click.native="chooseType(item.category)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-banner>
    <v-row  v-if="projects" class="">
      <v-col
        v-for="project in projects"
        v-show="(category==='所有')||(project.type === category)"
        :key="project._id"
        class="animate__animated animate__fadeIn"
        xs="12" sm="6" md="4">
        <v-card  class="mx-auto" width="100%" @mouseleave="project.reveal = false">
          <v-card-text>
            <div class="text-h6 text--primary">
              {{project.title}}
              <v-badge
                class="animate__animated animate__flipInX"
                color="cyan"
                :content="project.type">
              </v-badge>
            </div>
            <p>更新日期：{{project.updatedAt.slice(0,10)}}</p>
            <div class="text--primary">
              <strong>技术栈</strong>：
              <v-chip
                v-for="label in project.labels"
                :key="label"
                class="ma-1"
                small>
              {{label}}
            </v-chip>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="cyan accent-4"
              @click="project.reveal = true">
              简介
            </v-btn>
            <v-btn text>
              <a style="color:cyan" class="text-decoration-none" target="_blank" :href="project.gitURL">Github</a>
            </v-btn>
            <v-btn v-if="project.ioURL!==''" text>
              <a style="color:cyan" class="text-decoration-none" target="_blank" :href="project.ioURL">可预览</a>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <v-card
              v-if="project.reveal"
              class="transition-fast-in-fast-out v-card--reveal"
              style="">
              <v-card-text class="pb-0">
                <p class="text-h6 text--primary">
                  简介
                </p>
                <p>{{project.info}}</p>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-btn
                  text
                  color="teal accent-4"
                  @click="project.reveal = false">
                  关闭
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
    <!-- 我的文章 -->
    <v-banner elevation="2" class="text-sm-h6 text-md-h6 mt-6" @click.native="showLabel=!showLabel" >
      我的文章
      <v-badge
        color="cyan"
        inline
        class="float-right mr-4"
        :content="labelList.length">
      </v-badge>
    </v-banner>
    <v-expand-transition>
      <v-row v-if="labelList && showLabel" justify="center" >
        <v-col cols="12" class="">

        </v-col>
      </v-row>
    </v-expand-transition>

  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        labelList: [],
        labelList1: [],
        labelList2: [],
        projects: [{
          type: '',
          title: '',
          labels: [],
          info: '',
          updatedAt :''
        }],
        showLabel: false,
        colors: ['cyan', '#a2e7a3', 'blue', '#f44873', '#79ec71', '#f6d21e'],
        reveal: false,
        hover: false,
        items: [
          { title: '所有项目', category: 0 },
          { title: '前端项目', category: 1 },
          { title: '后端项目', category: 2 },
          { title: '全栈项目' , category: 3},
        ],
        category: ''
      }
    },
    created() {
      this.fetchLabels()
      this.fetchLabels1()
      this.fetchPros()
    },
    methods: {
      async fetchLabels() {
        const data = await this.$axios.get('http://www.aoau.top/web/api/cards/list')
        this.labelList1=data.data
        this.labelList =  this.labelList1.concat(this.labelList2)
        this.rendomSort()
      },
      async fetchLabels1() {
        const data = await this.$axios.get('http://www.aoau.top/web/api/labels/list')
        this.labelList2=data.data
        this.labelList =  this.labelList2.concat(this.labelList1)
        this.rendomSort()
      },
      async fetchPros() {
        const data = await this.$axios.get('http://www.aoau.top/web/api/projects/list')
        this.projects=data.data.reverse()
        this.projects.map(item => {
          return this.$set(item, 'reveal', false)
        })
      },
      changeCategory(){
        this.category = ''
      },
      chooseType(type){
        switch (type){
          case 0:
            this.category = '所有'
            break
          case 1:
            this.category = '前端'
            break
          case 2:
            this.category = '后端'
            break
          case 3:
            this.category = '全栈'
            break
        }


      },
      rendomSort(){
         this.labelList.sort(function(){
           return Math.random()-0.5;
         });
         this.labelList.map((item, index)=>{
           index = this.randomNum(0, 5)
           return this.$set(item, 'color', this.colors[index])
         })
       },
      randomNum(minNum,maxNum){
        switch(arguments.length){
          case 1:
            return parseInt(Math.random() * minNum + 1,10);
          case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
          default:
            return 0;

        }
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
