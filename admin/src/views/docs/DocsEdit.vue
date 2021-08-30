<template>
  <div>
    <h3>{{ isNew ? '添加' : '编辑' }}文档</h3>

    <ele-form
      class="formBar"
      v-model="data"
      :form-desc="fields"
      :request-fn='submit'>
    </ele-form>

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default  class DocsEdit extends Vue{
  @Prop(String) id!:string // 接收参数

  $http: any;
  $message: any;
  $router: any;

  data = {}
  fields = {
    name: { type: 'input', label: '文档名称', required: true },
    docurl: { type: 'input', label: '文档链接', required: true },
    info: { type: 'textarea', label: '文档简介', required: true },
  }

  handleAvatarSuccess(res:any) {
    // console.log(res.url)
    if (res.url) {
      this.$message.success('上传成功',{
        duration: 1000
      })
    }
  }

  async fetch(){
    const res = await this.$http.get(`documents/${this.id}`)
    this.data = res.data
  }
  async submit(data:any){
    const url = this.isNew ? `documents` : `documents/${this.id}`
    const method = this.isNew ? 'post' : 'put'
    const msg = this.isNew ? '创建成功' : '修改成功'
    await this.$http[method](url, data)
    this.$message.success(msg, {
      duration: 1000
    })
    this.data = { }
    this.$router.go(-1)
  }

  // 计算属性：是否为编辑页（id）
  get isNew(){
    return !this.id
  }

  created(){
    // 不是编辑页面不执行
    !this.isNew && this.fetch();
  }
}
</script>

<style>
  .avatar {
    width:150px;
    border-radius: 10px
  }


</style>
