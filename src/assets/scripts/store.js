import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
    msg: {},
    indexScrollTop:0
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    },
    setMsg (state, msg) {
      state.msg = msg;
    },
    setIndexScrollTop (state,scrollTop) {
      state.indexScrollTop = scrollTop;
    }
  },
  actions: {
    setUser(context,user){
      context.commit('setUser',user);
    },
    setMsg(context, msg){
      context.commit('setMsg', msg);
    },
    setIndexScrollTop(context,scrollTop){
      context.commit('setIndexScrollTop',scrollTop);
    }
  }
});

module.exports = store;
