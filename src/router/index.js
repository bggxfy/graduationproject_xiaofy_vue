import Vue from 'vue'
import Router from 'vue-router'

import Homepage from "../views/Homepage";
import Login from '../views/Login'
import Register from "../views/Register";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      name:'Index',
      redirect:{name:"Homepage"}
    },
    {
      path:'/homepage',
      name:'Homepage',
      component:Homepage
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
  ]
})
