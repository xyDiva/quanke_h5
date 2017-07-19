<template>
  <div class="page-order-result">
    <div class="result">
      <img src="../assets/images/order/succeed.png" v-if="type=='succeed'">
      <img src="../assets/images/order/failed.png" v-if="type=='fail'">
      <p class="order" v-if="type=='succeed'">订单：{{o.orderSerial}}</p>
      <p v-if="type=='succeed'">消费存入金额：{{o.money}}</p>
      <p v-if="type=='fail'">失败原因：{{o.reason}}</p>
    </div>
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
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'

  export default {
    data(){
      return {
        o: this.$store.getters.orderResult,
        type: this.$route.params.type,
        recommendList: []
      }
    },
    mounted(){
      this.getRecommendList();
    },
    methods: {
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
  .page-order-result {
    .result {
      padding: 1.5rem 0 0.5rem;
      text-align: center;
      img {
        width: 1.7rem;
        margin-bottom: 0.86rem;
      }
      p {
        font-size: 0.24rem;
        color: #979797;
      }
      .order {
        margin-bottom: 0.25rem;
      }
    }
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
