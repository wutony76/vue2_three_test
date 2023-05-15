import UAParser from 'ua-parser-js'

const state = {
  token: null,
  userInfo: {id: 123},
  uaInfo: (function () {
		console.log('ttt navigator.userAgent >', navigator.userAgent)
		const ua = new UAParser(navigator.userAgent)
		return {
			browser: ua.getBrowser(),
			os: ua.getOS(),
			device: ua.getDevice().type == 'mobile' ? 'h5' : 'pc'
		}
	})(),
}
const getters = {
  uaInfo: state => state.uaInfo,
}
const actions = {
}
const mutations = {
}

export default {
  state,
  getters, 
  actions,
  mutations,
}
