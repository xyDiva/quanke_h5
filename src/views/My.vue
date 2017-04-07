<style lang='scss' rel="stylesheet/scss" scoped>
  .page-my {
    .info {
      position: relative;
      height: 4.08rem;
      background-color: #ea5513;
      text-align: center;
      color: white;

      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        width: 1.2rem;
        height: 1.2rem;
        margin: 1.25rem auto 0.4rem;
        border-radius: 50%;
        img {
          width: 100%;
        }
      }
      .name {
        font-size: 0.36rem;
      }

    }
    .item {
      position: relative;
      line-height: 0.88rem;
      margin-top: 0.05rem;
      padding: 0 0.35rem;
      background-color: white;
      font-size: 0.28rem;
      a {
        display: block;
        color: #979797;
      }
      &:after {
        content: '';
        position: absolute;
        width: 0.88rem;
        height: 0.88rem;
        top: 0;
        right: 0;
        background: url("../assets/images/ico-right.png") center / 30% no-repeat;
      }
      .point {
        position: absolute;
        width: 10px;
        height: 10px;
        top: 0.18rem;
        left: 1.5rem;
        margin-left: 0.08rem;
        border-radius: 5px;
        background-color: red;
      }
    }
    .btn-logout {
      display: none;
      width: 100%;
      height: 0.88rem;
      margin-top: 0.05rem;
      background-color: white;
      color: #ea5513;
      font-size: 0.28rem;
    }
  }
</style>

<template>
  <div class="page-my">
    <div class="info">
      <div class="avatar">
        <img v-if="user.avatar" src="user.avatar">
        <img v-else src="../assets/images/portrait.png">
      </div>
      <p class="name">{{user.nickName}}</p>
    </div>
    <div class="item">
      <router-link to="/my/edit">个人资料</router-link>
    </div>
    <div class="item">
      <router-link to="/message">通知中心</router-link>
      <i class="point" v-if="user.unreadNotify"></i>
    </div>
    <div class="item">
      <router-link to="/contact">联系客服</router-link>
    </div>
    <div class="item">
      <router-link to="/about">关于我们</router-link>
    </div>
    <button class="btn-logout" @click="logout">退出登录</button>

    <div>
      <my-footer tab="my"></my-footer>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'
  import footer from '../components/Footer'

  export default {
    data(){
      return {
        user: {}
      }
    },
    mounted(){
      api.user.getUserInfo().then((r) => {
        if (r.success) {
          this.user = r.value;
          this.$store.dispatch('setUser',this.user);
        }
        else {
          Toast({
            message: r.message,
            duration: 1500
          });

          setTimeout(()=> {
            this.$router.push('/login');
          }, 2000);
        }
      })
    },
    methods: {
      logout(){
        api.user.logout().then((r) => {
          if (r.success) {
            Toast({
              message: '退出成功',
              duration: 1500
            });
            setTimeout(() => {
              this.$router.push('/login');
            }, 2000);
          }
          else {
            Toast(r.message);
          }
        }, (r) => {
          Toast('failed');
        })
      }
    },
    components: {
      'my-footer': footer
    }
  }
</script>
