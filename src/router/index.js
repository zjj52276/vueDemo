import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import specialOptions from '@/components/specialOptions'
import lifeCycle from '@/components/commonLife' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/specialOptions',
      name: 'specialOptions',
      component: specialOptions
    },
    {
      path: '/lifeCycle',
      name: 'lifeCycle',
      component: lifeCycle
    }
  ]
})
