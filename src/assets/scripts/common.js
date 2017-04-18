/**
 * Created by dev on 2016/11/16.
 */

 import api from './api'
 import {Toast} from 'mint-ui'
 
 let wx = require('weixin-js-sdk');

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

  // 判断系统 ios or android
  getSystem(){
    let agent = navigator.userAgent;
    if(agent.indexOf('iPhone') != -1) {
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
    list.forEach((item)=>{
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

    function fn(){
      setTimeout(function() {
        iframe.removeEventListener('load',fn);
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

    if(from&&(from == 'singlemessage' || from == 'groupmessage' || from == 'timeline')){
      host = encodeURIComponent(host);
    }

    api.wx.getWXParams(host).then((r)=>{
      if(r.success){
        callback(r.value);
      }
      else {
        Toast(r.message);
      }
    })
  },
  wxInit(data){
    this.getWXParams(params=>{
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: params.appId, // 必填，公众号的唯一标识
        timestamp: params.timestamp, // 必填，生成签名的时间戳
        nonceStr: params.noncestr, // 必填，生成签名的随机串
        signature: params.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(()=>{
        // 分享到朋友圈
        wx.onMenuShareTimeline({
          title: data.title, // 分享标题
          link: data.link, // 分享链接
          imgUrl: data.imgUrl, // 分享图标
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
          title: data.title, // 分享标题
          desc: data.desc, // 分享描述
          link: data.link, // 分享链接
          imgUrl: data.imgUrl, // 分享图标
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
  }
};

module.exports = common;
