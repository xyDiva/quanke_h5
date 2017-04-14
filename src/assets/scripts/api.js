import Vue from 'vue'
import {Promise} from 'es6-promise'


let HOST_URL = window.location.protocol + '//' + window.location.host;
if(location.href.indexOf('/quanke/')>=0){
  HOST_URL += '/ar/';
}
else if(location.href.indexOf('/quankeTest/')>=0){
  HOST_URL += '/tr/';
}

let api = {};

api.host = HOST_URL;

// user
api.user = {
  // 获取验证码
  getCode: tel => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'user/sendMessage?tel=' + tel).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  // 登录/自动注册
  login: (tel, code) => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'user/login?tel=' + tel + '&verifyCode=' + code).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  // 登出
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
  // 获取用户信息--分享
  getUserInfoForShare: (userId) => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'user/shareInfo?userId=' + userId).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  })
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

module.exports = api;
