import Vue from 'vue'
import Router from 'vue-router'
import Address from '@/components/address'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Address',
      component: Address
    }
  ]
})
