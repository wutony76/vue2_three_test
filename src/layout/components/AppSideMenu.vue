<!--default-active默认选中的菜单，选中后颜色是 active-text-color  -->
<!--  :router='true',true表示开启路由模式，开启之后，index值代表的就是路由地址-->
<!--  :router='true'开启之后点击就会跳转到对应的路由，默认为false -->
<!-- text-color 文字的颜色 -->
<template>
  <el-menu
    unique-opened
    mode="vertical"
    :router='true'
  >
    <el-menu-item index="/home">
      <i class="el-icon-eleme"></i>
      <span slot="title">INDEX</span>
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
    <el-menu-item index="/sample01">
      <i class="el-icon-menu"></i>
      <span slot="title">Layout共用樣板</span>
    </el-menu-item>

    <el-menu-item index="/micro">
      <i class="el-icon-menu"></i>
      <span slot="title">Vue2微應用</span>
    </el-menu-item>

  <el-menu-item-group title="PAGE SAMPLE VIEWS">
    <el-menu-item index="/pageA">
      <i class="el-icon-menu"></i>
      <span slot="title">PAGEA</span>
    </el-menu-item>
    <el-menu-item index="/pageB">
      <i class="el-icon-menu"></i>
      <span slot="title">無樣板PageB</span>
    </el-menu-item>
    <el-menu-item index="/pageC">
      <i class="el-icon-menu"></i>
      <span slot="title">PAGEC</span>
    </el-menu-item>
  </el-menu-item-group>

  <el-menu-item-group title="BASE PUBLIC VIEWS">
    <el-menu-item index="/404">
      <i class="el-icon-menu"></i>
      <span slot="title">404PAGE</span>
    </el-menu-item>
    <el-menu-item index="/500">
      <i class="el-icon-menu"></i>
      <span slot="title">500PAGE</span>
    </el-menu-item>
  </el-menu-item-group>


  <!-- 
  <el-menu-item index="url-sample01">
    <router-link to="/sample01">Sample01</router-link>
  </el-menu-item>
  <el-menu-item index="url-about">
    <router-link to="/about">About</router-link>
  </el-menu-item>

  <el-menu-item-group title="Group One">
    <el-menu-item index="1-1">item one</el-menu-item>
    <el-menu-item index="1-2">item two</el-menu-item>
  </el-menu-item-group>
  <el-menu-item-group title="Group Two">
    <el-menu-item index="1-1">item one</el-menu-item>
    <el-menu-item index="1-2">item two</el-menu-item>
  </el-menu-item-group>

  <el-menu-item-group title="Group Three">
    <el-menu-item index="1-1">item one</el-menu-item>
    <el-menu-item index="1-2">item two</el-menu-item>
  </el-menu-item-group> -->
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
