<template>
  <div class="about">
    <h1>This is about page</h1>

    <div>
      <h5> store </h5>
      state.numbers = {{ $store.state.sample.numbers }} <br/>
    </div>

    <div>
      <h5> ...mapState </h5>
      this.nums = {{ storeNumbers }}  - ({{ storeNumbersCount }}) <br/>
    </div>

    <div>
      <h5> ...mapGetters </h5>
      storeStringifyOby = {{ storeStringifyOby }}  - {{ typeof storeStringifyOby }}<br/>
    </div>

    <div>
      <ul style="text-align: left;">
        <li> <h6> message sample </h6> </li>
        <li> <h6> self message sample </h6> </li>
        <li> <h6> message sample </h6> </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import store from '@/store' 
  // import base from '@/utils/base'
  import { API } from '@/core/http'

  export default {
    name: 'About',
    data() {
      return {
        dialogVisible: false,
      };
    },
    computed: {
      ...mapState({
        storeNumbers: state => state.sample.numbers, 
        storeNumbersCount : (state) => {
          return state.sample.numbers.length 
        } 
      }),
      ...mapGetters({
        storeSorted: "sample/sortedNumbers",
        storeStringifyOby: "sample/stringifyObj",
      }),
    },
    mounted () {
      /**
       *  // base.self = this
       *  console.log('about base', base.self.$msg('apple'))
       */
      /**
      // store sample
      if (this.$store) {
        console.log('this > ', this.$store)
        const store1 = this.$store.state.sample.numbers
        // const store1 = this.$store.state.numbers
        this.$store.dispatch('sample/addNumber', 99) // this.$store.dispatch('某action')
        this.$store.commit('sample/ADD_NUMBER', 103) // this.$store.commit('某mutation')
        const store4 = this.$store.getters['sample/sortedNumbers']
        // const store4 = this.$store.getters.sortedNumbers

        console.log('store1 > ', store1)
        console.log('store4 > ', store4)
      }
      */

      // store sample
      this.startAdd()
      this.init()
    },

    methods: {
      ...mapActions({
        storeAddNumber: "sample/addNumber",
        returnTotal: "sample/returnTotal",
      }),
      init () {

        // this.$message({
        //   showClose: false,
        //   message:'test',
        //   type:'error',
        //   duration:'2300',
        // })

        this.$msg('123321')

        setTimeout(() => {
          this.$msg('2.test')
        }, 2 * 1000)

        API({test:'api about test...', id: 111}, (res) => {
          // 只要失敗皆是null，已被底層攔截處理
          console.log('api about req >>>', res)
        })
      },
      startAdd () {
        console.log('ttt startAdd')
        this.storeAddNumber(70)
        this.storeAddNumber(78)
        this.storeAddNumber(87)
        this.storeAddNumber(67)
        this.storeAddNumber(88)

        this.returnTotal()
      }
    }
  }
</script>

<style scoped>
  .about {
    color: #7265e6;
  }
</style>
