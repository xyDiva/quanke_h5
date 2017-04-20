<style lang='scss' rel="stylesheet/scss" scoped>
  .page-index {
    .banner {
      margin-bottom: 0.05rem;
      img {
        width: 100%;
      }
    }
    .category {
      display: flex;
      flex-wrap: wrap;
      a {
        width: 20%;
        height: 1.5rem;
        margin-bottom: 0.01rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        &:nth-child(1) {
          background-image: url("../assets/images/ico-women's.png");
        }
        &:nth-child(2) {
          background-image: url("../assets/images/ico-men's.png");
        }
        &:nth-child(3) {
          background-image: url("../assets/images/ico-baby.png");
        }
        &:nth-child(4) {
          background-image: url("../assets/images/ico-dpt.png");
        }
        &:nth-child(5) {
          background-image: url("../assets/images/ico-wt.png");
        }
        &:nth-child(6) {
          background-image: url("../assets/images/ico-underwear.png");
        }
        &:nth-child(7) {
          background-image: url("../assets/images/ico-beauty.png");
        }
        &:nth-child(8) {
          background-image: url("../assets/images/ico-home.png");
        }
        &:nth-child(9) {
          background-image: url("../assets/images/ico-accessory.png");
        }
        &:nth-child(10) {
          background-image: url("../assets/images/ico-others.png");
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

<template>
  <div class="page-index">
    <header>
      <router-link class="search" to="/search"><input type="text" placeholder="输入需要寻找的商品..."><button></button></router-link>
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
    <div class="category">
      <router-link to="/search/1"></router-link>
      <router-link to="/search/2"></router-link>
      <router-link to="/search/3"></router-link>
      <router-link to="/search/4"></router-link>
      <router-link to="/search/5"></router-link>
      <router-link to="/search/6"></router-link>
      <router-link to="/search/7"></router-link>
      <router-link to="/search/8"></router-link>
      <router-link to="/search/9"></router-link>
      <router-link to="/search/10"></router-link>
    </div>
    <div class="page-loadmore-wrapper" ref="wrapper" v-if="list.length">
      <mt-loadmore :autoFill="false" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="pro-item" v-for="item in list">
          <router-link :to="'/item/'+item.id">
            <div class="left"><img v-if="item.pic" :src="item.pic"></div>
            <div class="right">
              <div class="col title">{{item.title}}</div>
              <div class="col">
                <div class="price"><i>&yen;</i>{{item.priceA}}<i>.{{item.priceB}}</i></div>
                <div class="tags">
                  <span class="tag" v-for="tag in item.tags">{{tag}}</span><span class="tag coupon" v-if="item.coupon">{{item.coupon}}元券</span>
                </div>
              </div>
              <div class="col">
                <span class="original-price">原价：<del>{{item.price}}</del></span>
                <span class="sold">已售：{{item.biz30day}}</span>
              </div>
            </div>
          </router-link>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
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
  import {Toast, Swipe, SwipeItem, Loadmore, Spinner} from 'mint-ui'
  import api from '../assets/scripts/api'
  import footer from '../components/Footer'

  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Spinner.name, Spinner);

  export default {
    data(){
      return {
        bannerHeight:document.body.clientWidth/2,
        bannerList: [],

        list: [],
        start:0,
        total:0,

        allLoaded:false,
        bottomStatus:'',

        nodata:false,

        topBtnVisible: false
      }
    },
    activated(){
      // scroll event
      window.addEventListener('scroll', this.scrollFn);

      document.body.scrollTop = this.$route.meta.stay?this.$store.state.indexScrollTop:0;
    },
    deactivated(){
      window.removeEventListener('scroll', this.scrollFn);
    },
    mounted(){
      let href = '';
      if(api.mode == 0 || api.mode == 1) {
        href = 'http://qk.notepasses.com/quankeTest/sign-in.html';
      }
      else if (api.mode == 2) {
        href = 'http://qk.notepasses.com/quanke/sign-in.html';
      }
      document.getElementById('qdLink').href = href;

      // get banner
      api.banner.query().then((r) => {
        if (r.success) {
          let list = r.list || [];
          this.nodata = !list.length;
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
      this.getList();

      // 微信分享
      this.$com.wxInit();
    },
    methods: {
      getList(){
        let params = {
          start:this.start,
          limit:10
        };
        api.goods.query(params).then((r) => {
          if (r.success) {
            this.start += r.list.length;
            this.total = r.total;
            this.list = this.list.concat(this.$com.convertGoods(r.list||[]));
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
      toTop(){
        document.body.scrollTop = 0;
      },
      scrollFn(){
        let scrollTop = document.body.scrollTop;
        this.topBtnVisible = scrollTop > 600;
        this.$store.dispatch('setIndexScrollTop',scrollTop);
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        setTimeout(() => {
          if(this.list.length < this.total) {
            this.getList();
          }
          else {
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      }
    },
    components: {
      'my-footer': footer
    }
  }
</script>
