// import store from 'store'

/**
 * 1. resolve {Function} -接受一个参数下面匹配文件的相对路径
   2. keys {Function} -返回匹配成功模块的名字组成的数组
   3. id {String} -执行环境的id,返回的是一个字符串,主要用在module.hot.accept,应该是热加载?
 * 
 */
const modules = require.context('./modules', false, /\.js$/ )
// console.log('modules >', modules.keys())
const modulesRoutes = modules.keys().reduce((rt, k) => {
  const name = k.slice(2, -3)
  // console.log('rt >', rt)
  // console.log('k >', k)
  // console.log('name >', name)
  const module = modules(k).default
  // console.log('module >', module)
  rt = rt.concat(module)
  return rt
}, []).sort((a, b) => a.sort - b.sort)
export default modulesRoutes 
