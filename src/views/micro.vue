<template>
  <div class="about">
    <h1>This is C page</h1>
    <div class="content-wrapper">
      c page start test rendor...
      <!-- <router-view v-show="$route.name"></router-view>
      <div v-show="!$route.name" id="micro-app"></div> -->

      <br/>
      <br/>
      <router-view></router-view>
      <div id="ddd"> loading... </div>

      <!--主应用渲染，读取的是当前主应用的路由-->
      <!-- $route = {{ $route }}
      <router-view v-show="$route.name"></router-view> -->
      <!--子应用渲染，读取子应用中的对应的路由-->
      <!-- <div v-show="!$route.name" id="micro-app"></div> -->
    </div>
  </div>
</template>

<script>
import qiankunStart from '../micro'
export default {
  name: 'vMicro',
  components: {
  },
  mounted () {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      // 启动qiankun
      qiankunStart();
    }
  }, 
  data() {
    return {
    };
  },
  created () {
    console.log("c created")
    console.log("c created", this.$route)
    console.log("c created", this.$route.name)
  }, 
  methods: {
  },
};

</script>

<style scoped>
  .about {
    color: #7265e6;
  }
</style>
