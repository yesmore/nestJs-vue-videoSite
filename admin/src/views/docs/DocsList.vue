<template>
  <div>
    <h3>
       文档列表
      <el-button
        type="primary"
        size="mini"
        style='float: right'
        @click="$router.push('/docs/create')">
        <i class="iconfont icon-jia"> 添加文档</i>
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
          <el-link type="primary"  size='mini' @click="$router.push(`/docs/edit/${row._id}`)">
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
export default  class DocsList extends Vue{
  $http: any;
  $message: any;
  $confirm: any;

  data = {
    data: []
  }
  fields = {
    _id: { label: 'ID' },
    updatedAt: { label: '日期' },
    name: { label: "文档名称" },
    // cover: { label: '系列封面'},
  }
  currentPage = 1
  total = 1
  inputKey = ''

  async search (){

    const res = await this.$http.get(`documents?query={"where":{"name":{"$regex":"${this.inputKey}"}}}`)
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
    const res = await this.$http.get(`documents?query={"page":${this.currentPage}}` )
    this.data = res.data
    this.data && this.toJSONLocal()
    // this.data.data = res.data.data.reverse()
  }

  async remove(item:any) {
    try {
      await this.$confirm(`是否删除"${item.name}"?`)
    } catch (e) {
      return
    }
    await this.$http.delete(`documents/${item._id}`)
    this.$message.success('删除成功')
    this.fetch();
  }

  async fetch(){
    const res = await this.$http.get('documents')
    this.data = res.data
    this.data && this.toJSONLocal()
    this.total = res.data.total
    this.currentPage = res.data.page
    // console.log(this.data)
  }

  sortChange(){
    return this.data.data.reverse()
  }

  toJSONLocal () {
    // this.data.data.map((item,index) => {
    //   this.data.data[index].updatedAt = this.data.data[index].updatedAt.toString().slice(0, 10);
    // })
  }

  created(){
    this.fetch();
  }
}
</script>

<style>
  .pagination {
    /* text-align: center; */
    margin-top: 15px;
    float: right;
  }
</style>
