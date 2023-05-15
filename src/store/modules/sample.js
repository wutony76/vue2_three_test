import global from "./global"
import http from "../../core/http"

const state = {
  v1: -1,
  v2: -1,
  numbers:[1, 2, 3]
}
const getters = {
  sortedNumbers: (state) => {
    // console.log("--store sortedNumbers")
    return state.numbers.sort((a, b) => a - b)
  },
  stringifyObj: (state) => {
    // console.log("--store stringData")
    return JSON.stringify(state.numbers)
  }
}
const actions = {
  returnTotal(context) {
    // console.log('test.get.global >>', global, global.state.userInfo.id)
    context.dispatch('addNumber', 1000)
    // console.log('ttttt returnTotal >>', context)
    let sum = 0
    context.state.numbers.forEach((v) => {
      sum += v
    })
    // console.log('ttttt sum >>', sum)
  },
  addNumber(context, number) {
    context.commit("ADD_NUMBER", number)
  }, 
}
const mutations = {
  SET_V1(state, payload) {
    state.v1 = payload
  },
  SET_V2(state, payload) {
    state.v2 = payload
  },
  ADD_NUMBER(state, payload) {
    state.numbers.push(payload)
  } 
}

export default {
  state,
  getters, 
  actions,
  mutations,
}
