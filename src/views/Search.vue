<template>
  <div class="page-search">
    <header>
      <div class="search">
        <form action="#" onsubmit="return false;">
          <input type="search" id="searchIpt" placeholder="输入需要寻找的商品..." v-model="name">
          <button class="btn-search" @click="search" v-show="!name"></button>
          <button class="btn-reset" @click="reset" v-show="name"></button>
        </form>
      </div>
      <router-link class="left" to="/index">
        <i class="ico back"></i>
      </router-link>
    </header>
    <div class="page-loadmore-wrapper" ref="wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
         infinite-scroll-distance="10" v-if="list.length">
      <mt-loadmore :autoFill="false" :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
        <div class="pro-item" v-if="list.length" v-for="item in list">
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
    <div class="no-data" v-if="nodata">什么都没有找到T.T</div>
    <div class="no-data" v-if="!nodata&&allLoaded">没有更多搜索结果</div>
    <!--别人正在看-->
    <div class="recommend-title"><span>别人正在看</span></div>
    <div class="recommend-list flex flex-wrap">
      <div class="pro-item-2" v-for="item in recommendList">
        <router-link :to="'/item/'+item.id">
          <div class="img"><img v-if="item.pic" :src="item.pic"></div>
          <div class="content">
            <div class="title">{{item.title}}</div>
            <div class="flex flex-x-between bottom">
              <div class="price"><span>券后价</span><i>&yen;</i>{{item.priceA}}<i>.{{item.priceB}}</i></div>
              <div class="coupon" v-if="item.coupon">立减 {{item.coupon}} 元</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Toast, InfiniteScroll, Spinner,Loadmore} from 'mint-ui'
  import api from '../assets/scripts/api'

  Vue.use(InfiniteScroll);
  Vue.component(Spinner.name, Spinner);
  Vue.component(Loadmore.name, Loadmore);

  export default {
    data(){
      return {
        name: '',

        list: [],
        start: 0,
        total:0,
        allLoaded: false,
        loading: false,
        nodata: false,
        topStatus: '',

        recommendList: []
      }
    },
    activated(){

      const $searchIpt = document.getElementById('searchIpt');
      if ($searchIpt) {
        $searchIpt.focus();
      }

      this.loading = false;
      window.addEventListener('scroll', this.scrollFn);

      document.body.scrollTop = this.$route.meta.stay ? this.$store.state.searchScrollTop : 0;
    },
    deactivated(){
      this.loading = true;
      window.removeEventListener('scroll', this.scrollFn);
    },
    mounted(){
      this.getRecommendList();
    },
    methods: {
      clear(){
        this.list = [];
        this.start = 0;
        this.allLoaded = false;
        this.topStatus = '';
        this.nodata = false;
      },
      reset (){
        this.name = '';
      },
      search(){
        this.clear();
        this.getList();
      },
      getList(){
        let params = {
          name: this.name,
          start: this.start,
          limit: 10
        };
        api.goods.query(params).then((r) => {
          this.loading = false;
          if (r.success) {
            this.nodata = !r.list.length;
            this.start += r.list.length;
            this.total = r.total;
            this.list = this.list.concat(this.$com.convertGoods(r.list || []));
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
      loadTop() {
        this.search();
        this.$refs.loadmore.onTopLoaded();
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadMore(){
        this.loading = true;
        if (this.allLoaded)
          return;
        if (this.list.length < this.total) {
          this.getList();
        }
        else {
          this.allLoaded = true;
        }
      },
      scrollFn(){
        let scrollTop = document.body.scrollTop;
        this.$store.dispatch('setSearchScrollTop', scrollTop);
      },
      getRecommendList(){
        api.goods.queryRecommend().then((r) => {
          if (r.success) {
            this.recommendList = this.$com.convertGoods(r.list || []);
          }
          else {
            Toast({
              message: r.message,
              duration: 1500
            });
          }
        });
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  .page-search {
    .recommend-title {
      position: relative;
      margin: 0.5rem 0;
      color: #979797;
      font-size: 0.2rem;
      text-align: center;
      span {
        position: relative;
        display: inline-block;
        padding: 0 0.25rem;
        background-color: #f9f9f9;
      }
      &:before {
        content: '';
        position: absolute;
        width: 88%;
        left: 6%;
        top: 0.13rem;
        border-bottom: #979797 1px solid;
      }
    }
    .recommend-list {
      .title {
        height: 0.54rem;
        font-size: 0.24rem;
        color: black;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
</style>
