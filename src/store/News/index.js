const axios = require('axios');

export default {
  state: {
    news: [],
    newsById: null,
    reportedNews: []
  },
  getters: {
    getAllNews(state) {
      return state.news;
    },
    getNewsById(state) {
      return state.newsById;
    },
    getReportedNews(state) {
      return state.reportedNews;
    }
  },
  mutations: {
    setAllNews(state, response) {
      state.news = response;
    },
    setNewsById(state, response) {
      state.newsById = response;
    },
    setReportedNews(state, response) {
      state.reportedNews = response;
    }
  },
  actions: {
    async getAllNews({ commit }) {
      await axios
        .get(`${process.env.VUE_APP_SERVERSIDE_URL}api/News`)
        .then(function (response) {
          if (response.data.status) {
            commit('setAllNews', response.data.data);
          }
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getReportedNews({ commit }) {
      await axios
        .get(`${process.env.VUE_APP_SERVERSIDE_URL}api/News/GetReportedNews`)
        .then(function (response) {
          if (response.data.status) {
            commit('setReportedNews', response.data.data);
          }
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getNewsById({ commit }, id) {
      await axios
        .get(`${process.env.VUE_APP_SERVERSIDE_URL}api/News/${id}`)
        .then(function (response) {
          if (response.data.status) {
            commit('setNewsById', response.data.data);
          }
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async editNews({ commit }, payload) {
      return await axios
        .put(`${process.env.VUE_APP_SERVERSIDE_URL}api/News`, payload)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async delNews({ commit }, payload) {
      return await axios
        .delete(`${process.env.VUE_APP_SERVERSIDE_URL}api/News/${payload}`)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }
};
