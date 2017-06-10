import Vue from 'vue'
import {Promise} from 'es6-promise'

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
      reject(r);
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
  bindTel: (params) => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'user/boundTel', {params: params}).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  // 绑定邀请码
  bindInviteCode: (code) => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'user/boundRecommendCode?recomCode=' + code).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  // 获取用户账户流水
  getAccountLog: () => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'user/accountLog').then((r) => {
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
  save: (id) => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'user/notify/read?notifyId=' + id).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  })
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
  }),
  queryRecommend: () => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'goods/recommend').then((r) => {
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
  getImg: (fileName) => HOST_URL + 'banner/pic?fileName=' + fileName,
  upload: (formdata) => new Promise((resolve, reject) => {
    Vue.http.post(HOST_URL + 'banner/upload', formdata).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  })
};

// wx
api.wx = {
  getWXParams: (url) => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'wx/wxEncodeconfig?url=' + url).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  })
};

// 省市区列表
api.address = {
  listDistrict: (parentId) => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'address/listDistrict?parentId=' + parentId).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  save: (params) => new Promise((resolve, reject) => {
    Vue.http.post(HOST_URL + 'address/save', params).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  getAddress: (userId) => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'address/getByUserId?userId=' + userId).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  })
};

// 晒单返利
api.rebate = {
  query: (params) => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'rebate', {params: params}).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
  save: (params) => new Promise((resolve, reject) => {
    Vue.http.post(HOST_URL + 'rebate/save', params).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  })
};

// 提现
api.withdraw = {
  save: (params) => new Promise((resolve, reject) => {
    Vue.http.post(HOST_URL + 'withdraw/save', params).then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  }),
};

// channel 发现
api.channel = {
  query: () => new Promise((resolve, reject) => {
    Vue.http.get(HOST_URL + 'channel/query').then((r) => {
      resolve(r.body);
    }, (r) => {
      reject(r.body);
    });
  })
};

module.exports = api;
