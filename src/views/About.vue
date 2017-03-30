<style lang='scss' rel="stylesheet/scss" scoped>
  .page-about {
    .main {
      text-align: center;
      .logo {
        width: 2rem;
        margin: 1.2rem auto 0.4rem;
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
  <div class="page-about">
    <div class="main">
      <div class="logo"><img src="../assets/images/logo.png"></div>
      <p>版本 1.1</p>
      <div class="bottom">
        <p>客服微信：qianyan2046</p>
        <p>千言网络</p>
      </div>
    </div>
  </div>
</template>
