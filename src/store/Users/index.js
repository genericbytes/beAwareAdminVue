const axios = require('axios');

export default {
  state: {
    users: [],
    blockedUsers: []
  },
  getters: {
    getAllUsers(state) {
      return state.users;
    },
    getAllBlockedUsers(state){
      return state.blockedUsers;
    }
  },
  mutations: {
    setAllUsers(state, response) {
      state.users = response;
    },
    setAllBlockedUsers(state, response) {
      state.blockedUsers = response;
    }
  },
  actions: {
    async getAllUsers({ commit }) {
      await axios
        .get(`${process.env.VUE_APP_SERVERSIDE_URL}api/User`)
        .then(function (response) {
          if (response.data.status) {
            commit('setAllUsers', response.data.data);
          }
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getAllBlockedUsers({ commit }) {
      await axios
        .get(`${process.env.VUE_APP_SERVERSIDE_URL}api/User/GetBlockedUsers`)
        .then(function (response) {
          if (response.data.status) {
            commit('setAllBlockedUsers', response.data.data);
          }
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async BlockUser({ commit }, id) {
      await axios
        .put(`${process.env.VUE_APP_SERVERSIDE_URL}api/User/BlockUser?id=${id}`)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};
