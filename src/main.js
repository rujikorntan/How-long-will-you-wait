import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueFirestore from "vue-firestore";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import { router } from "./router";

Vue.config.productionTip = false;
Vue.use(VueFirestore);
Vue.use(BootstrapVue);
Vue.use(ElementUI, { locale });
Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
