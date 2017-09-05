import Vue from "vue";
import {Promise} from "es6-promise";

import axios from 'axios'
import {Toast} from 'mint-ui'

let mode = null; // 0 dev 1 test 2 pro
let HOST_URL = window.location.protocol + '//' + window.location.host + '/';
if (location.host == 'qk.notepasses.com') {
  mode = 2;
}
else if (location.host == 'qktest.notepasses.com') {
  mode = 1;
}
else if (location.host == 'localhost:1201') {
  mode = 0;
}

let api = {};

api.host = HOST_URL;
api.mode = mode;

axios.defaults.baseURL = api.host;

//添加请求拦截器
axios.interceptors.request.use(function (config) {
  //在发送请求之前做某事
  return config;
}, function (error) {
  //请求错误时做些事
  return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function (response) {
  //对响应数据做些事
  return response.data;
}, function (error) {
  //请求错误时做些事

  const res = error.response;
  let errorText = '';
  switch (res.status) {
    case 404:
      errorText = 'API "' + res.data.path + '" ' + res.statusText;
      break;
  }
  Toast(errorText);

  return Promise.reject(error);
});


// user
api.user = {
  // 获取验证码 todo 微信登录不需要使用这个接口
  getCode: tel => axios.get('user/sendMessage', {params: {tel: tel}}),

  // 登录/自动注册 todo 微信登录不再使用这个接口
  login: (tel, code) => axios.get('user/login', {params: {tel: tel, verifyCode: code}}),

  // 登出 todo 微信登录不再使用这个接口
  logout: () => axios.get('user/logout'),

  // 获取用户信息
  getUserInfo: () => axios.get('user/my'),

  // 编辑用户信息
  editUserInfo: user => axios.post('user/edit', user),

  // 获取用户信息--分享
  getUserInfoForShare: userId => axios.get('user/shareInfo', {params: {userId: userId}}),

  // 获取验证码
  getCodeForBind: tel => axios.get('user/sendMessageForBound', {params: {tel: tel}}),

  // 绑定手机号
  bindTel: (params) => axios.get('user/boundTel', {params: params}),

  // 绑定邀请码
  bindInviteCode: (code) => axios.get('user/boundRecommendCode', {params: {recomCode: code}}),

  // 获取用户账户流水
  getAccountLog: () => axios.get('user/accountLog'),

  // 每日收益、每日推荐商品
  touch: params => axios.post('user/touch', params),
};

// notify
api.notify = {
  query: () => axios.get('notify/query/notified'),
  save: id => axios.get('user/notify/read', {params: {notifyId: id}})
};

// goods
api.goods = {
  query: (params) => axios.post('goods/query', params),
  getById: (id) => axios.get('goods/' + id),
  getGoodImgs: (id) => axios.get('goods/detail/' + id),
  queryRecommend: () => axios.get('goods/recommend')
};

// banner
api.banner = {
  query: () => axios.get('banner/query'),

  getImg: (fileName) => api.host + 'banner/pic?fileName=' + fileName,
  upload: (formdata) => axios.post('banner/upload', formdata)
};

// wx
api.wx = {
  getWXParams: url => axios.get('wx/wxEncodeconfig', {params: {url: url}}),
  image: (id) => {
    return HOST_URL + 'cgi-bin/showqrcode?ticket=' + id;
  }
};

// 省市区列表
api.address = {
  listDistrict: parentId => axios.get('address/listDistrict', {params: {parentId: parentId}}),
  save: params => axios.post('address/save', params),
  getAddress: userId => axios.get('address/getByUserId', {params: {userId: userId}})
};

// 晒单返利
api.rebate = {
  query: params => axios.get('rebate', {params: params}),
  save: params => axios.post('rebate/save/new', params)
};

// 提现
api.withdraw = {
  save: params => axios.post('withdraw/save', params),
};

// channel 发现
api.channel = {
  query: () => axios.get('channel/query')
};

// money controller
api.money = {
  summery: () => axios.get('authed/money/summary'),
  queryLogs: (type, params) => (() => {
    let url = '';
    if (type === 'deposit') {
      url = HOST_URL + 'authed/deposit/log';
    }
    else if (type === 'money') {
      url = HOST_URL + 'authed/account/log';
    }
    return axios.get(url, {params: params})
  })()
};

// 通用upload
api.file = {
  upload: (file) => axios.post('upload', file),
  uploadBase64: base64url => axios.post('upload/base64', base64url),
  image: (id) => {
    return HOST_URL + 'image/' + id;
  }
};

module.exports = api;
