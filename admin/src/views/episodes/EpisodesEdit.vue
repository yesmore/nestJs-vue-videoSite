<template>
  <div>
    <h3>{{ isNew ? '创建' : '编辑' }}资源</h3>

    <ele-form

      v-model="data"
      :form-desc="fields"
      :request-fn='submit'>
      <el-form-item label="上传文件">
        <el-upload
          class="upload-demo"
          action="http://aoau.top:3005/upload"
          :on-preview="handlePreview"
          :before-remove="beforeRemove"
          :on-success="handleAvatarSuccess"
          multiple
          :before-upload="beforeUpload"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" plain type="success">{{fileName}}</el-button>
          <div slot="tip" class="el-upload__tip">tip：资源文件有且仅有一个，每次上传将覆盖前一次上传！</div>
        </el-upload>
      </el-form-item>
    </ele-form>
    <!-- <img :src="this.data.file" alt="" srcset="" width="350px">
    <video :src="this.data.file" controls width="350px"></video> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default  class EpisodesEdit extends Vue{
  @Prop(String) id!:string // 接收参数

  $http: any;
  $message: any;
  $router: any;
  $confirm: any;

  data = { file: ''}
  courses = [
    {value: '',name: '', _id: '', text: ''}
  ]
  fileList=[]
  fileName = '选择上传文件'
  filePath = ''
  fields = {
    name: { type: 'input', label: '资源名称', required: true },
    course: {
      type: 'select',
      label: '所属课程',
      required: true ,
      options: [ ],
      attrs: {
        filterable: true,
      }
    },

  }

  beforeUpload(){

  }

  handleAvatarSuccess(res:any,file:any){
    this.fileName = file.name
    this.data.file = res.url
    // console.log(res.url,file.name)
  }
  handlePreview(file:any) {
    this.fileName = file.name
    this.data.file = file.response.url
    // console.log(this.data)
  }
  handleExceed(files:any, fileList:any) {
    this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
  }
  beforeRemove(file:any) {
    // console.log(fileList)
    return this.$confirm(`确定移除 ${ file.name }？`);
  }

  async fetch(){
    const res = await this.$http.get(`episodes/${this.id}`)
    this.data = res.data
    this.fileName = res.data.file ? '该资源已上传': '请上传文件'
  }

  async fetchCourses(){
    const res = await this.$http.get('episodes/allcourses')
    this.courses = res.data
    this.courses.map((item) => {
      this.$set(item, 'value', item._id)
      this.$set(item, 'text', item.name)
    })
    this.fields.course.options = res.data
  }

  async submit(data){
    const url = this.isNew ? `episodes` : `episodes/${this.id}`
    const method = this.isNew ? 'post' : 'put'
    const msg = this.isNew ? '创建成功' : '修改成功'
    await this.$http[method](url, data)
    this.$message.success(msg, {
      duration: 1000
    })
    this.data = { file: ''}
    this.$router.go(-1)
  }

  // 计算属性：是否为编辑页（id）
  get isNew(){
    return !this.id
  }

  created(){
    // 不是编辑页面不执行
    !this.isNew && this.fetch();
    this.fetchCourses()
  }
}
</script>

<style>

</style>
