<template>
  <div class="page-order-add">
    <div class="wrap-upload">
      <div class="top-tip">晒一张购买商品的图片</div>
      <div class="list">
        <div class="box img" v-if="imgUrl">
          <img :src="imgUrl">
          <div class="del" @click="del">删除</div>
        </div>
        <div class="box add"><input type="file" id='fileIpt' @change='upload'>添加图片</div>
      </div>
      <div class="bottom-tip">
        <p>单次可上传一张截图</p>
        <a class="faq" href="http://mp.weixin.qq.com/s/Qkem75pNnQY96kjPtN61LA"><i>?</i>如何找到订单信息</a>
      </div>
    </div>
    <div class="item">
      <input type="text" class="ipt" v-model='o.orderSerial' placeholder="复制订单号">
    </div>
    <div class="item">
      <textarea v-model="o.userComment" placeholder="请输入短评"></textarea>
    </div>
    <div class="tip">
      <p>消费存款说明：</p>
      <br>
      <p>通过券客购买的商品都可存入消费本金，根据用户当前的年化收益率每日结算利息；</p>
      <br>
      <p>审核通过后，相应本金会存入消费本金中每天领取年化收益；</p>
      <br>
      <p>存款订单有效期为创建订单的90天内；</p>
      <br>
      <p>必须是通过券客领取优惠券购买的商品才能存入；</p>
      <br>
      <p>购买使用集分宝进行优惠的订单将无法存入。</p>
    </div>
    <button class="btn btn-bottom" @click="save">提交审核</button>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'

  export default {
    data(){
      return {
        o: {
          orderSerial: '',
          userComment: '',
          orderPic: ''
        },
        imgUrl: ''
      }
    },
    mounted(){

    },
    methods: {
      upload(){
        let file = document.getElementById("fileIpt").files[0];
        let formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name);

        api.banner.upload(formData).then((r) => {
          if (r.success) {
            this.o.orderPic = r.value;
            this.imgUrl = api.banner.getImg(r.value);
          }
          else {
            Toast(r.message);
          }
        });
      },
      del(){
        this.imgUrl = '';
        this.o.orderPic = '';
      },
      save(){
        if (!this.o.orderSerial) {
          Toast('请输入订单号');
          return false;
        }
        api.rebate.save(this.o).then((r) => {
          if (r.success) {
            this.$store.dispatch('setOrderResult', {
              orderSerial: this.o.orderSerial,
              money: r.value
            });
            this.$router.replace('/order/succeed')
          }
          else {
            this.$store.dispatch('setOrderResult', {
              reason: r.message
            });
            this.$router.replace('/order/fail');
          }
        });
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  .page-order-add {
    .wrap-upload {
      padding: 0 0.35rem;
      background-color: white;
      font-size: 0.2rem;
      color: #979797;
      .top-tip {
        position: relative;
        padding: 0.3rem 0 0.24rem;
        text-align: center;
        color: #030303;
        font-size: 0.2rem;
        &:before {
          content: '';
          position: absolute;
          width: 1.5rem;
          left: 0;
          top: 0.4rem;
          border-bottom: #979797 1px solid;
        }
        &:after {
          content: '';
          position: absolute;
          width: 1.5rem;
          right: 0;
          top: 0.4rem;
          border-bottom: #979797 1px solid;
        }
      }
      .list {
        display: flex;
        /*justify-content: space-between;*/
        .box {
          width: 1.5rem;
          height: 1.5rem;
          margin-right: 0.15rem;
          overflow: hidden;
          &.img {
            position: relative;
            border: #979797 1px solid;
            img {
              width: 100%;
            }
            .del {
              position: absolute;
              width: 100%;
              height: 0.35rem;
              line-height: 0.35rem;
              bottom: 0;
              text-align: center;
              color: white;
              background-color: rgba(0, 0, 0, 0.7);
            }
          }
          &.add {
            position: relative;
            padding-top: 0.85rem;
            border: #979797 1px dashed;
            border-radius: 0.1rem;
            background: url("../assets/images/ico-upload.png") center 0.44rem / 0.38rem no-repeat;
            text-align: center;
            font-size: 0.2rem;
            color: #979797;
            input[type=file] {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              opacity: 0;
            }
          }
        }
      }
      .bottom-tip {
        display: flex;
        justify-content: space-between;
        padding: 0.3rem 0 0.2rem;
        .faq {
          i {
            display: inline-block;
            vertical-align: top;
            width: 0.25rem;
            height: 0.25rem;
            line-height: 0.25rem;
            margin-right: 0.1rem;
            margin-top: -1px;
            background-color: #d8d8d8;
            border: #979797 1px solid;
            border-radius: 100%;
            font-size: 0.16rem;
            text-align: center;
            color: #979797;
          }
        }
      }
    }
    .item {
      line-height: 0;
      .ipt {
        width: 100%;
        text-align: left;
      }
      textarea {
        width: 100%;
        height: 1.76rem;
        padding: 0.3rem 0;
      }
    }
    .tip {
      margin-top: 0.05rem;
      padding: 0.3rem 0.35rem;
      background-color: white;
      font-size: 0.2rem;
      color: #979797;
    }
  }
</style>
