// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:9000';

//Vue.http.headers.common['x-access-token'] = localStorage.getItem('token')


Vue.http.interceptors.push((req, next) => {
   // var x = localStorage.getItem('token')
  req.headers.set('x-access-token',localStorage.getItem('token')); //Base64
  // console.log(req.headers);
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
