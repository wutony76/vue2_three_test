import Layout from '@/layout/layout.vue'

const micro = [
  {
    path: '/micro',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'micro',
        component: () => import('views/micro/index') 
      },
    ]
  },
  {
    path: '/micro/*',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import('views/micro/index')
      },
    ]
  },
] 

export default micro