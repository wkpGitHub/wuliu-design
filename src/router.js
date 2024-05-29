import {createRouter, createWebHistory} from 'vue-router'
import List from './views/list'
import Layout from '@/layout'


export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/list',
      children: [
        {
          name: 'list',
          path: 'list',
          component: List
        }
      ]
    }
  ]
})