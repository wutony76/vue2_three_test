<template>
  <component v-bind:is="view" />
</template>

<script>
  import { mapState } from 'vuex'
  const home_pc = () => import('@/views/pc/HomeView.vue')
  const home_h5 = () => import('@/views/h5/HomeView.vue')

  export default {
    components: {
      home_h5,
      home_pc
    },
    computed: {
      ...mapState({
        uaInfo: state => state.global.uaInfo,
      }),
      view () {
        return `home_${this.uaInfo.device}`
      }
    }
  }
</script>
