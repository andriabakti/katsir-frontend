import Vue from "vue"
// package: vue-final-modal
import { vfmPlugin } from "vue-final-modal"
// package: vue-toastification
import Toast from "vue-toastification"
// router: base
import router from "@/routers"
// store: base
import store from "@/stores"
// base: app
import App from "@/App.vue"
// style: bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
// style: vue-toastification
import "vue-toastification/dist/index.css"

Vue.config.productionTip = false

Vue.use(vfmPlugin)
Vue.use(Toast)

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount("#app")
