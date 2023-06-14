<template>
  <div ref="colorPicker" :style="handleStyle()" :class="className">
  <!-- modelValue = {{ modelValue }}
  value = {{ value }} -->
  </div> 
</template>

<script>
  // One of the following themes
import '@simonwep/pickr/dist/themes/classic.min.css';   // 'classic' theme
import '@simonwep/pickr/dist/themes/monolith.min.css';  // 'monolith' theme
import '@simonwep/pickr/dist/themes/nano.min.css';      // 'nano' theme

// Modern or es5 bundle (pay attention to the note below!)
import Pickr from '@simonwep/pickr';

export default {
  name: 'ColorPicker',
  props: {
    modelValue: { default: null },
    defColor: { default: null } 
  },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  data () {
    return {
      className: 'defaultPicker',
      colorVal: '#ffffff'
    }
  },
  created () {
    // console.log('this.modelValue', this.modelValue)
    let _defColor = null 
    if (this.modelValue !== null) _defColor = this.modelValue
    if (this.defColor !== null) _defColor = this.defColor
    if (_defColor !== null) {
      switch (_defColor) {
        case 'RED':
        case 'Red':
        case 'red':
          _defColor = '#FF0848'
          break
        case 'ORANGE':
        case 'Orange':
        case 'orange':
          _defColor = '#FF7000'
          break
        case 'PURPLE':
        case 'Purple':
        case 'purple':
          _defColor = '#7313E8'
          break
        case 'BLUE':
        case 'Blue':
        case 'blue':
          _defColor = '#0880FF'
          break
        case 'GREEN':
        case 'Green':
        case 'green':
          _defColor = '#07F58D'
          break
      }
      // console.log('_defColor', _defColor)
      this.colorVal = _defColor
      this.syncColorVal()
    } 
  },
  mounted () {
    // console.log('_uuid', this._uuid())
    this.init()
  },
  methods: {
    syncColorVal () {
      this.$emit('update:modelValue', this.colorVal)
    },
    handleStyle() {
      const _num = '20px'
      // const _color = '#fff'
      const _color = this.colorVal
      return {
        width: _num,
        height: _num,
        border: '1px solid #000',
        'background': _color,
      }
    },
    init() {
      this.className = this._uuid()
      // console.log('colorPicker', this.$refs.colorPicker)

      const inputElement = this.$refs.colorPicker
      // const inputElement = document.querySelector('.picker')
      const pickr = new Pickr({
        el: inputElement,
        useAsButton: true,
        default: '#42445A',
        theme: 'classic',

        swatches: [
          'rgba(244, 67, 54, 1)',
          'rgba(233, 30, 99, 0.95)',
          'rgba(156, 39, 176, 0.9)',
          'rgba(103, 58, 183, 0.85)',
          'rgba(63, 81, 181, 0.8)',
          'rgba(33, 150, 243, 0.75)',
          'rgba(3, 169, 244, 0.7)',
          'rgba(0, 188, 212, 0.7)',
          'rgba(0, 150, 136, 0.75)',
          'rgba(76, 175, 80, 0.8)',
          'rgba(139, 195, 74, 0.85)',
          'rgba(205, 220, 57, 0.9)',
          'rgba(255, 235, 59, 0.95)',
          'rgba(255, 193, 7, 1)'
        ],

        components: {
          preview: true,
          opacity: true,
          hue: true,

          interaction: {
            hex: true,
            rgba: true,
            hsva: true,
            input: true,
            save: true
          }
        }
      }).on('init', pickr => {
        // inputElement.value = pickr.getSelectedColor().toRGBA().toString(0);
        inputElement.value = pickr.getSelectedColor().toHEXA().toString(0);

      }).on('change', color => {
        this.colorVal = color.toHEXA().toString(0)
        inputElement.value = color.toHEXA().toString(0)
        this.$emit('oColor', this.colorVal)
        this.syncColorVal()

      }).on('save', color => {
        // inputElement.value = color.toRGBA().toString(0);
        this.colorVal = color.toHEXA().toString(0)
        inputElement.value = color.toHEXA().toString(0);
        this.syncColorVal()

        // arr [r,g,b,a]. no alpha
        const colorArr = color.toRGBA().map((c) => { return Math.round(c).toString(16).padStart(2, '0') }).slice(0, 3).join('')
        pickr.hide();
      })
    },
    _uuid () {
      var d = Date.now()
      if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now() // use high-precision timer if available
      }
      return 'colorpicker-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
    }
  }
}
</script>

