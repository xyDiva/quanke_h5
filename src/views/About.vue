<template>
  <div class="page-about">
    <div class="logo"><img src="../assets/images/logo.png"></div>
    <p>版本 1.2.1</p>

    <A></A>
    <B></B>

    <div class="bottom">
      <p>客服微信：qianyan2046</p>
      <p>千言网络</p>
    </div>
  </div>
</template>

<script>
  import a from '../components/A.vue'
  import b from '../components/B.vue'

  export default {
    components:{
      A:a,
      B:b
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  .page-about {
    text-align: center;
    .logo {
      padding-top: 1.2rem;
      padding-bottom: 0.4rem;
      font-size: 0;
      img {
        width: 2rem;
      }
    }
    p {
      font-size: 0.2rem;
    }
    .bottom {
      position: absolute;
      width: 100%;
      bottom: 1rem;
      p {
        margin-bottom: 0.5rem;
      }
    }
  }
</style>
