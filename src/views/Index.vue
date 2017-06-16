<template>
  <div class="page-index">
    <header>
      <router-link class="search" to="/search"><input type="text" placeholder="输入需要寻找的商品">
        <button class="btn-search"></button>
      </router-link>
      <a class="left" href="javascript:;">
        <i class="ico logo"></i>
      </a>
      <a class="right" id='qdLink'>
        <i class="ico sign"></i>
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
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Toast, Swipe, SwipeItem, Spinner, InfiniteScroll, Loadmore} from 'mint-ui'
  import api from '../assets/scripts/api'
  import footer from '../components/Footer'

  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.use(InfiniteScroll);
  Vue.component(Spinner.name, Spinner);
  Vue.component(Loadmore.name, Loadmore);

  export default {
    data(){
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

        topBtnVisible: false
      }
    },
    computed: {
      user(){
        return this.$store.getters.user || {}
      }
    },
    activated(){
      this.loading = false;
      window.addEventListener('scroll', this.scrollFn);
      document.body.scrollTop = this.$route.meta.stay ? this.$store.state.indexScrollTop : 0;

      this.getUser();
    },
    deactivated(){
      this.navBarFixed = false;
      this.loading = true;
      window.removeEventListener('scroll', this.scrollFn);
    },
    mounted(){
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

      // set nav bar offsetTop
      this.navBarOffsetTop = document.getElementById('navBar').offsetTop;
    },
    methods: {
      getUser(){
        api.user.getUserInfo().then((r) => {
          if (r.success) {
            this.user = r.value;
          }
          else {
            this.user = {};
          }
          this.$store.dispatch('setUser', this.user);
          this.setQDLink();
        })
      },
      setQDLink(){
        let href = '';
        if (!this.user.id) {
          href = '#/login';
        }
        else if (!this.user.tel) {
          href = '#/bind';
        }
        else {
          href = api.host + '/quanke/sign-in.html';
        }
        document.getElementById('qdLink').href = href;
      },
      clear(){
        this.start = 0;
        this.total = 0;
        this.allLoaded = false;
        this.topStatus = '';
      },
      switchTab(typeId){
        this.typeId = typeId;
        this.timestamp = +new Date();
        if (document.body.scrollTop > this.navBarOffsetTop) {
          document.body.scrollTop = this.navBarOffsetTop;
        }
        this.clear();
        this.getList(true);
      },
      getList(clearList){
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
      loadMore(){
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
      toTop(){
        document.body.scrollTop = 0;
      },
      scrollFn(){
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
      &.fixed {
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
          &.active {
            color: #ea5513;
            &:after {
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
    .btn-top {
      position: fixed;
      width: 0.75rem;
      height: 0.75rem;
      right: 0.4rem;
      bottom: 1.18rem;
      background: url("../assets/images/btn-top.png") center / contain no-repeat;
    }
  }
</style>
