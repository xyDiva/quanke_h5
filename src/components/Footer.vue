<template>
  <footer>
    <router-link to="/index" class="a-index" :class="{active:tab=='index'}">首页</router-link>
    <router-link to="/seckill" class="a-seckill" :class="{active:tab=='seckill'}">秒杀</router-link>
    <router-link to="/discovery" class="a-discovery" :class="{active:tab=='discovery'}">发现</router-link>
    <router-link to="/income" class="a-purse" :class="{active:tab=='purse'}" v-if="user.id">我的钱包</router-link>
    <a href="javascript:;" class="a-purse" :class="{active:tab=='purse'}" v-else @click="auth">我的钱包</a>
    <router-link to="/my" class="a-my" :class="{active:tab=='my'}">我的券客</router-link>
  </footer>
</template>

<script>
  import {Toast} from 'mint-ui'
  export default {
    props: {
      tab: ''
    },
    computed: {
      user(){
        return this.$store.getters.user || {}
      }
    },
    methods: {
      auth(){
        if (!this.user.id) {
          Toast('请登录');
          return false;
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  footer {
    position: fixed;
    width: 100%;
    height: 0.98rem;
    bottom: 0;
    background-color: white;

    display: flex;
    a {
      flex: 1;
      padding-top: 0.6rem;
      font-size: 0.24rem;
      background-position: center 0.15rem;
      background-size: 0.35rem;
      background-repeat: no-repeat;
      text-align: center;
      color: #979797;
      &.a-index {
        background-image: url("../assets/images/ico-index.png");
      }
      &.a-seckill {
        background-image: url("../assets/images/ico-seckill.png");
      }
      &.a-discovery {
        background-image: url("../assets/images/ico-discovery.png");
      }
      &.a-purse {
        background-image: url("../assets/images/wallet.png");
      }
      &.a-my {
        background-image: url("../assets/images/ico-my.png");
      }
      &.active {
        color: #ea5513;
        &.a-index {
          background-image: url("../assets/images/ico-index-active.png");
        }
        &.a-seckill {
          background-image: url("../assets/images/ico-seckill-active.png");
        }
        &.a-discovery {
          background-image: url("../assets/images/ico-discovery-active.png");
        }
        &.a-purse {
          background-image: url("../assets/images/wallet_press.png");
        }
        &.a-my {
          background-image: url("../assets/images/ico-my-active.png");
        }
      }
    }
  }
</style>
