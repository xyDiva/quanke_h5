import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
    msg: {}
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    },
    setMsg (state, msg) {
      state.msg = msg;
    }
  },
  actions: {
    setUser(context,user){
      context.commit('setUser',user);
    },
    setMsg(context, msg){
      context.commit('setMsg', msg);
    }
  }
});

module.exports = store;
