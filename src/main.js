import Vue from 'vue'
// packgae: vue-final-modal
import { vfmPlugin } from "vue-final-modal";
// import VModal from 'vue-js-modal'
// module: router
import router from '@/routers'
// module: store
import store from '@/store'
// base: app
import App from '@/App.vue'
// style: bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

Vue.use(vfmPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
