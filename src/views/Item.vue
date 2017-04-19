<style lang='scss' rel="stylesheet/scss" scoped>
  .page-item {
    padding-bottom: 1rem;
    .banner {
      height: 6.24rem;
      margin-bottom: 0.05rem;
      img {
        width: 100%;
      }
    }
    .dl {
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 1rem;
      background-color: white;
      z-index: 9;
      span {
        font-size: 0;
        line-height: 0;
        &:nth-child(1) {
          img {
            height: 0.35rem;
          }
        }
      }
    }
    .pro-item {
      position: relative;
      padding: 0.25rem 0.3rem;
      .col:nth-child(3) {
        display: flex;
        justify-content: space-between;
      }
      .guide {
        margin: 0.65rem 0 0.32rem;
      }
      .flex {
        display: flex;
        font-size: 0.24rem;
        color: #979797;
        .key {
          width: 1.25rem;
        }
        .value {
          flex: 1;
        }
      }
      h1 {
        color: black;
        margin-right: 0.8rem;
        font-size: 0.36rem;
        textarea {
          width: 100%;
        }
      }
      .copy {
        position: absolute;
        width: 1rem;
        padding: 0.6rem 0 0.2rem;
        right: 0;
        top: 0;
        font-size: 0.18rem;
        text-align: center;
        background: url("../assets/images/ico-link.png") center 0.15rem / 0.4rem no-repeat;
      }
    }
    .first-page {
      position: relative;
      background-color: white;
    }
    .tip {
      line-height: 0.6rem;
      text-align: center;
      font-size: 0.24rem;
    }
    .item-imgs {
      margin-top: 0.2rem;
      img {
        width: 100%;
      }
    }
    .wrap-bottom {
      position: fixed;
      width: 100%;
      height: 0.98rem;
      bottom: 0;
      background-color: #ea5513;

      display: flex;
    }
    .btn-order {
      flex: 1;
      height: 0.98rem;
      color: white;
      font-size: 0.24rem;
      background-color: #ea5513;
    }
    .btn-back {
      width: 1rem;
      height: 0.98rem;
      border-right: white 1px dashed;
      background: url(../assets/images/ico-index-white.png) center / 0.4rem no-repeat;
    }
    .btn-back-no-coupon {
      position: fixed;
      width: 100%;
      height: 0.98rem;
      bottom: 0;
      left: 0;
      color: white;
      font-size: 0.24rem;
      background: #ea5513;
      z-index: 9;
    }
    .popup {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.6);
      .box {
        position: relative;
        width: 5.5rem;
        margin: 3rem auto 0;
        padding: 0.15rem;
        background-color: #ea5514;
        border-radius: 0.1rem;
        .close {
          position: absolute;
          width: 0.52rem;
          height: 0.52rem;
          right: 0.2rem;
          top: 0.22rem;
          background: url(../assets/images/ico-close.png) center / contain no-repeat;
        }
        .content {
          width: 100%;
          padding: 0.45rem 0.28rem;
          margin: 0.8rem 0 0.2rem;
          background-color: white;
          font-size: 0.24rem;
          line-height: 0.35rem;
          color: #333;
        }
        p {
          line-height: 0.4rem;
          padding-left: 0.29rem;
          font-size: 0.24rem;
          color: white;
        }
      }
      &.popup-tao-code {
        .tip-copy {
          position: absolute;
          left: 0.15rem;
          top: 0;
        }
        .copy {
          width:100%;
          border: white 1px solid;
        }
        p {
          margin-top: 0.32rem;
        }
      }
      &.popup-no-coupon {
        .box {
          padding: 0;
        }
        p {
          font-size: 0.18rem;
          margin-top: 1.3rem;
        }
        .qrcode {
          position: absolute;
          width: 1.9rem;
          right: 0.4rem;
          top: 3.4rem;
          z-index: 9;
          img {
            width: 100%
          }
        }
      }
    }
    image[lazy=loading] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
  }
</style>

