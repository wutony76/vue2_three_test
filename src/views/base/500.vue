<template>
  <main>
    <h1> 500 Page. </h1>
    <p>
      {{second}}秒後嘗試跳轉...
    </p>
  </main>
</template>

<script>
  export default {
    name: 'ErrorPage500',
    data() {
      return {
        second: 3 
      }
    },
    mounted () {
      setTimeout(() => {
        this.calcTime()
      }, 1000)
    },
    methods: {
      calcTime () {
        // console.log('calcTime...', this.second)
        if (this.second <= 0) {
          console.log('start jump.')
          // sample
          // this.$router.push({ name: 'user', params: { userId: 1 } })
          this.$router.push({ name: 'home' })
          return 
        }
        this.second -= 1
        setTimeout(() => {
          this.calcTime()
        }, 1000)
      }
      
    }
  }
</script>

<style scoped>
  .about {
    color: #7265e6;
  }
</style>
