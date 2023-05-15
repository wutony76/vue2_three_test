<template>
  <main>
    <h1> 404 Page. </h1>
    <p>
      Please check the URL 
      <br/>
      Try going <router-link :to="{ name: 'home' }"> HOME </router-link>
    </p>
  </main>
</template>

<script>
  export default {
    name: 'ErrorPage404',
    data() {
      return {
      };
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<style scoped>
  .about {
    color: #7265e6;
  }
</style>
