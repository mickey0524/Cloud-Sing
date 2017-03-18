import Vue from 'vue'
import App from './components/App.vue'
import router from './router/index'
import store from './store/index'
import VueResource from 'vue-resource' 

Vue.use(VueResource);

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
