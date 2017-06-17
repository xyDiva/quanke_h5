<template>
  <div class="page-channel">
    <div class="banner fs0"><img :src="channel.url" width="100%"></div>
    <div class="page-loadmore-wrapper" ref="wrapper" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading" infinite-scroll-distance="10" v-if="list.length">
      <mt-loadmore :autoFill="false" :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
        <div class="flex flex-wrap">
          <div class="pro-item-2" v-for="item in list">
            <router-link :to="'/item/'+item.id">
              <div class="img"><img v-if="item.pic" :src="item.pic"></div>
              <div class="content">
                <div class="desc">{{item.desc}}</div>
                <div class="title">{{item.title}}</div>
                <div class="flex flex-x-between bottom">
                  <div class="sold">{{item.biz30day || 0}}人购买</div>
                  <div class="coupon" v-if="item.coupon">立减 {{item.coupon}} 元</div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <div class="no-data" v-if="nodata">暂无记录</div>
    <div class="btn-top" v-if="topBtnVisible" @click="toTop"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Toast, InfiniteScroll, Loadmore} from 'mint-ui'
  import api from '../assets/scripts/api'

  Vue.use(InfiniteScroll);
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
        topStatus: '',

        topBtnVisible: false
      }
    },
    computed: {
      channel(){
        let channel = this.$store.state.channel || {};
        channel.url = api.banner.getImg(channel.detailPic);
        return channel;
      }
    },
    activated(){
      this.loading = false;

      // scroll event
      window.addEventListener('scroll', this.scrollFn);

      document.body.scrollTop = this.$route.meta.stay ? this.$store.state.channelScrollTop : 0;
    },
    deactivated(){
      this.loading = true;
      window.removeEventListener('scroll', this.scrollFn);
    },
    mounted(){
      this.clear();
      this.getList(true);
    },
    methods: {
      clear(){
        this.start = 0;
        this.total = 0;
        this.allLoaded = false;
        this.topStatus = '';
        this.nodata = false;
      },
      getList(clearList){
        let params = {
          channelId: this.channel.id,
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
            this.nodata = !r.list.length;
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
        this.clear();
        this.getList(true);
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
        this.topBtnVisible = scrollTop > 600;
        this.$store.dispatch('setChannelScrollTop', scrollTop);
      },
      toTop(){
        document.body.scrollTop = 0;
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  .page-channel {
    .pro-item-2 {
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
