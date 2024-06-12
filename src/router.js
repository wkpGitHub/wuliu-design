import { createRouter, createWebHistory } from 'vue-router'
import List from './views/list'
import Edit from './views/edit'
import Layout from '@/views/layout'
import menuList from '@/views/layout/menuList'

const childrenList = []
menuList.forEach(menu => {
  menu.children.forEach(c => {
    c.children.forEach(page => {
      childrenList.push(page)
    })
  })
})


const router = createRouter({
  history: createWebHistory('/b/'),
  routes: [
    {
      path: '/',
      component: Layout,
      name: 'layout',
      children: [
        {
          path: 'edit',
          name: '编辑',
          component: Edit
        },
        {
          path: 'detail',
          name: '详情',
          component: () => import('./views/detail')
        },
        {
          path: 'detail2',
          name: '详情2',
          component: () => import('./views/detail2')
        }
      ]
    }
  ]
})
const loadMenu = ['/edit', '/detail', '/detail2']
router.beforeEach((to, from, next) => {
  if (loadMenu.includes(to.path)) {
    next()
  } else {
    const currentPage = childrenList.find(page => '/' + page.path === to.path)
    router.addRoute('layout', {
      ...currentPage,
      component: List
    })
    loadMenu.push(to.path)
    next({ ...to })
  }
})

export default router