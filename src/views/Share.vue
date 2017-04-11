<style lang='scss' rel="stylesheet/scss" scoped>
  .page-share {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("../assets/images/share.jpg") center / contain no-repeat;
    color: white;
    .abs {
      position: absolute;
    }
    .name {
      left: 1.7rem;
      top: 1.55rem;
      font-size: 0.26rem;
    }
    .code {
      left: 3.78rem;
      top: 8.2rem;
      font-size: 0.42rem;
      font-weight: bold;
    }
    .qrcode {
      width: 1.9rem;
      height: 1.9rem;
      left: 2.8rem;
      bottom: 2.1rem;
      background-color: rgba(255, 192, 203, 0.61);
    }
    .expired {
      left: 3.9rem;
      bottom: 1.77rem;
      font-size: 0.18rem;
    }
  }
</style>

<template>
  <div class="page-share">
    <div class="abs name">{{name}}</div>
    <div class="abs code">{{code}}</div>
    <div class="abs qrcode"></div>
    <div class="abs expired">{{expired}}</div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        name: '',
        code: '',
        expired:''
      }
    },
    mounted(){
        this.name = this.$route.query.name;
        this.code = this.$route.query.code;
        this.expired = this.$route.query.expired;
    }
  }
</script>
