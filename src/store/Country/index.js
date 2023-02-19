const axios = require('axios');

export default {
  state: {
    countries: null,
    state: null,
    city: null
  },
  getters: {
    getCountries(state) {
      return state.countries;
    },
    getState(state) {
      return state.state;
    },
    getCities(state) {
      return state.city;
    }
  },
  actions: {
    async getCountries({ commit }) {
      return await axios
        .get(`https://api.countrystatecity.in/v1/countries`, {
          headers: {
            'X-CSCAPI-KEY':
              'RzdRMThieHRNU1Jvd0NhNGlLdnI5TjZDbzhaTDRsTnpVRWpJWEFoUw=='
          }
        })
        .then(function (response) {
          commit('setCountries', response.data);
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    async getStateByCountry({ commit }, payload) {
      return await axios
        .get(`https://api.countrystatecity.in/v1/countries/${payload}/states`, {
          headers: {
            'X-CSCAPI-KEY':
              'RzdRMThieHRNU1Jvd0NhNGlLdnI5TjZDbzhaTDRsTnpVRWpJWEFoUw=='
          }
        })
        .then(function (response) {
          commit('setStateByCountry', response.data);
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    async getCitiesByState({ commit }, payload) {
      return await axios
        .get(
          `https://api.countrystatecity.in/v1/countries/${payload.country}/states/${payload.state}/cities`,
          {
            headers: {
              'X-CSCAPI-KEY':
                'RzdRMThieHRNU1Jvd0NhNGlLdnI5TjZDbzhaTDRsTnpVRWpJWEFoUw=='
            }
          }
        )
        .then(function (response) {
          commit('setCitiesByState', response.data);
          return response;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  },
  mutations: {
    setCountries(state, response) {
      state.countries = response;
    },
    setStateByCountry(state, response) {
      state.state = response;
    },
    setCitiesByState(state, response) {
      state.city = response;
    }
  }
};
