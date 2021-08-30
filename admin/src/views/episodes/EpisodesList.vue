<template>
  <div>
    <h3>
       资源列表
      <el-button 
        type="primary" 
        size="mini" 
        style='float: right'
        @click="$router.push('/episodes/create')">
        <i class="iconfont icon-jia"> 添加资源</i> 
      </el-button>
      <el-input 
       style="float:right; maxWidth:200px; marginRight: 15px" 
       size='small'
       placeholder="请输入内容"
       v-model="inputKey" 
       @input="search2"
       class="input-with-select">
        <el-button @click="clearInput" slot="append" >取消</el-button>
      </el-input>

      <div class="block" style='float: right; marginTop:-15px'>
        <el-pagination
          class='pagination'
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          background
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </h3>
    
    
    <el-table
      :data="data.data"
      style="width: 100%" stripe>
      <el-table-column v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        sortable
        @sort-method="sortChange"
        :label="field.label"
        :width="name.width">
      </el-table-column>

      <el-table-column
          label="操作"
          :width="150">
          <template v-slot='{row}'>
            <!-- v-slot='scope'获取该行数据 -->
            <el-link type="primary"  size='mini' @click="$router.push(`/episodes/edit/${row._id}`)">
              <i class="iconfont icon-tubiao09 " style="fontSize:12px">编辑</i>
            </el-link>
            <el-link type="danger" style="paddingLeft:10px" size='mini' @click="remove(row)">
              <i class="iconfont icon-shanchu2"  style="fontSize:12px">删除</i>
            </el-link>
            
          </template>
        </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        class='pagination'
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        background
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default  class EpisodesList extends Vue{
  $http: any;
  $message: any;
  $confirm: any;

  data = {
    data: [],
  }  
  fields = {
    _id: { label: 'ID' },
    name: { label: "资源名称" },
    updatedAt: { label: '日期' }
  }
  currentPage = 1
  total = 1
  inputKey = ''

  async search (){
    
    const res = await this.$http.get(`episodes?query={"where":{"name":{"$regex":"${this.inputKey}"}}}`)
    this.data = res.data
    this.data && this.toJSONLocal()
    this.total = res.data.total
    this.currentPage = res.data.page
  }
  search2 (){
    let timer
    this.data.data = []
    if (this.inputKey) {
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        this.search()
      }, 300);
    }
  }
  clearInput (){
    this.data.data = []
    this.fetch();
  }

  async handleCurrentChange(val:any) {
    this.currentPage = val
    const res = await this.$http.get(`episodes?query={"page":${this.currentPage}}` )
    this.data = res.data
    this.data && this.toJSONLocal()
  }

  async remove(item:any) {
    try {
      await this.$confirm(`是否删除"${item.name}"?`)
    } catch (e) {
      return
    } 
    await this.$http.delete(`episodes/${item._id}`)
    this.$message.success('删除成功')
    this.fetch();
  }
  
  sortChange(){
    return this.data.data.reverse()
  }
  async fetch(){
    const res = await this.$http.get('episodes')
    this.data = res.data
    this.data && this.toJSONLocal()
    this.total = res.data.total
    this.currentPage = res.data.page
    // console.log(this.data)
  }

  toJSONLocal () {
    // this.data.data.map((item,index) => {
    //   this.data.data[index].updatedAt = this.data.data[index].updatedAt.toString().slice(0, 10);
    // })
  }

  created(){
    this.fetch();
    console.log()
  }
}
</script>

<style>

</style>