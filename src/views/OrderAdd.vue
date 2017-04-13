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
          &.img {
            position: relative;
            border:#979797 1px solid;
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
            padding-top: 0.85rem;
            border:#979797 1px dashed;
            border-radius: 0.1rem;
            background: url("../assets/images/ico-upload.png") center 0.44rem / 0.38rem no-repeat;
            text-align: center;
            font-size: 0.2rem;
            color: #979797;
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
            line-height:0.25rem;
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

<template>
  <div class="page-order-add">
    <div class="wrap-upload">
      <div class="top-tip">请上传带有订单创建时间的图片</div>
      <div class="list">
        <div class="box img" v-for="item in order.imgs">
          <img src="">
          <div class="del">删除</div>
        </div>
        <div class="box add">添加照片</div>
      </div>
      <div class="bottom-tip">
        <p>单次可上传三张截图返利</p>
        <p class="faq"><i>?</i>如何找到订单信息</p>
      </div>
    </div>
    <div class="item">
      <input type="text" class="ipt" v-model='order.name' placeholder="输入商品名称(据说输入商品名称会加快返利速度)">
    </div>
    <div class="item">
      <textarea v-model="order.desc" placeholder="请输入短评"></textarea>
    </div>
    <div class="tip">
      <p>返利规则说明：</p>
      <br>
      <p>上传通过券客 购买的订单信息提交审核，审核通过后返还订单付款金额的4%至用户账户。(例：付款金额100元，则返利4元)</p>
      <br>
      <p>用户眉笔返利成功后，券客将按该笔订单付款金额的2%奖励用户的邀请者(例：付款金额100元，2元奖励会自动奖励给晒单返利用户的邀请者，如无邀请者则无奖励)</p>
      <br>
      <p>审核通过后，相应奖励会自动发放至用户的账户</p>
      <br>
      <p>加成全每次只可使用一张</p>
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
        order: {
            imgs:[1,2]
        }
      }
    },
    methods: {
      save(){
        api.user.editUserInfo(this.user).then((r) => {
          if (r.success) {
            Toast({
              message: '修改成功',
              duration: 1500
            });
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
          else {
            Toast(r.message);
          }
        });
      }
    }
  }
</script>
