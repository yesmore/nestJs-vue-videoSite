<template>
  <div>
    <h3>用户列表
      <el-button 
      type="primary" 
      size="small" 
      style='float: right'
      @click="$router.push('/users/create')">
      <i class="iconfont icon-jia"> 添加用户</i> 
    </el-button>
    </h3>
    
    
    <el-table
      :data="data.data"
      style="width: 100%" stripe border>
      <el-table-column v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="name.width">
      </el-table-column>

      <el-table-column
          label="操作"
          :width="150">
          <template v-slot='{row}'>
            <!-- v-slot='scope'获取该行数据 -->
            <el-link type="primary"  size='mini' @click="$router.push(`/users/edit/${row._id}`)">
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
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default  class UsersList extends Vue{
  $http: any;
  $message: any;
  $confirm: any;

  data = {}  
  fields = {
    _id: { label: 'ID' },
    username: { label: "用户名" },
  }
  currentPage = 1
  total = 1
  
  async handleCurrentChange(val:any) {
    this.currentPage = val
    const res = await this.$http.get(`courses?query={"page":${this.currentPage}}` )
    this.data = res.data
  }

  async remove(item:any) {
    try {
      await this.$confirm(`是否删除"${item.username}"?`)
    } catch (e) {
      return
    } 
    await this.$http.delete(`users/${item._id}`)
    this.$message.success('删除成功')
    this.fetch();
  }
  
  async fetch(){ 
    const res = await this.$http.get('users')
    this.data = res.data
    this.total = res.data.total
    this.currentPage = res.data.page
    // console.log(this.data)
  }

  created(){
    this.fetch();
  }
}
</script>

<style>

</style>