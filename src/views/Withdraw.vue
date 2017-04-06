<style lang='scss' rel="stylesheet/scss" scoped>
  .page-withdraw {
    .item {
      input {
        width: 100%;
      }
    }
    .tip {
      padding: 0.5rem 0.35rem;
      font-size: 0.2rem;
      color: #979797;
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
  <div class="page-withdraw">
    <div class="item"><input type="text" v-model="o.alipay" placeholder="支付宝账号(请使用真实姓名)"></div>
    <div class="item"><input type="text" v-model="o.name" placeholder="真实姓名"></div>
    <div class="item">可提金额&nbsp;{{o.balance}}元</div>
    <div class="item"><input type="number" v-model="amount" placeholder="提现金额（大于5元）"></div>
    <div class="tip">
      <p>重要提醒:</p>
      <br>
      <p>请确认输入信息的正确！！</p>
      <p>券客会在审核后三个工作日内转账至您输入的支付宝账户中。</p>
      <p>最少提现金额大于5元。</p>
      <p>如有问题请及时联系客服。</p>
    </div>
    <button class="btn-withdraw" @click="withdraw">确认提现</button>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'

  export default {
    data(){
      return {
        o:{
          name:'熊',
          tel:159,
          balance:231
        },
        amount:null
      }
    },
    mounted(){
      
    },
    methods: {
      withdraw(){
        if(!o.alipay) {
          Toast('请输入支付宝账号');
          return false;
        }
        else if (!o.name) {
          Toast('请输入真实姓名');
          return false;
        }
        else if (!amount) {
          Toast('请输入提现金额');
          return false;
        }
        else if (amount < 5) {
          Toast('提现金额必须大于5元');
          return false;
        }
        else {
          Toast('withdraw');
        } 
      }
    }
  }
</script>
