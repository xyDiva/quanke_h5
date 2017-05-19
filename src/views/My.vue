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
      .name {
        font-size: 0.24rem;
        color: white;
      }
    }
    .btn-logout {
      display: none;
      margin-top: 0.15rem;
    }
  }
</style>

<template>
  <div class="page-my">
    <div class="info">
      <router-link to="/my/edit">
        <div class="avatar">
          <img :src="user.avatar">
        </div>
        <p class="name">{{user.nickName}}</p>
      </router-link>
      <router-link to="/message" class="info-msg">
        <i class="point" v-if="user.unreadNotify">N</i>
      </router-link>
      <router-link to="/my/edit" class="info-setting"></router-link>
    </div>

    <div class="item">
      <router-link to="/income">我的收益<span>即时可提</span></router-link>
    </div>
    <div class="item" @click="checkBeforeRoute(1)">
      <a href="javascript:;" id="qdLink">每日签到</a>
    </div>
    <div class="item" @click="checkBeforeRoute(2)">
      <router-link to="/invite">推荐好友<span>送1000积分</span></router-link>
    </div>
    <div class="item" @click="checkBeforeRoute(3)">
      <router-link to="/order">晒单返利<span>返利还赚钱</span></router-link>
    </div>
    <div class="item">
      <router-link to="/contact">联系客服</router-link>
    </div>
    <div class="item">
      <router-link to="/about">关于我们</router-link>
    </div>
    <button class="btn btn-logout" @click="logout">退出登录</button>

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
          this.$store.dispatch('setUser', this.user);
        }
        else {
          this.user = {};
          this.$store.dispatch('setUser', {});
          Toast({
            message: r.message,
            duration: 1500
          });

          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        }
      })
    },
    methods: {
      checkBeforeRoute(idx){
        if (!this.user.tel) {
          if (idx == 1) {
            this.$router.push('/bind');
          }
          else {
            this.$router.replace('/bind');
          }
        }
        else {
          if (idx == 1) {
            let href = '';
            if(api.mode == 0 || api.mode == 1) {
              href = 'http://qk.notepasses.com/quankeTest/sign-in.html';
            }
            else if (api.mode == 2) {
              href = 'http://qk.notepasses.com/quanke/sign-in.html';
            }
            document.getElementById('qdLink').href = href;
          }
          else if (idx == 2) {
            if (this.user.pid === ''||this.user.pid === undefined || this.user.id === null) {
              this.$router.push('/inviteCode');
            }
          }
        }
      },
      logout(){
        api.user.logout().then((r) => {
          if (r.success) {
            this.$store.dispatch('setUser', {});
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
