<style lang='scss' rel="stylesheet/scss" scoped>
  .page-contact {
    height: 100%;
    background-color: white;
    .main {
      text-align: center;
      .qrcode {
        width: 5.28rem;
        margin: 1.8rem auto 0.5rem;
        img {
          width: 100%;
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
  }
</style>

<template>
  <div class="page-contact">
    <div class="main">
      <div class="qrcode"><img src="../assets/images/qrcode.jpg"></div>
      <p>扫一扫上面的二维码图案，加我微信</p>
      <div class="bottom">
        <p>客服微信：qianyan2046</p>
        <p>千言网络123</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted(){
      document.title = '联系客服';
    }
  }
</script>
