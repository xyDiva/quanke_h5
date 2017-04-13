import Vue from 'vue'
import {Promise} from 'es6-promise'


let HOST_URL = window.location.protocol + '//' + window.location.host + '/ar/';

let api = {};

api.host = HOST_URL;

// user
api.user = {
  // 获取验证码 todo 微信登录不再使用这个接口
  getCode: tel => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'user/sendMessage?tel=' + tel).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  // 登录/自动注册 todo 微信登录不再使用这个接口
  login: (tel, code) => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'user/login?tel=' + tel + '&verifyCode=' + code).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  // 登出 todo 微信登录不再使用这个接口
  logout: () => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'user/logout').then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),

  // 获取用户信息
  getUserInfo: () => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'user/my').then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  // 编辑用户信息
  editUserInfo: (user) => new Promise((resolve, reject) => {
    Vue.http.post(HOST_URL + 'user/edit', user).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  // 获取验证码
  getCodeForBind: tel => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'user/sendMessageForBound?tel=' + tel).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  // 绑定手机号
  bindTel:(params)=>new Promise((resolve,reject)=>{
    Vue.http.get(HOST_URL+'user/boundTel',params).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  // 绑定邀请码
  bindInviteCode:(code)=>new Promise((resolve,reject)=>{
    Vue.http.get(HOST_URL+'user/boundRecommendCode?recomCode='+code).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
};

// notify
api.notify = {
  query: () => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'notify/query/notified').then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
};

// goods
api.goods = {
  query: (params) => new Promise((resolve, reject) => {
    Vue.http.post(HOST_URL + 'goods/query', params).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  getById: (id) => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'goods/' + id).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  getGoodImgs: (id) => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'goods/detail/' + id).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  })
};

// banner
api.banner = {
  query: () => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'banner/query').then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  getImg: (fileName) => HOST_URL + 'banner/pic?fileName=' + fileName
};

// wx
api.wx = {
  getWXParams:(url)=>new Promise((resolve,reject)=>{
    Vue.http.get(HOST_URL + 'wx/wxEncodeconfig?url=' + url).then((r)=>{
      resolve(r.body);
    },(r)=>{
      reject(r.body);
    });
  })
};

// 省市区列表
api.address = {
  listDistrict: (parentId)=>new Promise((resolve, reject)=> {
    Vue.http.get(HOST_URL + 'address/listDistrict?parentId=' + parentId).then((r)=> {
      resolve(r.body);
    }, (r)=> {
      reject(r.body);
    });
  })
};

// 返利
api.rebate = {
  query: (params) => new Promise((resolve, reject) => {
    Vue.http.post(HOST_URL + 'rebate/query',params).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
};

module.exports = api;
