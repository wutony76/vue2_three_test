<template>
  <div class="home-container">
    PC TEST PAGE
    <!-- <div>
      <h4> -TEST PICKER- </h4>
      colorVal = {{ colorVal }}
      <div 
        :style="handleStyle()"
       class="pickr"
        ></div>
      <input type="text" class="pickr">
    </div> -->

    testColor1 = {{ testColor1 }}
    <color-picker
      ref="color1"
      :modelValue="testColor1"
      @update:modelValue="newColor => testColor1 = newColor"
      :def-color="'RED'"
      @oColor="outputColor"
      />
    <color-picker :def-color="'ORANGE'" />
    <color-picker :def-color="'PURPLE'" />
    <color-picker :def-color="'BLUE'" />
    <color-picker :def-color="'GREEN'" />

    <!-- <test-model
      :modelValue="testColor1"
      @update:modelValue="newColor => testColor1 = newColor">
    </test-model> -->
  </div>
</template>

<script>
import colorPicker from '@/components/ColorPicker.vue'
import testModel from '@/components/TestModel.vue'

export default {
  name: 'TestView',
  data () {
    return {
      testColor1: '#ff0033',
      testColor2: '#007755',
    }
  },
  components: { colorPicker, testModel },
  computed: {},
  mounted () {
    // this.get()
  },
  methods: {
    get () {
      console.log(' this.$refs.color1.value = ', this.$refs.color1.value, this.$refs.color1.colorVal)
    },
    outputColor (colorVal) {
      console.log('outputColor', colorVal)
    }
  }
}
</script>

<style lang="scss">
</style>
