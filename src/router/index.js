import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const Login = () => import('../views/Login.vue')
const Welcome = () => import('../views/Welcome')
const Users = () => import('../views/Users')
const Roles = () => import('../views/Roles')




Vue.use(VueRouter)

const routes = [

  {
    path: '',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/welcome',
    component: Home,
    children: [{
      path: '/welcome',
      component: Welcome
    },
    {
      path: '/users',
      component: Users
    },
    {
      path: '/roles',
      component: Roles
    }
    ]

  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()

  const token = window.sessionStorage.getItem('token')

  if (!token) return next('/login')



  next()

})
export default router
