const axios = require('axios');

export default {
  state: {
    isAuthenticated: false,
    user: null
  },
  getters: {
    getLoggedInUserData(state) {
      return state.user;
    },
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    }
  },
  mutations: {
    setSignInUserData(state, response) {
      state.user = response;
    },
    setIsAuthenticated(state, response) {
      state.isAuthenticated = response;
    }
  },
  actions: {
    async login({ commit }, payload) {
      await axios
        .post(`${process.env.VUE_APP_SERVERSIDE_URL}api/Account/Login`, payload)
        .then(function (response) {
          if (response.data.status) {
            commit('setIsAuthenticated', true);
            window.localStorage.setItem('isLoggedInAdminBeAware', true);
            window.localStorage.setItem(
              'beAware-Admin-userId',
              response.data.data.id
            );
            commit('setSignInUserData', response.data.data);
          }
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async logout({ commit }) {
      await commit('setIsAuthenticated', false);
      await commit('setSignInUserData', null);
      window.localStorage.removeItem('isLoggedInAdminBeAware');
      window.localStorage.removeItem('beAware-Admin-userId');
    },
    async handleIsAuthenticated({ commit }, payload) {
      commit('setIsAuthenticated', payload);
      return payload;
    }
  }
};
