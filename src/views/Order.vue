<style lang='scss' rel="stylesheet/scss" scoped>
  .page-order {
    .page-loadmore-wrapper {
      padding-bottom: 1rem;
    }
    .order-item {
      padding: 0.25rem 0.5rem 0.25rem 0.35rem;
      margin-bottom: 0.05rem;
      background-color: white;
      a {
        display: flex;
        color: #979797;
        font-size: 0.2rem;
      }
      .screenshot {
        width: 1.5rem;
        height: 1.5rem;
        border: #979797 1px solid;
      }
      .center {
        flex:1;
        padding-left: 0.35rem;
        .time {
          margin: 0.25rem 0 0.2rem;
        }
      }
      .status {
        width: 1.15rem;
        background: center / contain no-repeat;
        &.s0 {
          background-image: url("../assets/images/order-s0.png");
        }
        &.s1 {
          background-image: url("../assets/images/order-s1.png");
        }
        &.s2 {
          background-image: url("../assets/images/order-s2.png");
        }
      }
    }
  }
</style>

<template>
  <div class="page-order">
    <div class="page-loadmore-wrapper" ref="wrapper" v-if="list.length">
      <mt-loadmore :autoFill="false" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="items">
          <div class="order-item" v-for="item in list">
            <router-link :to="'/item/'+item.id">
              <div class="col screenshot"><img v-if="item.pic" :src="item.pic"></div>
              <div class="col center">
                <p class="time">{{item.createTime}}</p>
                <p class="reason" v-if="item.reason">失败原因：{{item.reason}}</p>
              </div>
              <div class="col status" :class="{s0:item.status==0,s1:item.status==1,s2:item.status==2}"></div>
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
    <router-link to="/order/add">
      <button class="btn btn-bottom">再晒一单</button>
    </router-link>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Toast, Loadmore, Spinner} from 'mint-ui'
  import api from '../assets/scripts/api'

  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Spinner.name, Spinner);

  export default {
    data(){
      return {
        list: [],
        start: 0,
        total: 0,

        allLoaded: false,
        bottomStatus: '',

        nodata: false
      }
    },
    mounted(){
      this.getList();
//      this.list = [
//        {
//          id: 1,
//          createTime: new Date(),
//          status: 0
//        },
//        {
//          id: 2,
//          createTime: new Date(),
//          status: 1
//        },
//        {
//          id: 3,
//          createTime: new Date(),
//          status: 2,
//          reason:'我也不知道为什么可能是这样这样那样那样'
//        }
//      ];
    },
    methods: {
      getList(){
        let params = {
          start: this.start,
          limit: 10
        };
        api.rebate.query(params).then((r) => {
          if (r.success) {
            this.nodata = !r.list.length;
            this.start += r.list.length;
            this.total = r.total;
            this.list = r.list || [];
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
          if (this.list.length < this.total) {
            this.getList();
          }
          else {
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      }
    }
  }
</script>
