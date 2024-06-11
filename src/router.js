import { createRouter, createWebHistory } from 'vue-router'
import List from './views/list'
import Edit from './views/edit'
import Layout from '@/layout'


const router = createRouter({
  history: createWebHistory('/b/'),
  routes: [
    {
      path: '/',
      component: Layout,
      name: 'layout'
    }
  ]
})
const loadMenu = []
router.beforeEach((to, from, next) => {
  if (loadMenu.includes(to.path)) {
    next()
  } else {
    router.addRoute('layout', {
      path: to.path,
      component: List
    })
    loadMenu.push(to.path)
    next({ ...to })
  }
})

export default router