<style lang='scss' rel="stylesheet/scss" scoped>
  .page-income {
    .info {
      height: 2.6rem;
      background-color: #ea5514;
      text-align: center;
      color: white;
      font-size: 0.2rem;
      p {
        line-height: 100%;
      }
      .balance {
        padding: 0.45rem 0 0.2rem;
        font-size: 0.72rem;
      }
      .income {
        margin-top: 0.45rem;
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
        };
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
  }
</style>

<template>
  <div class="page-income">
    <div class="info">
      <p class="balance">{{user.balance}}</p>
      <p>总计余额（元）</p>
      <p class="income">昨日收益（元）：{{user.income}}元</p>
    </div>

    <ul class="list">
      <li>
        <div class="col">晒单返利</div>
        <div class="col">2017-03-24 17:12</div>
        <div class="col">+2.76</div>
      </li>
      <li>
        <div class="col">晒单返利</div>
        <div class="col">2017-03-24 17:12</div>
        <div class="col">+2.76</div>
      </li>
    </ul>

    <router-link to="/withdraw">
      <button class="btn-withdraw">申请提现</button>
    </router-link>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'

  export default {
    data(){
      return {
        user: {
          balance:234.32,
          income:123
        }
      }
    },
    mounted(){
      
    }
  }
</script>
