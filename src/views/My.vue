<style lang='scss' rel="stylesheet/scss" scoped>
  .page-my {
    .info {
      position: relative;
      height: 2.58rem;
      background-color: #ea5513;
      text-align: center;
      color: white;

      display: flex;
      flex-direction: column;
      align-items: center;

      .info-msg {
        position: absolute;
        width: 0.35rem;
        height: 0.27rem;
        left: 0.4rem;
        top: 0.4rem;
        background: url(../assets/images/message.png) center / contain no-repeat;
        .point {
          position: absolute;
          width: 0.2rem;
          height: 0.2rem;
          line-height: 0.2rem;
          top: -0.1rem;
          left: 0.17rem;
          margin-left: 0.08rem;
          border-radius: 50%;
          background-color: #d0021b;
          text-align: center;
          font-size: 0.12rem;
          color: white;
        }
      }
      .info-setting {
        position: absolute;
        width: 0.35rem;
        height: 0.34rem;
        right: 0.4rem;
        top: 0.4rem;
        background: url(../assets/images/setting.png) center / contain no-repeat;
      }
      .avatar {
        width: 1rem;
        height: 1rem;
        margin: 0.8rem auto 0.1rem;
        border-radius: 50%;
        img {
          width: 100%;
        }
      }
      .tel {
        font-size: 0.24rem;
        color: white;
      }

    }
    .btn-logout {
      display: block;
      width: 100%;
      height: 0.88rem;
      margin-top: 0.15rem;
      background-color: white;
      color: #ea5514;
      font-size: 0.28rem;
    }
  }
</style>

<template>
  <div class="page-my">
    <div class="info">
      <router-link to="/my/edit">
        <div class="avatar">
          <img src="../assets/images/portrait.png">
        </div>
        <p class="tel">{{user.tel}}</p>
      </router-link>
      <router-link to="/message" class="info-msg">
        <i class="point" v-if="user.unreadNotify">N</i>
      </router-link>
      <router-link to="" class="info-setting"></router-link>
    </div>

    <div class="item">
      <router-link to="/income">我的收益<span>即时可提</span></router-link>
    </div>
    <div class="item">
      <a href="http://qk.notepasses.com/quanke/sign-in.html">每日签到</a>
    </div>
    <div class="item">
      <router-link to="/my/edit">推荐好友<span>送1000积分</span></router-link>
    </div>
    <div class="item">
      <router-link to="/my/edit">晒单返利<span>返利还赚钱</span></router-link>
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
