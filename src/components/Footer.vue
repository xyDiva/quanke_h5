<style lang="scss" rel="stylesheet/scss" scoped>
  footer {
    position: fixed;
    width: 100%;
    line-height: 0.98rem;
    bottom: 0;
    background-color: white;

    display: flex;
    a {
      flex: 1;
      padding-left: 6%;
      font-size: 0.24rem;
      background-position: 34% center;
      background-size: 0.4rem;
      background-repeat: no-repeat;
      text-align: center;
      color: #979797;
      &.a-index {
        background-image: url("../assets/images/ico-index.png");
      }
      &.a-seckill {
        background-image: url("../assets/images/ico-seckill.png");
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
        &.a-my {
          background-image: url("../assets/images/ico-my-active.png");
        }
      }
    }
  }
</style>

<template>
  <footer>
    <router-link to="/index" class="a-index" :class="{active:tab=='index'}">首页</router-link>
    <router-link to="/seckill" class="a-seckill" :class="{active:tab=='seckill'}">秒杀</router-link>
    <router-link to="/my" class="a-my" :class="{active:tab=='my'}">我的</router-link>
  </footer>
</template>

<script>
  export default {
    props:{
      tab:''
    },
    mounted(){
      
    }
  }
</script>
