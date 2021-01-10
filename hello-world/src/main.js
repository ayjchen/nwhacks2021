import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue"
import "bootstrap-vue/dist/bootstrap-vue.css"
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(BootstrapVue);

const store = new Vuex.Store({
  state: {
    currentUser: "" 
  },
  mutations: {
    setUser (name) {
      state.currentUser = name
    }
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
