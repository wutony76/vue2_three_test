import Layout from '@/layout/layout.vue'
import pageA from '@/views/page/A'
import pageC from '@/views/page/C'

const page = [
  {
    // children: [
    //   {
    //     path: 'a',
    //     name: 'pageA',
    //     component: pageA 
    //   },
    // ]
    sort: 22,
    component: Layout,
    path: '/pageA',
    children: [
      {
        path: '/',
        name: 'pageA',
        component: pageA 
      },
    ]
  },
  {
    sort: 20,
    component: Layout,
    path: '/pageC',
    children: [
      {
        path: '/',
        name: 'pageC',
        component: pageC 
      },
    ]
  }
] 

export default page 
