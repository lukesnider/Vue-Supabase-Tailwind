import { createStore } from 'vuex'
export default createStore({
  state: {
    user: false,
    profile: false,
  },
  mutations: {
    SetState(state,payload) {
      state[payload.key] = payload.value
    },
  },
  actions: {
    Logout({state}) {
      state.user = false
      state.profile = false
    },
  },
  getters: {
    isAuthenticated: (state) => {
      return (!!state.user);
    }
  },
  modules: {
  }
})
