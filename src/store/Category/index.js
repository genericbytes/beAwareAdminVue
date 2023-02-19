const axios = require('axios');

export default {
  state: {
    categories: null,
    category: null,
    requestedCategories: []
  },
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getCategoryById(state) {
      return state.category;
    },
    getRequestCategories(state) {
      return state.requestedCategories;
    }
  },
  actions: {
    async getCategories({ commit }) {
      return await axios
        .get(`${process.env.VUE_APP_SERVERSIDE_URL}api/Category`)
        .then(function (response) {
          if (response.data.status) {
            commit('setCategories', response.data);
          }
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async getRequestCategories({ commit }) {
      return await axios
        .get(
          `${process.env.VUE_APP_SERVERSIDE_URL}api/Category/GetRequestedCategories`
        )
        .then(function (response) {
          if (response.data.status) {
            commit('setRequestCategories', response.data);
          }
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async getCategoryById({ commit }, id) {
      return await axios
        .get(`${process.env.VUE_APP_SERVERSIDE_URL}api/Category/${id}`)
        .then(function (response) {
          if (response.data.status) {
            commit('setCategoryById', response.data);
          }
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async approveRequestedCategory({ commit }, id) {
      return await axios
        .post(
          `${process.env.VUE_APP_SERVERSIDE_URL}api/Category/ApproveRequestedCategory?id=${id}`
        )
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async addCategory({ commit }, payload) {
      return await axios
        .post(`${process.env.VUE_APP_SERVERSIDE_URL}api/Category`, payload)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async editCategory({ commit }, payload) {
      return await axios
        .put(`${process.env.VUE_APP_SERVERSIDE_URL}api/Category`, payload)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async delCategory({ commit }, id) {
      return await axios
        .delete(`${process.env.VUE_APP_SERVERSIDE_URL}api/Category/${id}`)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  },
  mutations: {
    setCategories(state, response) {
      state.categories = response.data;
    },
    setCategoryById(state, response) {
      state.category = response.data;
    },
    setRequestCategories(state, response) {
      state.requestedCategories = response.data;
    }
  }
};
