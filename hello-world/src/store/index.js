import Vue from "vue"
import Vuex from "vuex"
import { usersCollection } from "../firebaseConfig"

//import * as actions from "./actions"
//import * as mutations from "./mutations"
import * as getters from "./getters"

Vue.use(Vuex)

export const store = {
    state: {
        currentUser: null,
        userProfile: {
          name: "",
          role: "",
        }
      },
  getters,
  mutations: {
    setUser (state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    }
  },
  actions: {
    fetchUserProfile({ commit, state }) {
      usersCollection.doc(state.currentUser.uid).get().then(doc => {
          commit('setUserProfile', doc.data());
      }).catch(err => {
          console.log(err);
      })
    },
  }
}

export default new Vuex.Store(store)
