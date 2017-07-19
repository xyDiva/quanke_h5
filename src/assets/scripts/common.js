/**
 * Created by dev on 2016/11/16.
 */

import api from "./api";
import {Toast} from "mint-ui";

let wx = require('weixin-js-sdk');

let common = {
  /*
   *功能：设置Cookie
   *cookieName 必选项，cookie名称
   *cookieValue 必选项，cookie值
   *seconds 生存时间，可选项，单位：秒；默认时间是3600 * 24 * 7秒
   *path cookie存放路径，可选项
   *domain cookie域，可选项
   *secure 安全性，指定Cookie是否只能通过https协议访问，一般的Cookie使用HTTP协议既可访问，如果设置了Secure（没有值），则只有当使用https协议连接时cookie才可以被页面访问
   */
  setCookie: function (cookieName, cookieValue, seconds, path, domain, secure) {
    var expires = new Date();
    var seconds = arguments[2] ? arguments[2] : 3600 * 24 * 7;
    expires.setTime(expires.getTime() + seconds * 1000);
    document.cookie = escape(cookieName) + '=' + escape(cookieValue) + (expires ? ';expires=' + expires.toGMTString() : '') + (path ? ';path=' + path : '/') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
  },
  /*
   *功能：获取Cookie
   *name 必选项，cookie名称
   */
  getCookie: function (name) {
    var cookie_start = document.cookie.indexOf(name);
    var cookie_end = document.cookie.indexOf(";", cookie_start);
    return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
  },
  getUrlParams() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&#]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  },

  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },

  // 判断系统 ios or android
  getSystem(){
    let agent = navigator.userAgent;
    if (agent.indexOf('iPhone') != -1) {
      return 'ios';
    }
    else if (agent.indexOf('Android') != -1) {
      return 'android';
    }
  },

  // 判断是否微信浏览器
  isWX(){
    let agent = navigator.userAgent;
    return agent.indexOf('MicroMessenger') != -1;
  },

  // 业务
  // 商品列表数据处理
  convertGoods(list){
    list.forEach((item) => {
      if (typeof item.sellPrice == 'number') {
        item.sellPrice += '';
      }
      let x = item.sellPrice.split('.');
      item.priceA = x[0];
      item.priceB = x[1];
      item.tags = item.tag.split(',');
      item.coupon = Math.floor(item.coupon);
    });
    return list;
  },

  // hack 更新微信标题
  setTitle(title){
    var body = document.getElementsByTagName('body')[0];
    document.title = title;
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "/empty.png");

    function fn() {
      setTimeout(function () {
        iframe.removeEventListener('load', fn);
        document.body.removeChild(iframe);
      }, 0);
    }

    iframe.addEventListener('load', fn);
    document.body.appendChild(iframe);
  },

  // 设置微信分享参数
  getWXParams(callback){
    let host = location.href;
    let urlParams = this.getUrlParams(),
      from = urlParams.from;

    if (from && (from == 'singlemessage' || from == 'groupmessage' || from == 'timeline')) {
      host = encodeURIComponent(host);
    }

    api.wx.getWXParams(host).then((r) => {
      if (r.success) {
        callback(r.value);
      }
      else {
        Toast(r.message);
      }
    })
  },
  wxInit(data){
    this.getWXParams(params => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: params.appId, // 必填，公众号的唯一标识
        timestamp: params.timestamp, // 必填，生成签名的时间戳
        nonceStr: params.noncestr, // 必填，生成签名的随机串
        signature: params.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(() => {
        let link = location.protocol + '//' + location.host + location.pathname;
        if (!data) {
          data = {};
        }

        // 分享到朋友圈
        wx.onMenuShareTimeline({
          title: data.title || '券客—先领券，再淘宝', // 分享标题
          link: data.link || link + '#/index', // 分享链接
          imgUrl: data.imgUrl || link + 'static/img/logo-share.jpg', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            console.log('分享到朋友圈成功');
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            console.log('取消分享到朋友圈');
          }
        });
        // 分享给好友
        wx.onMenuShareAppMessage({
          title: data.title || '券客—先领券，再淘宝', // 分享标题
          desc: data.desc || '专业买手每日推荐淘宝、天猫百万信誉商家最新折扣', // 分享描述
          link: data.link || link + '#/index', // 分享链接
          imgUrl: data.imgUrl || link + 'static/img/logo-share.jpg', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            console.log('分享给好友成功');
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            console.log('取消分享给好友');
          }
        });
      });
    });
  },

  getDate(timestamp, format = 1){
    let result = '';
    let d = new Date(timestamp);
    let year = d.getFullYear(),
      month = d.getMonth() + 1,
      day = d.getDate(),
      hour = d.getHours(),
      minute = d.getMinutes(),
      second = d.getSeconds();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    result = year + '-' + month + '-' + day;

    if (format === 2) {
      result += ' ' + hour + ':' + minute + ':' + second;
    }

    return result;
  }
};

module.exports = common;
