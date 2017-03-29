<style lang='scss' rel="stylesheet/scss" scoped>
  .page-login {
    .main {
      padding: 0.4rem 0.65rem;
      font-size: 0.24rem;
      .item {
        position: relative;
        border-bottom: #9a9a9a 1px solid;
        input {
          width: 100%;
          height: 0.88rem;
          padding: 0;
          border: none;
          background: none;
          font-size: 0.24rem;
          color: #979797;
        }
      }
      .btn-send-code {
        position: absolute;
        width: 1.76rem;
        height: 0.6rem;
        top: 0.15rem;
        right: 0.15rem;
      }
      .btn-login {
        margin-top: 0.5rem;
      }
    }
  }
</style>

<template>
  <div class="page-login">
    <section class="main">
      <div class="item">
        <input type="number" placeholder="请输入手机号码" v-model='tel'>
      </div>
      <div class="item">
        <input type="number" placeholder="验证码" v-model='code'>
        <button class="btn btn-send-code" @click="getCode" :disabled="getCodeBtnDisabled">{{text}}</button>
      </div>

      <button class="btn btn-login" @click="login" :disabled="!(tel&&code)">登录</button>
    </section>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'
  import common from '../assets/scripts/common'

  export default {
    data(){
      return {
        tel: null,
        code: null,

        text: '发送验证码',
        getCodeBtnDisabled:false
      }
    },
    mounted(){
      document.title = '登录';
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
      login(){
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
