import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
      loggedIn: false,
      user: {
        first_name: '',
        last_name: '',
        email: ''
      },
    },
    mutations: {
      changeLoggedIn (state, isLoggedIn) {
        state.loggedIn = isLoggedIn
      },
      setUserDetails (state, user) {
        // Always remove token from user object
        const clean_user_data = Object.assign({}, user);
        delete clean_user_data['token']
        state.user = clean_user_data.user;
      },
      logout (state) {
        state.user = {};
        state.isLoggedIn = false;
        localStorage.clear();
      }
    }
})
  
