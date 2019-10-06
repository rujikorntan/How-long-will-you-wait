import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import SelectLoading from "./components/SelectLoading.vue";
import Result from "./components/Result.vue";

Vue.use(Router);
export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/loading",
      component: SelectLoading
    },
    {
      path: "/result",
      component: Result
    }
  ]
});
