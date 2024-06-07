import {createRouter, createWebHistory} from 'vue-router'
import List from './views/list'
import Edit from './views/edit'
import Layout from '@/layout'


export default createRouter({
  history: createWebHistory('/b/'),
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
        },
        {
          name: 'edit',
          path: 'edit',
          component: Edit
        }
      ]
    }
  ]
})