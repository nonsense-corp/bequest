import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
      loggedIn: false,
      user: {},
    },
    mutations: {
      changeLoggedIn (state, isLoggedIn) {
        state.loggedIn = isLoggedIn
      },
      setUserDetails (state, user) {
        state.user = user;
      },
      logout (state) {
        state.user = {};
        state.isLoggedIn = false;
        localStorage.clear();
      }
    }
})
  
