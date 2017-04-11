<style lang='scss' rel="stylesheet/scss" scoped>
  .page-invite {
    .info {
      position: relative;
      height: 2.6rem;
      background-color: #ea5514;
      text-align: center;
      color: white;
      .key {
        padding: 0.68rem 0 0.32rem;
        font-size: 0.24rem;
      }
      .value {
        font-size: 0.36rem;
      }
      .faq {
        position: absolute;
        right: 0.35rem;
        bottom: 0.3rem;
        color: white;
        font-size: 0.24rem;
        i {
          display: inline-block;
          vertical-align: top;
          width: 0.25rem;
          height: 0.25rem;
          line-height:0.25rem;
          margin-right: 0.1rem;
          background-color: white;
          border: #979797 1px solid;
          border-radius: 100%;
          font-size: 0.16rem;
          text-align: center;
          color: #979797;
        }
      }
    }
    .list {
      padding-bottom: 1rem;
      li {
        display: flex;
        justify-content: space-between;
        line-height: 0.88rem;
        padding: 0 0.35rem;
        margin-top: 0.05rem;
        font-size: 0.24rem;
        color: #979797;
        background-color: white;
        .col:nth-child(2) {
          font-size: 0.2rem;
        }
      ;
      }
    }
    .btn-withdraw {
      position: fixed;
      width: 100%;
      height: 0.88rem;
      bottom: 0;
      left: 0;
      background-color: #ea5514;
      color: white;
      font-size: 0.28rem;
    }
    .tip {
      margin-top: 0.5rem;
      padding: 0 0.35rem;
      font-size: 0.24rem;
      color: #979797;
    }
  }
</style>

<template>
  <div class="page-invite">
    <div class="info">
      <p class="key">我的邀请码</p>
      <p class="value">{{inviteCode}}</p>
      <div class="faq"><i>?</i>如何填写邀请码</div>
    </div>

    <div class="item">已邀请的用户<span>12</span></div>
    <div class="item">
      <router-link to="/withdraw">推广二维码<span>开启收益</span></router-link>
    </div>
    <div class="tip">
      <p>说明：</p>
      <br>
      <p>每邀请一名用户奖励的积分自动发放到账户中。如邀请的用户通过券客购买的商品进行返利，则该账户自动获取相应比例的现金返利。</p>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'

  export default {
    data(){
      return {
        inviteCode: 'DX123'
      }
    },
    mounted(){

    }
  }
</script>
