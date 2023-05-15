// micro/index.js
import { registerMicroApps, start, addGlobalUncaughtErrorHandler  } from 'qiankun'
import apps from './app'
// 主应用中注册微应用
registerMicroApps(apps, {
  beforeLoad: (app) => {
    console.log('ttttt before load', app)
  },
  afterMount: (app) => {
    console.log('ttttt after mount', app)
  },
})
addGlobalUncaughtErrorHandler((event) => {
  console.error("addGlobalUncaughtErrorHandler");
  console.error(event);
  const { message: msg } = event
  if (msg && msg.includes("died in status LOADING_SOURCE_CODE")) {
    console.error("微应用加载失败，请检查应用是否可运行");
  }
  console.log('micro run ...  msg=', msg )
});
console.log('micro run' )

// 导出启动函数
export default start
