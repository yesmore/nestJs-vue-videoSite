<template>
  <div>
    <h3>{{ isNew ? '创建' : '编辑' }}用户</h3>
    <ele-form 
      v-model="data"
      :form-desc="fields"
      :request-fn='submit'>
    </ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default  class UsersEdit extends Vue{
  @Prop(String) id!:string // 接收参数

  $http: any;
  $message: any;
  $router: any;

  data = {}  
  fields = {
    username: { type: 'input', label: '用户名', required: true },
    password: { type: 'input', label: '密码', required: true },
  }
  
  
 
  async fetch(){
    const res = await this.$http.get(`users/${this.id}`)
    this.data = res.data
  }
  async submit(data:any){
    const url = this.isNew ? `users` : `users/${this.id}`
    const method = this.isNew ? 'post' : 'put'
    const msg = this.isNew ? '创建成功' : '修改成功'
    await this.$http[method](url, data)
    this.$message.success(msg, {
      duration: 1000
    })
    this.data = {}
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

</style>