import {createRouter, createWebHistory} from 'vue-router'
import List from './views/list'


export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: List
    }
  ]
})