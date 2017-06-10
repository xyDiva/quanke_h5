<template>
  <div class="page-order">
    <div class="page-loadmore-wrapper" ref="wrapper" v-if="list.length">
      <mt-loadmore :autoFill="false" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="items">
          <div class="order-item" v-for="item in list">
            <div class="col screenshot"><img v-if="item.imgUrl" :src="item.imgUrl"></div>
            <div class="col center">
              <p class="time">{{item.createTime|convertTime}}</p>
              <p class="name" v-if="item.userDesc">{{item.userDesc}}</p>
              <p class="reason" v-if="item.refuseRemark">失败原因：{{item.refuseRemark}}</p>
            </div>
            <div class="col status" :class="{s0:item.status==0,s1:item.status==1,s2:item.status==2}"></div>
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
    },
    methods: {
      getList(){
        let params = {
          start: this.start,
          limit: 10
        };
        api.rebate.query(params).then((r) => {
          if (r.success) {
            this.start += r.list.length;
            this.total = r.total;

            //convert
            r.list.forEach((item)=>{
              let firstImg = item.orderPic.split(',')[0];
              if(firstImg){
                item.imgUrl = api.banner.getImg(firstImg);
              }
            });
            this.list = this.list.concat(r.list || []);

            this.nodata = !this.list.length;
            if(this.nodata) {
              this.$router.replace('/order/add');
            }
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
    },
    filters:{
      convertTime(timestamp){
        let d = new Date(timestamp),
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDate(),
            hour = d.getHours(),
            minute = d.getMinutes(),
            second = d.getSeconds();

        if(minute < 10) {
          minute = '0' + minute;
        }
        if(second < 10) {
          second = '0' + second;
        }

        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  .page-order {
    .page-loadmore-wrapper {
      padding-bottom: 1rem;
    }
    .order-item {
      padding: 0.25rem 0.5rem 0.25rem 0.35rem;
      margin-bottom: 0.05rem;
      background-color: white;
      display: flex;
      color: #979797;
      font-size: 0.2rem;
      .screenshot {
        width: 1.5rem;
        height: 1.5rem;
        border: #979797 1px solid;
        overflow:hidden;
        img {
          width:100%;
        }
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
