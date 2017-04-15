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
      <p class="income">昨日收益（元）：{{user.incomeYesterday||0}}元</p>
    </div>

    <ul class="list">
      <li v-for="item in list">
        <div class="col">{{item.type|convertType}}</div>
        <div class="col">{{item.createTime|convertTime}}</div>
        <div class="col">{{item.amount|convertAmount}}</div>
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
        user: this.$store.state.user,
        list:[]
      }
    },
    mounted(){
      api.user.getAccountLog().then((r) => {
        if (r.success) {
          this.list = [
            {
              createTime:+new Date(),
              type:1,
              amount:2.9
            },
            {
              createTime:+new Date(),
              type:0,
              amount:-2.9
            }
          ];
        }
        else {
          Toast(r.message);
        }
      }, (r) => {
        Toast('failed');
      })
    },
    filters:{
      convertType(type){
        let t = '';
        switch (Number(type)) {
          case 0:
            t = '购物返利';
            break;
          case 1:
            t = '下线购物提成';
            break;
          case 2:
            t = '提现';
            break;
        }
        return t;
      },
      convertTime(timestamp){
        let d = new Date(timestamp),
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDate(),
            hour = d.getHours(),
            minute = d.getMinutes(),
            second = d.getSeconds();

        if(minute < 10) {
          minute += '0';
        }
        if(second < 10) {
          second += '0';
        }

        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
      },
      convertAmount(amount){
        return amount > 0 ? '+' + amount + '' : amount;
      }
    }
  }
</script>
