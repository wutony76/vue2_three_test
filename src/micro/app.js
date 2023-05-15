// micro/app.js，微应用路由注册，注意这里activeRule下的路径配置

// const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);
// const MICRO_FRONTED_DATA_QUERY = '//localhost:9990'

const apps = [
  // {
  //   name: 'micro-fronted-query',
  //   // entry: MICRO_FRONTED_DATA_QUERY,
  //   entry: '//localhost:9990',
  //   container: '#ccc',
  //   activeRule:'/vue' 
  //   //activeRule: getActiveRule('/vue') 
  //   // activeRule: getActiveRule('#/home/micro-fronted-query'),
  // }
  {
    name: 'vue app', // 子应用名称
    entry: '//localhost:9990', // 子应用入口
    container: '#ddd', // 子应用所在容器
    activeRule: '/micro', // 子应用触发规则（路径）
  },
]

console.log('micro app' )
export default apps