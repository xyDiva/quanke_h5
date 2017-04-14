<style lang='scss' rel="stylesheet/scss" scoped>
  .page-share {
    min-height: 100%;
    padding-bottom: 0.2rem;
    background: url("../assets/images/share.jpg") center top / cover repeat-y;
    color: white;
    p {
      line-height: 100%;
    }
    .p1 {
      padding-top: 2.26rem;
      margin-left: 1.1rem;
      font-size: 0.26rem;
    }
    .p2 {
      margin-top: 0.3rem;
      margin-left: 1.5rem;
      font-size: 0.24rem;
    }
    .p3 {
      text-align: right;
      margin-top: 0.65rem;
      margin-right: 1rem;
      font-size: 0.32rem;
      span {
        font-size: 0.48rem;
        font-weight: bold;
      }
    }
    .p4 {
      margin-top: 0.18rem;
      margin-left: 3.65rem;
      font-size: 0.18rem;
    }
    .p5 {
      margin-top: 0.26rem;
      margin-left: 2.25rem;
      font-size: 0.32rem;
      font-weight: bold;
      span {
        font-size: 0.48rem;
      }
    }
    .p6 {
      text-align: center;
      margin-top: 0.64rem;
      font-size: 0.58rem;
      font-weight: bold;
      span {
        font-size: 0.72rem;
      }
    }
    .p7 {
      margin-top: 0.1rem;
      margin-right: 1.15rem;
      font-size: 0.24rem;
      text-align: right;
    }
    .p8 {
      margin-top: 0.05rem;
      margin-right: 1.05rem;
      font-size: 0.15rem;
      text-align: right;
    }
    .p9 {
      margin-top: 0.05rem;
      margin-right: 0.98rem;
      font-size: 0.09rem;
      text-align: right;
    }
    .p10 {
      margin-top: -0.2rem;
      margin-left: 1.66rem;
      font-size: 0.32rem;
    }
    .p11 {
      text-align: center;
      margin-top: 0.54rem;
      font-size: 0.64rem;
      font-weight: bold;
    }
    .p12 {
      margin-top: 0.16rem;
      margin-left: 3.06rem;
      font-size: 0.14rem;
    }
    .p13 {
      text-align: center;
      margin-top: 0.86rem;
      font-size: 0.4rem;
      font-weight: bold;
    }
    .p14 {
      text-align: center;
      margin-top: 0.16rem;
      font-size: 0.12rem;
    }
    .qrcode {
      height: 1.9rem;
      margin-top: 0.4rem;
      margin-left: 2.8rem;
      img {
        float: left;
        width: 1.9rem;
        height: 1.9rem;
      }
      span {
        float: left;
        margin-top: 0.4rem;
        margin-left: 0.1rem;
      }
    }
    .p15 {
      margin-top: 0.18rem;
      margin-left: 3.65rem;
      font-size: 0.18rem;
    }
    .p16 {
      margin-top: 0.1rem;
      text-align: center;
      font-size: 0.14rem;
    }
  }
</style>

<template>
  <div class="page-share">
    <p class="p1">我是{{user.nickName}}</p>
    <p class="p2">公元2017年，我夜观淘宝</p>
    <p class="p3">发现了这么个<span>神器</span></p>
    <p class="p4">淘宝的优惠券全在这藏着</p>
    <p class="p5">淘的<span>贼</span>便宜不说</p>
    <p class="p6">还TM<span>躺着</span>挣了老多钱</p>
    <p class="p7">老多钱</p>
    <p class="p8">老多钱</p>
    <p class="p9">老多钱</p>
    <p class="p10">来不及细说了</p>
    <p class="p11">赶紧上船！</p>
    <p class="p12">每天直播好多券，赶紧抢个好位置</p>
    <p class="p13">街头暗号：{{user.recommendCode}}</p>
    <p class="p14">就是自己人</p>
    <div class="qrcode">
      <img :src="'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+user.qrcodeTicket">
      <span class="p15">扫这个二维码<br>一般都是<br>持家<br>会赚钱<br>貌美如花<br>的人</span>
    </div>
    <p class="p16">此二维码有效期至{{user.qrcodeExpiried | convertDate}}</p>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'

  export default {
    data(){
      return {
        userId: null,
        user: {},
        width: document.body.clientWidth / 4.2
      }
    },
    mounted(){
      this.userId = this.$route.query.userid;
      api.user.getUserInfoForShare(this.userId).then((r) => {
        if (r.success) {
          this.user = r.value;
        }
        else {
          Toast({
            message: r.message,
            duration: 1500
          });
        }
      })
    },
    filters: {
      convertDate(timestamp){
        let t = new Date(timestamp),
          year = t.getFullYear(),
          month = t.getMonth() + 1,
          day = t.getDate();

        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        return year + '-' + month + '-' + day;
      }
    }
  }
</script>
