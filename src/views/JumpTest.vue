<template>
  <component v-bind:is="view" />
</template>

<script>
  import { mapState } from 'vuex'
  const nameSpace = 'test_'
  const test_pc = () => import('@/views/pc/TestView.vue')
  const test_h5 = () => import('@/views/h5/DefaultView.vue')

  export default {
    components: {
      test_pc,
      test_h5, 
    },
    computed: {
      ...mapState({
        uaInfo: state => state.global.uaInfo,
      }),
      view () {
        return `${nameSpace}${this.uaInfo.device}`
        // return `test_${this.uaInfo.device}`
      }
    }
  }
</script>
