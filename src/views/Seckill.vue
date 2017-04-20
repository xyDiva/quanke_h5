<style lang='scss' rel="stylesheet/scss" scoped>
  .page-seckill {

  }
</style>

<template>
  <div class="page-seckill">
    <div class="page-loadmore-wrapper" ref="wrapper" v-if="list.length">
      <mt-loadmore :autoFill="false" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="items">
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
  import {Toast,Loadmore, Spinner} from 'mint-ui'
  import api from '../assets/scripts/api'
  import footer from '../components/Footer'

  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Spinner.name, Spinner);

  export default {
    data(){
      return {
        list: [],
        start:0,
        total:0,

        allLoaded:false,
        bottomStatus:'',

        nodata:false
      }
    },
    activated(){
      // scroll event
      window.addEventListener('scroll', this.scrollFn);

      document.body.scrollTop = this.$route.meta.stay?this.$store.state.seckillScrollTop:0;
    },
    deactivated(){
      window.removeEventListener('scroll', this.scrollFn);
    },
    mounted(){
      this.getList();

      // 微信分享
      let link = location.protocol + '//' + location.host + location.pathname;
      this.$com.wxInit({
        link: link + '#/seckill',
        desc: '每日定时直播秒杀，会员超低价格抢购产品'
      });
    },
    methods: {
      getList(){
        let params = {
          isSeckill: true,
          start:this.start,
          limit:10
        };
        api.goods.query(params).then((r) => {
          if (r.success) {
            this.nodata = !r.list.length;
            this.start += r.list.length;
            this.total = r.total;
            this.list = this.list.concat(this.$com.convertGoods(r.list||[]));
          }
          else {
            Toast(r.message);
          }
        });
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
      },
      scrollFn(){
        let scrollTop = document.body.scrollTop;
        this.$store.dispatch('setSeckillScrollTop',scrollTop);
      }
    },
    components: {
      'my-footer': footer
    }
  }
</script>
