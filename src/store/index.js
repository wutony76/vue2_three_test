
/**
 * @copyright Steven
 * @description 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突，请勿修改。
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})
const store = new Vuex.Store({
  modules
})
export default store


// sample
// export default new Vuex.Store({
//   state: {
//     numbers: [1, 3, 5, 7, 9]
//   },
//   getters: {
//     sortedNumbers: (state) => {
//       console.log("--store sortedNumbers")
//       return state.numbers.sort((a, b) => a - b) 
//     },
//     stringifyObj: (state) => {
//       console.log("--store stringData")
//       return JSON.stringify(state.numbers)
//     }
//   },
//   mutations: {
//     ADD_NUMBER(state, payload) {
//       state.numbers.push(payload)
//     }
//   },
//   actions: {
//     addNumber(context, number) {
//       context.commit("ADD_NUMBER", number)
//     }
//   },
//   modules: {},
// });
