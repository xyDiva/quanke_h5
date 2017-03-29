/**
 * Created by dev on 2016/11/16.
 */

let common = {
  getUrlParams() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&#]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  },
  // setCookie(name, value, expiredays){
  //   var exdate = new Date();
  //   exdate.setDate(exdate.getDate() + expiredays);
  //   document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  // },
  getCookie(name){
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
  delCookie(name){
    document.cookie = name + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },

  // 判断系统 ios or android
  getSystem(){
    var agent = navigator.userAgent;
    if(agent.indexOf('iPhone') != -1) {
      return 'ios';
    }
    else if (agent.indexOf('Android') != -1) {
      return 'android';
    }
  },

  // 业务
  // 商品列表数据处理
  convertGoods(list){
    list.forEach((item)=>{
      let x = item.sellPrice.split('.');
      item.priceA = x[0];
      item.priceB = x[1];
      item.tags = item.tag.split(',');
    });
    return list;
  }
};

module.exports = common;
