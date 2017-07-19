<template>
  <div class="page-income">
    <div class="info">
      <ul class="flex flex-x-around">
        <li>
          <small>年化收益(%)</small>
          <p>{{o.interestRate}}</p>
        </li>
        <li>
          <small>今日收益(元)</small>
          <p>{{o.interestTody}}</p>
        </li>
      </ul>
    </div>

    <ul class="items flex flex-wrap">
      <li>
        <router-link to="income/deposit" class="flex flex-y-center">
          <div class="left"><img src="../assets/images/purse/icon_total.png"></div>
          <div class="right">
            <small>消费总存款</small>
            <p>{{o.deposit}}</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="income/deposit" class="flex flex-y-center">
          <div class="left"><img src="../assets/images/purse/icon_count.png"></div>
          <div class="right">
            <small>存款笔数</small>
            <p>{{o.depositCount}}</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="income/money" class="flex flex-y-center">
          <div class="left"><img src="../assets/images/purse/icon_earnings.png"></div>
          <div class="right">
            <small>累积收益</small>
            <p>{{o.totalInterest}}</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="income/money" class="flex flex-y-center">
          <div class="left"><img src="../assets/images/purse/icon_balance.png"></div>
          <div class="right">
            <small>可用余额(元)</small>
            <p>{{o.balance}}</p>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="tip">您的每笔消费都会获得相应金额的券币存入钱包中赢取收益</div>

    <div>
      <my-footer tab="purse"></my-footer>
    </div>

    <div class="guide" v-if="showGuide">
      <div class="guide1" v-if="showGuide1" @click="showGuide1=false;showGuide2=true;"></div>
      <div class="guide2" v-if="showGuide2" @click="showGuide2=false;"></div>
    </div>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'
  import footer from '../components/Footer'

  export default {
    data(){
      return {
        o: {},
        showGuide:false,
        showGuide1: true,
        showGuide2: false
      }
    },
    computed: {
      user(){
        return this.$store.getters.user
      },
      newUser(){
        return this.$store.getters.newUser
      }
    },
    mounted(){
      if (this.newUser) {
        this.showGuide = true;
      }

      api.money.summery().then((r) => {
        r.interestRate = (r.interestRate * 100).toFixed(2);
        r.deposit = r.deposit.toFixed(2);
        r.balance = r.balance.toFixed(2);
        r.totalInterest = r.totalInterest.toFixed(3);
        this.o = r;
      })
    },
    filters: {
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

        if (minute < 10) {
          minute = '0' + minute;
        }
        if (second < 10) {
          second = '0' + second;
        }

        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
      },
      convertAmount(amount){
        return amount > 0 ? '+' + amount + '' : amount;
      }
    },
    components: {
      'my-footer': footer
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  .page-income {
    .info {
      position: relative;
      padding: 1.5rem .7rem 1rem;
      background-color: #ea5514;
      color: white;
      ul li {
        text-align: right;
        font-size: 0;
        small {
          font-size: 0.18rem;
        }
        p {
          line-height: 100%;
          margin-top: 0.4rem;
          font-size: 0.64rem;
        }
      }
    }
    .items {
      margin-top: 0.1rem;
      background-color: white;
      li {
        display: flex;
        flex-wrap: wrap;
        width: 50%;
        height: 2rem;
        color: #979797;
        font-size: 0;
        a {
          width: 100%;
          color: #979797;
        }
        .left {
          width: 1.75rem;
          text-align: center;
        }
        .right {
          small {
            font-size: 0.18rem;
          }
          p {
            margin-top: 0.25rem;
            font-size: 0.36rem;
          }
        }
      }
    }
    .tip {
      padding: 0.3rem 0;
      text-align: center;
      font-size: 0.18rem;
      color: #EA5514;
    }

    .guide {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      .guide1, .guide2 {
        width: 100%;
        height: 100%;
        background-position: top center;
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .guide1 {
        background-image: url("../assets/images/purse/guide-01.png");
      }
      .guide2 {
        background-image: url("../assets/images/purse/guide-02.png");
      }
    }
  }
</style>
