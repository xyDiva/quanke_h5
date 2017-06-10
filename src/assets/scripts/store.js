import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},                             // 用户信息
    msg: {},                              // 查看信息详情
    indexScrollTop: 0,                    // 记录首页列表位置
    searchScrollTop: 0,                   // 记录查询页列表位置
    seckillScrollTop: 0,                  // 记录秒杀页列表位置

    isSelect: false,                      // 选择地址页面

    channel:{}                            // 查看频道列表
  },
  getters: {
    user: state => state.user,
    isSelect: state => state.isSelect
  },
  mutations: {
    setUser(state, user){
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
    setIsSelect(state, isSelect) {
      state.isSelect = isSelect;
    },
    setChannel(state,channel) {
      "use strict";
      state.channel = channel;
    }
  },
  actions: {
    setUser(context, user){
      context.commit('setUser', user);
    },
    setMsg(context, msg){
      context.commit('setMsg', msg);
    },
    setIndexScrollTop (context, indexScrollTop) {
      context.commit('setIndexScrollTop', indexScrollTop);
    },
    setSearchScrollTop (context, searchScrollTop) {
      context.commit('setSearchScrollTop', searchScrollTop);
    },
    setSeckillScrollTop (context, seckillScrollTop) {
      context.commit('setSeckillScrollTop', seckillScrollTop);
    },
    setIsSelect (context, isSelect) {
      context.commit('setIsSelect', isSelect);
    },
    setChannel(context, channel) {
      context.commit('setChannel', channel);
    }
  }
});

module.exports = store;
