<template>
  <div class="hello">
    <el-steps :active="4" align-center>
    <el-step title="权限" description="严格的用户权限管理"></el-step>
    <el-step title="资源" description="支持图片、视频、音频、文本资源"></el-step>
    <el-step title="上传" description="一站式快速上传"></el-step>
    <el-step title="+资源服务器" description="稳定快速的服务器"></el-step>
  </el-steps>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
