<style lang='scss' rel="stylesheet/scss" scoped>
  .page-my-edit {
    .item {
      .q-radio {
        input {
          display:none;
        }
        i {
          vertical-align: middle;
        }
        .ico {
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.05rem;
          border-radius: 50%;
          border: #979797 1px solid;
        }
        .radio:checked+.ico {
          background-color: #ea5514;
          border-color: white;
        }
      }
    }
    .btn-update {
      margin-top: 0.5rem;
    }
  }
</style>

<template>
  <div class="page-my-edit">
    <div class="item">
      昵称<span><input type="text" class="ipt" v-model='user.nickName' placeholder="微信名"></span>
    </div>
    <div class="item">
      性别
      <span>
        <label class="q-radio">
          <input type="radio" class="radio" name="gender" value="1" v-model="user.sex">
          <i class="ico"></i><i class="label">男</i>
        </label>
        <label class="q-radio">
          <input type="radio" class="radio" name="gender" value="2" v-model="user.sex">
          <i class="ico"></i><i class="label">女</i>
        </label>
      </span>
    </div>
    <div class="item">
      <router-link to="/bind">
        手机绑定
        <span><input type="tel" class="ipt" v-model="user.tel" placeholder="未绑定"></span>
      </router-link>
    </div>
    <div class="item">
      姓名<span><input type="text" class="ipt" v-model='user.name' placeholder="未设置"></span>
    </div>
    <div class="item">
      <router-link to="/address">
        我的收货地址
      </router-link>
    </div>
    <div class="item">
      微信号<span><input type="text" class="ipt" v-model='user.wx' placeholder="未设置"></span>
    </div>
    <div class="item">
      常用邮箱<span><input type="email" class="ipt" v-model='user.email' placeholder="未设置"></span>
    </div>
    <div class="item">
      支付宝<span><input type="text" class="ipt" v-model='user.alipay' placeholder="未设置"></span>
    </div>
    <button class="btn btn-update" @click="save">提交修改</button>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'

  export default {
    computed: {
      user() {
        return this.$store.state.user
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
