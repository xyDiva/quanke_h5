<template>
  <div class="page-index">
    <header>
      <router-link class="search" to="/search"><input type="text" placeholder="输入需要寻找的商品">
        <button class="btn-search" id="searchBtn">搜索</button>
      </router-link>
      <a class="left" href="javascript:;">
        <i class="ico logo"></i>
      </a>
    </header>
    <mt-swipe :auto="4000" class="banner" :style="{height:bannerHeight+'px'}">
      <mt-swipe-item v-for="item in bannerList">
        <a :href="item.value">
          <img :src="item.url">
        </a>
      </mt-swipe-item>
    </mt-swipe>
    <div class="nav-bar-wrap">
      <div id="navBar" class="nav-bar" :class="{fixed:navBarFixed}">
        <ul>
          <li :class="{active:!typeId}" @click="switchTab('')">全部</li>
          <li :class="{active:typeId==1}" @click="switchTab(1)">女装</li>
          <li :class="{active:typeId==2}" @click="switchTab(2)">男装</li>
          <li :class="{active:typeId==3}" @click="switchTab(3)">母婴</li>
          <li :class="{active:typeId==4}" @click="switchTab(4)">百货</li>
          <li :class="{active:typeId==5}" @click="switchTab(5)">文体</li>
          <li :class="{active:typeId==6}" @click="switchTab(6)">内衣</li>
          <li :class="{active:typeId==7}" @click="switchTab(7)">美妆</li>
          <li :class="{active:typeId==8}" @click="switchTab(8)">家居</li>
          <li :class="{active:typeId==9}" @click="switchTab(9)">配饰</li>
          <li :class="{active:typeId==10}" @click="switchTab(10)">其他</li>
        </ul>
      </div>
    </div>
    <div class="page-loadmore-wrapper" ref="wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
         infinite-scroll-distance="10" v-if="list.length">
      <mt-loadmore :autoFill="false" :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
        <div class="pro-item" v-for="item in list">
          <router-link :to="'/item/'+item.id">
            <div class="left"><img v-if="item.pic" :src="item.pic"></div>
            <div class="right">
              <div class="col title">{{item.title}}</div>
              <div class="col fs0">
                <span class="original-price"><del>原价：{{item.price}}</del></span>
                <span class="sold">已售：{{item.biz30day}}</span>
              </div>
              <div class="col tags fs0">
                <span class="tag" v-for="tag in item.tags">{{tag}}</span>
              </div>
              <div class="flex flex-x-between bottom">
                <div class="price"><span>券后价</span><i>&yen;</i>{{item.priceA}}<i>.{{item.priceB}}</i></div>
                <div class="coupon" v-if="item.coupon">立减 {{item.coupon}} 元</div>
              </div>
            </div>
          </router-link>
        </div>
      </mt-loadmore>
    </div>
    <div class="no-data" v-if="nodata">暂无记录</div>
    <div class="btn-top" v-if="topBtnVisible" @click="toTop"></div>
    <div class="wrap-footer">
      <my-footer tab="index"></my-footer>
    </div>

    <!--新用户弹出层-->
    <div class="popup popup-for-new flex flex-y-center" v-if="showPopupForNew">
      <div class="main">
        <p class="large">券客送你一笔淘宝花掉的存款</p>
        <p class="money">{{deposit}}</p>
        <p class="small">已存入钱包，赚取每日收益</p>
        <router-link to="income">
          <button class="btn-get">立即领取利息</button>
        </router-link>
      </div>
    </div>

    <!--第一次登陆弹出层-->
    <div class="popup popup-daily flex flex-y-center" v-if="showPopupDaily">
      <div class="main">
        <div class="info">
          <p class="text">今日收益已存入</p>
          <p class="money">{{dailyInterest}}</p>
        </div>
        <div class="pro fs0">
          <router-link :to="'/item/'+dailyGoods.id">
            <div class="img"><img v-if="dailyGoods.pic" :src="dailyGoods.pic" width="100%"></div>
            <p class="title">{{dailyGoods.title}}</p>
            <p class="price">券后价：<span>{{dailyGoods.sellPrice}}</span>原价：{{dailyGoods.price}}</p>
            <button class="coupon">立减{{dailyGoods.coupon}}元</button>
          </router-link>
        </div>
        <div class="close" @click="showPopupDaily=false"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import {Toast, Swipe, SwipeItem, InfiniteScroll, Loadmore} from 'mint-ui'
  import api from '../assets/scripts/api'
  import footer from '../components/Footer'

  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.use(InfiniteScroll);
  Vue.component(Loadmore.name, Loadmore);

  export default {
    data() {
      return {
        bannerHeight: document.body.clientWidth / 2,
        bannerList: [],

        navBarOffsetTop: 0,
        navBarFixed: false,

        typeId: '',
        list: [],
        start: 0,
        total: 0,
        allLoaded: false,
        loading: false,
        nodata: false,
        topStatus: '',

        topBtnVisible: false,

        showPopupDaily: false,
        showPopupForNew: false,

        dailyGoods: {},
        dailyInterest: 0,
        deposit: 0,

        openid: '',
      }
    },
    computed: {
      user() {
        return this.$store.getters.user || {}
      }
    },
    activated() {
      this.loading = false;
      window.addEventListener('scroll', this.scrollFn);
      document.body.scrollTop = this.$route.meta.stay ? this.$store.state.indexScrollTop : 0;

      this.getUser();
    },
    deactivated() {
      this.navBarFixed = false;
      this.showPopupDaily = false;
      this.showPopupForNew = false;
      this.loading = true;
      window.removeEventListener('scroll', this.scrollFn);
    },
    mounted() {
      // get banner
      api.banner.query().then((r) => {
        if (r.success) {
          let list = r.list || [];
          list.forEach((item) => {
            item.url = api.banner.getImg(item.fileName);
          });
          this.bannerList = list;
        }
        else {
          Toast(r.message);
        }
      });

      // get goods
      this.switchTab('');

      // 微信分享
      this.$com.wxInit();

      // 每日收益

      // 测试环境设置openid
      const openid = this.$com.getCookie('openid');
      this.$com.setCookie('deviceToken', openid, '', '/');
      this.openid = this.$com.getCookie('deviceToken');

      api.user.touch().then((r) => {
        r.list.forEach((item) => {
          if (item.type === 'deposit') { // 新用户
            this.deposit = item.data;
          }
          if (item.type === 'goods') {
            this.dailyGoods = this.$com.convertGoods([item.data])[0];
          }
          if (item.type === 'daily-interest') {
            this.dailyInterest = item.data;
          }
        });

        this.$store.dispatch('setNewUser', !!this.deposit);
        this.showPopupForNew = !!this.deposit;
        this.showPopupDaily = !this.deposit && this.dailyGoods.id;

      });

      // set nav bar offsetTop
      this.navBarOffsetTop = document.getElementById('navBar').offsetTop;
    },
    methods: {
      getUser() {
        api.user.getUserInfo().then((r) => {
          if (r.success) {
            this.user = r.value;
          }
          else {
            this.user = {};
          }
          this.$store.dispatch('setUser', this.user);
        })
      },
      clear() {
        this.start = 0;
        this.total = 0;
        this.allLoaded = false;
        this.topStatus = '';
      },
      switchTab(typeId) {
        this.typeId = typeId;
        this.timestamp = +new Date();
        if (document.body.scrollTop > this.navBarOffsetTop) {
          document.body.scrollTop = this.navBarOffsetTop;
        }
        this.clear();
        this.getList(true);
      },
      getList(clearList) {
        let params = {
          categoryId: this.typeId,
          start: this.start,
          limit: 10
        };
        api.goods.query(params).then((r) => {
          this.loading = false;
          if (r.success) {
            this.total = r.total;
            this.start += r.list.length;
            if (clearList) {
              this.list = this.$com.convertGoods(r.list || []);
            }
            else {
              this.list = this.list.concat(this.$com.convertGoods(r.list || []));
            }
            this.nodata = !this.list.length;
          }
          else {
            Toast({
              message: r.message,
              duration: 1500
            });

            setTimeout(() => {
              this.$router.push('/login');
            }, 2000);
          }
        });
      },
      loadMore() {
        this.loading = true;
        if (this.allLoaded) {
          return;
        }
        if (this.list.length < this.total) {
          // this.loading = true; loading设置放在这里会导致下拉刷新和tab切换无限触发loadMore
          this.getList();
        } else {
          this.allLoaded = true;
        }
      },
      loadTop() {
        this.switchTab(this.typeId);
        this.$refs.loadmore.onTopLoaded();
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      toTop() {
        document.body.scrollTop = 0;
      },
      scrollFn() {
        let scrollTop = document.body.scrollTop;
        this.topBtnVisible = scrollTop > 600;
        this.$store.dispatch('setIndexScrollTop', scrollTop);

        // navbar
        this.navBarFixed = scrollTop >= this.navBarOffsetTop;
      }
    },
    components: {
      'my-footer': footer
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  .page-index {

  .banner {
    margin-bottom: 0.05rem;

  img {
    width: 100%;
  }

  }
  .nav-bar-wrap {
    height: 0.74rem;
    overflow: hidden;
  }

  .nav-bar {
    width: 100%;
    height: 0.9rem;
    line-height: 0.74rem;
    padding: 0 0.18rem;
    background-color: white;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 11;

  &
  .fixed {
    height: 0.74rem !important;
  }

  ul {
    width: 9.5rem;
    height: 100%;

  li {
    position: relative;
    float: left;
    line-height: 0.74rem;
    margin: 0 0.18rem;
    color: #979797;
    font-size: 0.24rem;

  &
  .active {
    color: #ea5513;

  &
  :after {
    content: '';
    position: absolute;
    width: 0.55rem;
    bottom: 0.14rem;
    left: 50%;
    margin-left: -0.27rem;
    border-bottom: #ea5513 1px solid;
    z-index: 1;
  }

  }
  }
  }
  }

  .popup {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  .popup-daily {

  .main {
    position: relative;
    width: 6rem;
    height: 8rem;
    margin: 0 auto;
    background: url("../assets/images/index/earnings.png") center / contain no-repeat;
    text-align: center;

  .info {
    height: 3.4rem;
    padding-top: 0.8rem;
    color: #f8e71c;

  p {
    line-height: 100%;
  }

  .text {
    margin-bottom: 0.4rem;
    font-size: 0.24rem;
  }

  .money {
    font-size: 0.64rem;
  }

  }
  .pro {

  .img {
    width: 2rem;
    height: 2rem;
    margin: 0 auto;
    overflow: hidden;
    background-color: #979797;
  }

  .title {
    width: 80%;
    margin: 0.36rem auto 0.28rem;
    font-size: 0.2rem;
    color: #979797;
    text-align: center;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .price {
    font-size: 0.2rem;
    color: #979797;

  span {
    padding-right: 0.1rem;
    font-size: 0.36rem;
    color: #ea5514;
  }

  }
  .coupon {
    width: 2.5rem;
    height: 0.54rem;
    margin-top: 0.4rem;
    border-radius: 0.27rem;
    background-color: #ea5514;
    font-size: 0.18rem;
    color: white;
  }

  }
  .close {
    position: absolute;
    width: 0.52rem;
    height: 0.52rem;
    top: -0.67rem;
    right: 0.3rem;
    background: url("../assets/images/index/close.png") center / contain no-repeat;
  }

  }
  }
  .popup-for-new {

  .main {
    width: 6rem;
    height: 5rem;
    padding-top: 0.9rem;
    margin: 0 auto;
    text-align: center;
    color: #F8E71C;
    background-color: #ea5514;
    border-radius: 0.2rem;

  .large {
    font-size: 0.24rem;
  }

  .money {
    margin: 0.56rem 0;
    font-size: 0.64rem;
  }

  .small {
    font-size: 0.18rem;
  }

  .btn-get {
    width: 2.5rem;
    height: 0.54rem;
    margin-top: 0.64rem;
    font-size: 0.18rem;
    color: #ea5514;
    border-radius: 0.27rem;
    background-color: #F8E71C;
  }

  }
  }
  }
</style>
