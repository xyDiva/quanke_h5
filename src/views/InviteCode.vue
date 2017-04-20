<style lang='scss' rel="stylesheet/scss" scoped>
  .page-invite-code {
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
    .btn-set {
      width: 6.2rem;
      margin: 0.3rem auto 0.6rem;
    }
    .btn-skip {
      width: 6.2rem;
      margin: -0.3rem auto 0.6rem;
      border: #979797 1px solid;
      background-color: white;
      color: #979797;
    }
    .tip {
      padding: 0 0.35rem;
      font-size: 0.24rem;
      color: #979797;
    }
  }
</style>

<template>
  <div class="page-invite-code">
    <div class="item">
      <input type="text" placeholder="输入邀请码" v-model='inviteCode'>
    </div>
    <button class="btn btn-set" @click="setInviteCode" :disabled="!inviteCode">确认输入，下一步</button>
    <button class="btn btn-skip" @click="skip">无邀请码，跳过</button>
    <div class="tip">
      <p>重要提醒：</p>
      <br>
      <p>请确认邀请码的正确，输入邀请码后不可更改。如无邀请码则跳过此步骤。有问题请及时联系客服。</p>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'

  export default {
    data(){
      return {
        user:this.$store.state.user,
        inviteCode: null
      }
    },
    methods: {
      setInviteCode(){
        if (!this.inviteCode) {
          Toast('请输入邀请码');
          return false;
        }

        // 接口
        api.user.bindInviteCode(this.inviteCode).then((r) => {
          if (r.success) {
            Toast({
              message: '绑定成功',
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
      },
      skip(){
        this.user.pid = 0;
        api.user.editUserInfo(this.user).then((r) => {
          if (r.success) {
            this.$router.push('/invite');
          }
          else {
            console.log(r.message);
          }
        });
      }
    }
  }
</script>
