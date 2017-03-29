<style lang='scss' rel="stylesheet/scss" scoped>
  .page-my-edit {
    .main {
      padding: 0.4rem 0.65rem;
      font-size: 0.24rem;
      .item {
        position: relative;
        border-bottom: #9a9a9a 1px solid;
        input {
          width: 65%;
          height: 0.88rem;
          padding: 0;
          border: none;
          background: none;
          font-size: 0.24rem;
          color: #979797;
        }
      }
      .btn-update {
        margin-top: 0.5rem;
      }
    }
  }
</style>

<template>
  <div class="page-my-edit">
    <section class="main">
      <div class="item">
        用户名：<input type="text" v-model='user.name'>
      </div>
      <div class="item">
        联系手机：<input type="number" v-model='user.tel'>
      </div>

      <button class="btn btn-update" @click="save">提交修改</button>
    </section>
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
    mounted(){
      document.title = '修改资料';
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
