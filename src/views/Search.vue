<style lang='scss' rel="stylesheet/scss" scoped>
  .page-search {

  }
</style>

<template>
  <div class="page-search">
    <header v-if="headerVisible">
      <div class="search"><input type="text" id="searchIpt" placeholder="输入需要寻找的商品..." v-model="name"><button @click="getList"></button></div>
      <router-link class="left" to="/index">
        <i class="ico back"></i>
      </router-link>
    </header>
    <div class="page-loadmore-wrapper" ref="wrapper" v-if="list.length">
      <mt-loadmore :autoFill="false" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
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
  import common from '../assets/scripts/common'
  import footer from '../components/Footer'

  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Spinner.name, Spinner);

  export default {
    data(){
      return {
        headerVisible:true,
        cid:this.$route.params.cid,
        name:'',

        list: [],
        start:0,

        allLoaded:false,
        bottomStatus:'',

        nodata:false
      }
    },
    mounted(){
      document.title = '搜索';
      if(this.cid) {
        this.headerVisible = false;
        this.getList();
      }
      else {
        document.getElementById('searchIpt').focus();
      }
    },
    methods: {
      getList(){
        let params = {
          categoryId:this.cid,
          name:this.name,
          start:this.start,
          limit:10
        };
        api.goods.query(params).then((r) => {
          if (r.success) {
            this.nodata = !r.list.length;
            this.start += r.list.length;
            this.total = r.total;
            this.list = this.list.concat(common.convertGoods(r.list||[]));
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
