import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadingType: 0,

    isAuthen: false,
    isLogOut: false,
    gender: "",
    role: ""
  },
  mutations: {
    setLoadingType(state, type) {
      state.loadingType = type;
    }
  }
});
