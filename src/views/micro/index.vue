<template>
  <div class="about">
    <h1>This is MICRO page</h1>
    <div class="content-wrapper">
      micro page start test rendor...
      <br />
      <br />
      <div id="ddd"> loading... </div>

    </div>
  </div>
</template>

<script>
import qiankunStart from '@/micro'
export default {
  name: 'vMicro',
  components: {
  },
  created() {
    console.log("c created")
    console.log("c created", this.$route)
    console.log("c created", this.$route.name)
  },
  mounted() {
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
  methods: {
  },
};

</script>

<style scoped>
.about {
  color: #7265e6;
}
</style>
