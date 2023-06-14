<!--default-active默认选中的菜单，选中后颜色是 active-text-color  -->
<!--  :router='true',true表示开启路由模式，开启之后，index值代表的就是路由地址-->
<!--  :router='true'开启之后点击就会跳转到对应的路由，默认为false -->
<!-- text-color 文字的颜色 -->
<template>
    <!-- mode="vertical" -->
  <el-menu
    unique-opened
    mode="horizontal"
    :router='true'
  >
    <el-menu-item index="/home">
      <i class="el-icon-eleme"></i>
      <span slot="title">INDEX</span>
    </el-menu-item>

    <el-menu-item index="/test">
      <i class="el-icon-eleme"></i>
      <span slot="title">TEST</span>
    </el-menu-item>

    <el-menu-item index="/icons">
      <i class="el-icon-menu"></i>
      <span slot="title">ICONS</span>
    </el-menu-item>
    <el-menu-item index="/about">
      <i class="el-icon-star-on"></i>
      <span slot="title">ABOUT</span>
    </el-menu-item>
    <el-menu-item index="/goods">
      <i class="el-icon-s-goods"></i>
      <span slot="title">GOODS</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      console.log('app main.vue path>>> ', this.$route.path)
      return this.$route.path
    }
  }
}
</script>
