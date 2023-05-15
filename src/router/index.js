import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout2 from '@/layout/layout2.vue'
import JumpHomeView from '@/views/JumpHomePage.vue'
import vGoods from 'views/goods'
import vAbout from 'views/about'
import vIcons from 'views/icons'
import modulesRoutes from './routes'

Vue.use(VueRouter)
const baseRoutes = [
  {
    path: '/',
    name: 'home',
    redirect: 'home',
    component: Layout2,
    children: [
      {
        path: 'home',
        name: 'home',
        component: JumpHomeView
      },
      {
        path: 'icons',
        name: 'Icons',
        component: vIcons,
        meta: { title: '图标库', icon: 'fas fa-icons', noCache: true }
      },
      {
        path: 'about',
        name: 'about',
        component: vAbout
      },
      {
        path: 'goods',
        name: 'goods',
        component: vGoods
      },
    ]
  }
]

// console.log('start modulesRoutes.')
const addressRoutes = [] 
modulesRoutes.forEach((route) => {
  const routerDict = Object.assign({}, route)
  // console.log('r objs >>> ', routerDict)
  addressRoutes.push(routerDict) 
}) 
// console.log('ttt addressRoutes >>> ', addressRoutes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: baseRoutes.concat(addressRoutes)
})

router.beforeEach((to, from, next) => {
  console.log('to.matched.length > ', to.matched.length)
  if (!to.matched.length) {
    //沒有對應到設定的路由，回重新導向404
    next("/404");
  } else {
    //有對應到設定的路由，繼續執行
    next();
  }
})

export default router
