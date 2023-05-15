<template>
  <div class="main">
    <h1> MAIN COMPONENTS {{ key }}</h1>
    <router-view :key="key"></router-view><!-- 组件的出口 -->
  </div>
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
