<style lang='scss' rel="stylesheet/scss" scoped>
  .page-bind {
    .item {
      input {
        width: 100%;
      }
    }
    .btn-send-code {
      position: absolute;
      width: 1.76rem;
      height: 0.6rem;
      top: 0.15rem;
      right: 0.15rem;
    }
    .btn-bind {
      width: 6.2rem;
      margin: 0.3rem auto 0.6rem;
    }
    .tip {
      padding: 0 0.35rem;
      font-size: 0.24rem;
      color: #979797;
    }
  }
</style>

<template>
  <div class="page-bind">
    <div class="item">
      <input type="number" placeholder="输入手机号码" v-model='tel'>
    </div>
    <div class="item">
      <input type="number" placeholder="验证码" v-model='code'>
      <button class="btn btn-send-code" @click="getCode" :disabled="getCodeBtnDisabled">{{text}}</button>
    </div>
    <div class="item">
      <input type="number" placeholder="输入邀请码" v-model='inviteCode'>
    </div>
    <button class="btn btn-bind" @click="bind" :disabled="!(tel&&code)">验证并绑定</button>
    <div class="tip">
      <p>重要：</p>
      <br>
      <p>账户绑定的手机号是相应活动积分、购物返利验证的唯一识别，请务必填写真实有效的手机号。</p>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'

  export default {
    data(){
      return {
        tel: null,
        code: null,
        inviteCode:null,

        text: '发送验证码',
        getCodeBtnDisabled:false
      }
    },
    methods: {
      getCode(){
        const reg_phone = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|7[^249\D]|8\d)\d{8}$/;
        if (!this.tel) {
          Toast('请输入手机号');
          return false;
        }
        else if (!reg_phone.test(this.tel)) {
          Toast('手机号格式错误');
          return false;
        }

        let n = 60;
        this.text = n + 's';
        this.getCodeBtnDisabled = true;

        let timer = setInterval(()=> {
          n--;
          this.text = n + 's';

          if (n == 0) {
            clearInterval(timer);
            this.text = '重新发送';
            this.getCodeBtnDisabled = false;
          }
        }, 1000);

        // 接口
        api.user.getCode(this.tel).then((r)=> {
          if (!r.success) {
            Toast(r.message);
          }
        });
      },
      bind(){
        // 验证
        const reg_phone = /^\d{11}$/;
        const reg_password = /^\d{6}$/;

        if (!this.tel) {
          Toast('请输入手机号');
          return false;
        }
        else if (!reg_phone.test(this.tel)) {
          Toast('手机号格式错误');
          return false;
        }
        else if (!this.code) {
          Toast('请输入验证码');
          return false;
        }
        else if (!reg_password.test(this.code)) {
          Toast('验证码格式错误');
          return false;
        }

        // 接口
        api.user.login(this.tel, this.code).then((r) => {
          if (r.success) {
            Toast({
              message: '登录成功',
              duration: 1500
            });
            setTimeout(() => {
              this.$router.push('/my');
            }, 2000);
          }
          else {
            Toast(r.message);
          }
        }, (r) => {
          Toast('failed');
        })
      }
    }
  }
</script>
