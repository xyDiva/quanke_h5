<template>
  <div class="page-seckill">
    <div class="page-loadmore-wrapper" ref="wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
         infinite-scroll-distance="10" v-if="list.length">
      <mt-loadmore :autoFill="false" :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
        <div class="items">
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
        </div>
      </mt-loadmore>
    </div>
    <div class="no-data" v-if="nodata">暂无记录</div>
    <div class="wrap-footer">
      <my-footer tab="seckill"></my-footer>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Toast, InfiniteScroll, Spinner, Loadmore} from 'mint-ui'
  import api from '../assets/scripts/api'
  import footer from '../components/Footer'

  Vue.use(InfiniteScroll);
  Vue.component(Spinner.name, Spinner);
  Vue.component(Loadmore.name, Loadmore);

  export default {
    data(){
      return {
        list: [],
        start: 0,
        total: 0,
        allLoaded: false,
        loading: false,
        nodata: false,
        topStatus: ''
      }
    },
    activated(){
      this.loading = false;
      // scroll event
      window.addEventListener('scroll', this.scrollFn);

      document.body.scrollTop = this.$route.meta.stay ? this.$store.state.seckillScrollTop : 0;
    },
    deactivated(){
      this.loading = true;
      window.removeEventListener('scroll', this.scrollFn);
    },
    mounted(){
      this.getList();

      // 微信分享
      let link = location.protocol + '//' + location.host + location.pathname;
      this.$com.wxInit({
        link: link + '?reurl=' + encodeURIComponent(link + '#/seckill'),
        desc: '每日定时直播秒杀，会员超低价格抢购产品'
      });
    },
    methods: {
      getList(){
        let params = {
          isSeckill: true,
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
            Toast(r.message);
          }
        });
      },
      loadMore() {
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
      loadTop() {
        this.clear();
        this.getList();
        this.$refs.loadmore.onTopLoaded();
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      scrollFn(){
        let scrollTop = document.body.scrollTop;
        this.$store.dispatch('setSeckillScrollTop', scrollTop);
      },
      clear(){
        this.list = [];
        this.start = 0;
        this.total = 0;
        this.allLoaded = false;
        this.topStatus = '';
      }
    },
    components: {
      'my-footer': footer
    }
  }
</script>
