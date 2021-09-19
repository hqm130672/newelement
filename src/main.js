import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.use(ElementUI)

axios.defaults.baseURL = `http://timemeetyou.com:8889/api/private/v1/`

axios.interceptors.request.use(config => {
  // Do something before request is sent


  const token = window.sessionStorage.getItem('token')
  config.headers.Authorization = token
  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
