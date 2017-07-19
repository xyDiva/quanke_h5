<template>
  <div class="page-income-logs">
    <ul class="items flex flex-wrap">
      <li class="flex-y-center" v-if="type=='deposit'">
        <div class="left"><img src="../assets/images/purse/icon_total.png"></div>
        <div class="right">
          <small>消费总存款</small>
          <p>{{o.deposit}}</p>
        </div>
      </li>
      <li class="flex-y-center" v-if="type=='deposit'">
        <div class="left"><img src="../assets/images/purse/icon_count.png"></div>
        <div class="right">
          <small>存款笔数</small>
          <p>{{o.depositCount}}</p>
        </div>
      </li>
      <li class="flex-y-center" v-if="type=='money'">
        <div class="left"><img src="../assets/images/purse/icon_earnings.png"></div>
        <div class="right">
          <small>累积收益</small>
          <p>{{o.totalInterest}}</p>
        </div>
      </li>
      <li class="flex-y-center" v-if="type=='money'">
        <div class="left"><img src="../assets/images/purse/icon_balance.png"></div>
        <div class="right">
          <small>可用余额</small>
          <p>{{o.balance}}</p>
        </div>
      </li>
    </ul>

    <div class="list" v-if="list.length">
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"
          infinite-scroll-immediate-check="false">
        <li v-for="item in list" class="flex flex-x-between">
          <div class="col">{{item.type}}</div>
          <div class="col">{{item.createTime}}</div>
          <div class="col">{{item.amount}}</div>
        </li>
      </ul>
    </div>
    <div class="no-data" v-if="noData">暂无记录</div>

    <router-link to="/order" v-if="type=='deposit'">
      <button class="btn-bottom">消费存款</button>
    </router-link>
    <button class="btn-bottom" v-if="type=='money'" @click="withdrawHandler">提现</button>
  </div>
</template>

<script>
  import api from '../assets/scripts/api'
  import Vue from 'vue'
  import {Toast, InfiniteScroll} from 'mint-ui'
  Vue.use(InfiniteScroll);

  export default {
    data(){
      return {
        type: this.$route.params.type,
        o: {},
        list: [],
        start: 0,
        limit: 20,
        total: 0,
        allLoaded: false,
        loading: false,
        noData: false
      }
    },
    computed: {
      user(){
        return this.$store.state.user || {}
      }
    },
    mounted(){
      this.$com.setTitle(this.type === 'deposit' ? '消费存款' : '累积收益');

      api.money.summery().then((r) => {
        r.deposit = r.deposit.toFixed(2);
        r.balance = r.balance.toFixed(2);
        r.totalInterest = r.totalInterest.toFixed(3);
        this.o = r;
      });

      this.getList();
    },
    methods: {
      getList(){
        const params = {
          start: this.start,
          limit: this.limit
        };
        api.money.queryLogs(this.type, params).then((r) => {
          this.start += r.list.length;
          this.list = this.list.concat(this.convertData(r.list || []));
          this.total = r.total;
          this.nodata = !r.list.length;
        })
      },
      convertData(list){
        for (let i = 0; i < list.length; i++) {
          let item = list[i];

          let t = '';
          switch (item.type) {
            case 'deposit':
              if (this.type === 'deposit') {
                t = item.childId ? '会员购物' : '消费存入';
              }
              else {
                t = '登录收益';
              }
              break;
            case 'daily-interest':
              t = '每日利息';
              break;
            case 'draw':
              t = '提现';
              break;
          }

          item.type = t;
          item.createTime = this.$com.getDate(item.createTime);

          const n = this.type === 'deposit' ? 2 : 6;
          item.amount = '+' + item.amount.toFixed(n);
        }
        return list;
      },
      loadMore() {
        this.loading = true;
        if (this.allLoaded)
          return;
        if (this.list.length < this.total) {
          this.getList();
        }
        else {
          this.allLoaded = true;
        }
      },
      withdrawHandler(){
        if (!this.user.tel) {
          this.$router.push('/bind');
        }
        else {
          this.$router.push('/withdraw');
        }
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  .page-income-logs {
    .items {
      margin-bottom: 0.1rem;
      background-color: white;
      li {
        display: flex;
        width: 50%;
        height: 2rem;
        font-size: 0;
        background-color: white;
        .left {
          width: 1.75rem;
          text-align: center;
        }
        .right {
          small {
            font-size: 0.18rem;
            color: #979797;
          }
          p {
            margin-top: 0.25rem;
            font-size: 0.36rem;
            color: #EA5514;
          }
        }
      }
    }
    .list {
      padding-bottom: 0.88rem;
      li {
        line-height: 0.88rem;
        padding: 0 0.35rem;
        margin-bottom: 0.05rem;
        background-color: white;
        .col {
          &:nth-child(1) {
            font-size: 0.24rem;
            color: #979797;
          }
          &:nth-child(2) {
            font-size: 0.2rem;
            color: #979797;
          }
          &:nth-child(3) {
            font-size: 0.24rem;
            color: #EA5514;
          }
        }
      }
    }
    .btn-bottom {
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
