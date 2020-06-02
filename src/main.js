import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { API } from "@/router/requests";
Vue.config.productionTip = false;
Vue.prototype.$API = API
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
