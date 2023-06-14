<template>
  <div>
    this.modelValue = {{ modelValue }}
    this.value = {{ value }}
    <input v-model="value" />
  </div>
</template>

<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        console.log('get')
        return this.modelValue
      },
      set(value) {
        console.log('set', value)
        this.$emit('update:modelValue', value)
      }
    }
  },
  created () {
    console.log('value', this.value)
    console.log('modelValue', this.modelValue)
  },
  mounted () {
    console.log('modelValue', this.value)
  }
}
</script>
