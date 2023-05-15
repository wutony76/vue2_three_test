<template>
  <el-container>

    <el-header>
      NABER BLOCK
      <!-- 点击进入首页 -->
      <a href="/"> <span class="company">INDEX</span> </a>
      <hr-menu/>
    </el-header>

    <el-container>
      <!-- <el-aside>
        SIDE BLOCK 
        <app-side-menu/>
      </el-aside> -->

      <el-main>
        <h5> MAIN BLOCK </h5>
        <app-main/>
      </el-main>
    </el-container>

    <el-footer> 
      FOOTER BLOCK @2023.05 
      <a href="/"> <span class="company">Home.site</span> </a>
    </el-footer>

  </el-container>
</template>
<script>
// import mainBlockk from '@/components/main.vue'
import { AppMain, HrMenu  } from './components'
export default {
  components: {
    AppMain,
    // AppSideMenu,
    HrMenu
  }
}
</script>
<style scoped lang="scss">
  main{
    min-height: 500px;
  }
  footer{
    border-top: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#909399;
    a {
      margin-left: 5px;
      margin-right: 5px;
      color: #00f;
    }
  }
</style>