<template>
  <div class="page-item">
    <!-- 下载 -->
    <div class="dl" v-if="shared">
      <span><img src="../assets/images/logo.png"></span>
      <span><img src="../assets/images/ew-03.png"></span>
      <span><a href="/r/system/apk"><img src="../assets/images/d-02.png"></a></span>
    </div>

    <!-- 返回首页 优惠券已领完 -->
    <router-link to="/index" v-if="noCoupon">
      <button class="btn-back-no-coupon">去券客首页逛逛</button>
    </router-link>

    <!-- 商品 -->
    <div class="pro-detail" v-if="!noCoupon">
      <div class="first-page">
        <mt-swipe :auto="4000" :show-indicators="false" class="banner" :style="{height:bannerHeight+'px'}">
          <mt-swipe-item><img :src="item.pic"></mt-swipe-item>
        </mt-swipe>
        <div class="pro-item">
          <div class="col">
            <h1>{{item.title}}</h1>
            <button class="copy" :data-clipboard-text="item.goodsUrl">复制</button>
          </div>
          <div class="col">
            <div class="price"><i>&yen;</i>{{item.priceA||0}}<i>.{{item.priceB||00}}</i></div>
            <div class="tags">
              <span class="tag" v-for="tag in item.tags">{{tag}}</span><span class="tag coupon" v-if="item.coupon">{{item.coupon}}元券</span>
            </div>
          </div>
          <div class="col">
            <span class="original-price">原价：<del>{{item.price||0.00}}</del></span>
            <span class="sold">已售：{{item.biz30day||0}}</span>
          </div>
          <div class="flex guide">
            <div class="key">购买方式：</div>
            <div class="value">①.先领取优惠券 ②.查看券后价格 ③.下单</div>
          </div>
          <div class="flex reason">
            <div class="key">推荐理由：</div>
            <div class="value">{{item.desc}}</div>
          </div>
        </div>
        <div class="tip">继续拖动，查看图文详情</div>
      </div>
      <div class="item-imgs">
        <ul>
          <li v-for="item in detailImgs"><img v-lazy="item"></li>
        </ul>
      </div>
      <div class="wrap-bottom">
        <router-link to="/index" v-if="shared">
          <button class="btn-back"></button>
        </router-link>
        <button class="btn-order" @click="popupVisible=true">领券下单</button>
      </div>
    </div>

    <!-- 弹出窗口 分享落地页 优惠券已领完 -->
    <div class="popup popup-no-coupon" v-if="popupVisible&&noCoupon">
      <div class="box">
        <img src="../assets/images/no-coupon.png">
        <!--  <div class="content">
          客官您来晚了！<br>
          券已经被领完了！<br>
          下载券客APP，<br>
          再也不会错过优惠！
        </div>
        <p>关注券客商城<br>第一时间获得最新优惠信息</p>
        <div class="qrcode"><img src="../assets/images/qrcode-gzh.png"></div> -->
      </div>
    </div>

    <!-- 弹出窗口 复制淘口令 -->
    <div class="popup popup-tao-code" v-if="popupVisible&&!noCoupon">
      <div class="box">
        <div class="close" @click="popupVisible=false"></div>
        <p class="tip-copy">复制以下口令</p>
        <div class="content" id="content" v-if="system=='ios'">{{item.goodsUrl}}</div>
        <textarea class="content" v-if="system=='android'">{{item.goodsUrl}}</textarea>
        <button class="btn copy" v-if="clipboardSupported" :data-clipboard-text="item.goodsUrl">一键复制</button>
        <p>购买方式：<br>①复制淘口令&nbsp;②打开淘宝领券&nbsp;③下单购买</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Toast, Swipe, SwipeItem} from 'mint-ui'
  import api from '../assets/scripts/api'
  import footer from '../components/Footer'

  var Clipboard = require('clipboard');

  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);

  export default {
    data(){
      return {
        bannerHeight: document.body.clientWidth,
        item: {},
        detailImgs: [],

        system: '',
        popupVisible: false,
        clipboardSupported: true,

        shared: this.$route.query.shared,
        noCoupon: false
      }
    },
    mounted(){
      // back to top
      document.body.scrollTop = 0;

      //判断系统
      this.system = this.$com.getSystem();

      const id = this.$route.params.id;
      api.goods.getById(id).then((r) => {
        if (r.success) {
          const host = location.protocol + '//' + location.host + location.pathname;

          // 微信分享参数
          let params = {
            title:'券客—先领券，再淘宝',
            link:host,
            imgUrl:host + 'static/img/logo-share.jpg',
            desc:'专业买手每日推荐淘宝、天猫百万信誉商家最新折扣'
          };

          // 券已领完 value为空
          if (!r.value) {
            this.noCoupon = true;
            this.popupVisible = true;
          }
          else {
            this.item = this.$com.convertGoods([r.value])[0];
            this.getGoodImgs(this.item.thirdId);

            params = {
              title:this.item.title,
              link:host+'#/item/' + this.item.id + '?shared=true',
              imgUrl:this.item.pic,
              desc:this.item.goodsUrl
            };

            // 复制
            this.copyInit();
          }

          // wx init
          this.$com.wxInit(params);
        }
        else {
          Toast(r.message);
        }
      });
    },
    methods: {
      getGoodImgs(thirdId){
        api.goods.getGoodImgs(thirdId).then((r) => {
          if (r.success) {
            this.detailImgs = r.list || [];
          }
        });
      },
      copyInit(){
        this.clipboardInit();

        if (this.system == 'ios') {
          document.addEventListener("selectionchange", function (e) {
            let content = document.getElementById('content');
            if (content) {
              window.getSelection().selectAllChildren(content);
            }
          });
        }
      },
      clipboardInit(){
        this.clipboardSupported = Clipboard.isSupported();
        let clipboard = new Clipboard('.copy');
        clipboard.on('success', function () {
          Toast('复制成功');
        });
        clipboard.on('error', function () {
          Toast('复制失败');
        });
      }
    },
    components: {
      'my-footer': footer
    }
  }
</script>
