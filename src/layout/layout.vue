<template>
  <el-container>
      <el-header>NABER BLOCK
        <!-- 点击进入首页 -->
        <a href="/"> <span class="company">INDEX</span> </a>
      </el-header>

      <el-container>
        <el-aside>
          SIDE BLOCK 
          <app-side-menu/>
        </el-aside>

        <el-main>
          <h5> MAIN BLOCK </h5>
          <app-main/>
        </el-main>
      </el-container>

      <el-footer>FOOTER BLOCK</el-footer>

    </el-container>
</template>
<script>
// import mainBlockk from '@/components/main.vue'
import { AppMain, AppSideMenu } from './components'
export default {
  components: {
    AppMain,
    AppSideMenu
  }
}
</script>
