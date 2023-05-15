<template>
  <div class="home">
    <HrMenu/>
    H5 HOME PAGE
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import html2canvas from 'html2canvas';
import HrMenu from '@/layout/components/HrMenu.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld, HrMenu
  },
  methods: {
    generatorImage () {
      console.log('handleChange...')
      // html2canvas(document.body).then(function (canvas) {
      //   console.log('canvas >>', canvas)
      //   document.body.appendChild(canvas);
      // });

      html2canvas(document.body).then(canvas => {
      // html2canvas(this.$refs.capture).then(canvas => {
        console.log('canvas >>', canvas)
        this.$refs.addImage.append(canvas);
        let link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.setAttribute('download', 'web截圖.png');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
      })

    }
  }
}
</script>
