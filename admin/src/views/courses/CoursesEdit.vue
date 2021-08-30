<template>
  <div>
    <h3>{{ isNew ? '创建' : '编辑' }}系列</h3>

    <ele-form
      class="formBar"
      v-model="data"
      :form-desc="fields"
      :request-fn='submit'>
      <el-form-item label-position="top">
        <el-upload
          class="avatar-uploader"
          action="http://aoau.top:3005/upload"
          :show-file-list="false"

          :auto-upload='true'
          :on-success="handleAvatarSuccess">
          <el-button class="chooseImg" plain type="success" size="small">
            点击上传<i class="el-icon-upload el-icon--right"></i>
            </el-button>
        </el-upload>
      </el-form-item>
    </ele-form>


  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default  class CoursesEdit extends Vue{
  @Prop(String) id!:string // 接收参数

  $http: any;
  $message: any;
  $router: any;

  imageUrl = 'http://aoau.top:3005/uploads/e172db2b17666ade06b069fe47a5d52f'
  data = { cover: '',}
  fields = {
    cover: {
      type: 'image',
      label: '系列封面',
      disabled: true,
      default: this.imageUrl,
      options: [
        {value: this.imageUrl}
      ]
    },
    name: { type: 'input', label: '系列名称', required: true },
  }

  handleAvatarSuccess(res:any) {
    // console.log(res.url)
    if (res.url) {
      this.imageUrl = res.url
      this.data.cover = res.url
      this.$message.success('上传成功',{
        duration: 1000
      })
    }

  }

  async fetch(){
    const res = await this.$http.get(`courses/${this.id}`)
    this.data = res.data
    this.imageUrl =  this.data.cover
  }
  async submit(data:any){
    const url = this.isNew ? `courses` : `courses/${this.id}`
    const method = this.isNew ? 'post' : 'put'
    const msg = this.isNew ? '创建成功' : '修改成功'
    await this.$http[method](url, data)
    this.$message.success(msg, {
      duration: 1000
    })
    this.data = {cover:'' }
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
