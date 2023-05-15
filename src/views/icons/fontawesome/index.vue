<template>
  <section class="results-icons">
    <el-tabs v-model='activeName' @tab-click='handleClick' type='card'>
      <el-tab-pane v-for='category in categories' :label='category.label' :name='category.label'
                   :key='category.name'></el-tab-pane>
    </el-tabs>
    <div class='grid'>
      <div v-for="(result,index) in results" :key="index" @click='handleClipboard(handleText(result),$event)'>
        <el-tooltip placement="top">
          <div slot="content">
            {{ generateIconCode(result) }}
          </div>
          <div class="icon-item">
            <i :class="[switchTag(result.c1),result.c2]" />
            <span>{{ result.tag }}</span>
          </div>
        </el-tooltip>
      </div>
    </div>
  </section>
</template>
<script>
import icons from './icons.json'
import categories from './categories.json'
// import clipboard from 'utils/clipboard'

export default {
  name: 'Index',
  props: {},
  data () {
    return {
      results: [],
      iconsObject: {},
      activeName: null,
      categories: [],
      icons: [],
      currentItem: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    generateIconCode (item) {
      const text = [this.switchTag(item.c1), item.c2]
      return `<i class="${text.join(' ')}" />`
    },
    handleText (item) {
      const text = [this.switchTag(item.c1), item.c2]
      return text.join(' ')
    },
    handleClipboard (text, event) {
      // clipboard(text, event)
    },
    switchTag (v) {
      const byStyle = {
        solid: 'fas',
        regular: 'far',
        light: 'fal',
        duotone: 'fad',
        brands: 'fab'
      }
      return byStyle[v]
    },
    handleClick (item) {
      console.log(item)
      this.currentItem = this.categories.find(m => m.label === item.name)
      console.log('currentItem==>', this.currentItem)
      this.results = this.icons.filter(m => this.currentItem.icons.includes(m.tag))
    },
    init () {
      this.iconsObject = Object.assign({}, icons)
      console.log('iconsObject==>', this.iconsObject)
      for (const pop in this.iconsObject) {
        this.iconsObject[pop].styles.forEach(m => {
          const obj = {
            tag: pop,
            c1: m,
            c2: `fa-${pop}`,
            key: `m fa-${pop}`
          }
          this.icons.push(obj)
        })
      }
      console.log('icons==>', this.icons)
      this.results = this.icons.filter(m => this.currentItem.icons.includes(m.tag))
    },
    initCategories () {
      for (const pop in categories) {
        const obj = {
          name: pop,
          icons: categories[pop].icons,
          label: categories[pop].label,
          'z-label': categories[pop]['z-label']
        }
        this.categories.push(obj)
      }
      console.log('categories', this.categories)
      this.activeName = this.categories[0].label
      this.currentItem = this.categories[0]
    }
  },
  created () {
    this.initCategories()
    this.init()
  },
  beforeCreate () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  activated () {},
  deactivated () {},
  beforeDestroy () {},
  destroyed () {},
  filters: {}
}
</script>

<style lang='scss' scoped>
.grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;

    span {
      display: block;
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
</style>
