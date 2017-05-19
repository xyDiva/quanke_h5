<style lang='scss' rel="stylesheet/scss" scoped>
  .page-search {

  }
</style>

<template>
  <div class="page-search">
    <header v-if="headerVisible">
      <div class="search">
        <form action="#" onsubmit="return false;">
          <input type="search" id="searchIpt" placeholder="输入需要寻找的商品..." v-model="name" @search="search">
          <button @click="search"></button>
        </form>
      </div>
      <router-link class="left" to="/index">
        <i class="ico back"></i>
      </router-link>
    </header>
    <div class="page-loadmore-wrapper" ref="wrapper" v-if="list.length">
      <mt-loadmore :autoFill="false" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="pro-item" v-if="list.length" v-for="item in list">
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
    <div class="no-data" v-if="nodata">
      <img src="../assets/images/error.png">
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
        headerVisible: true,
        cid: null,
        name: '',

        list: [],
        start: 0,

        allLoaded: false,
        bottomStatus: '',

        nodata: false
      }
    },
    activated(){
      const meta = this.$route.meta;
      if (meta.clear) {
        this.clear('init');
      }

      this.cid = this.$route.params.cid;
      this.headerVisible = !this.cid;
      this.setTitle();

      if (this.cid && !meta.stay) {
        this.clear('init');
        this.getList();
      }
      else {
        const $searchIpt = document.getElementById('searchIpt');
        if ($searchIpt) {
          $searchIpt.focus();
        }
      }

      // scroll event
      window.addEventListener('scroll', this.scrollFn);

      document.body.scrollTop = this.$route.meta.stay ? this.$store.state.searchScrollTop : 0;
    },
    deactivated(){
      window.removeEventListener('scroll', this.scrollFn);
    },
    methods: {
      clear(action){
        if (action == 'init') {
          this.name = '';
        }
        this.list = [];
        this.start = 0;
        this.allLoaded = false;
        this.bottomStatus = '';
        this.nodata = false;
      },
      setTitle(){
        let title = '';
        switch (Number(this.cid)) {
          case 1:
            title = '女装';
            break;
          case 2:
            title = '男装';
            break;
          case 3:
            title = '母婴';
            break;
          case 4:
            title = '百货';
            break;
          case 5:
            title = '文体';
            break;
          case 6:
            title = '内衣';
            break;
          case 7:
            title = '美妆';
            break;
          case 8:
            title = '家居';
            break;
          case 9:
            title = '配饰';
            break;
          case 10:
            title = '其他';
            break;
          default:
            title = '搜索';
            break;
        }
        this.$com.setTitle(title);
      },
      search(){
        this.clear();
        this.getList();
      },
      getList(){
        let params = {
          categoryId: this.cid,
          name: this.name,
          start: this.start,
          limit: 10
        };
        api.goods.query(params).then((r) => {
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
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        setTimeout(() => {
          if (this.list.length < this.total) {
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
        this.$store.dispatch('setSearchScrollTop', scrollTop);
      },
    },
    components: {
      'my-footer': footer
    }
  }
</script>
