
const base= [
  {
    path: '/404',
    name: '404',
    component: () => import('views/base/404') 
  },
  {
    path: '/500',
    name: '500',
    component: () => import('views/base/500') 
  },
] 

export default base