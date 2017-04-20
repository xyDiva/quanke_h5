import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
    msg: {},
    indexScrollTop:0,
    searchScrollTop:0,
    seckillScrollTop:0,

    isSelect:false
  },
  getters:{
    isSelect:state=>state.isSelect
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    },
    setMsg (state, msg) {
      state.msg = msg;
    },
    setIndexScrollTop (state, indexScrollTop) {
      state.indexScrollTop = indexScrollTop;
    },
    setSearchScrollTop (state, searchScrollTop) {
      state.searchScrollTop = searchScrollTop;
    },
    setSeckillScrollTop (state, seckillScrollTop) {
      state.seckillScrollTop = seckillScrollTop;
    },
    setIsSelect(state,isSelect) {
      state.isSelect = isSelect;
    }
  },
  actions: {
    setUser(context,user){
      context.commit('setUser',user);
    },
    setMsg(context, msg){
      context.commit('setMsg', msg);
    },
    setIndexScrollTop (context, indexScrollTop) {
      context.commit('setIndexScrollTop',indexScrollTop);
    },
    setSearchScrollTop (context, searchScrollTop) {
      context.commit('setSearchScrollTop',searchScrollTop);
    },
    setSeckillScrollTop (context, seckillScrollTop) {
      context.commit('setSeckillScrollTop',seckillScrollTop);
    },
    setIsSelect (context,isSelect) {
      context.commit('setIsSelect',isSelect);
    }
  }
});

module.exports = store;
