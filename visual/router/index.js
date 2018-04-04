import Vue from 'vue'
import Router from 'vue-router'
import Visual from '../components/visual'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/visual',
      name: 'visual',
      component: Visual,
        meta: {
          title: '茶水时间'
        }
    }
  ]
})
