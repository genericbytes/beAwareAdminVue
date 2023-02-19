import Vue from 'vue';
import Vuex from 'vuex';
import Account from './Account';
import User from './Users';
import News from './News';
import Category from './Category';
import Country from './Country';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Account,
    User,
    News,
    Category,
    Country
  }
});
