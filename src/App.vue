<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keep"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keep"></router-view>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import api from './assets/scripts/api'

  export default {
    mounted(){
      api.user.getUserInfo().then((r) => {
        if (r.success && r.value) {
          this.user = r.value;
          this.$store.dispatch('setUser', this.user);
        }
        else {
          this.unLoggedHandler(r);
        }
      }).catch((r) => {
        if (r.status == 403) {
          this.unLoggedHandler();
        }
      })
    },
    methods: {
      unLoggedHandler(r){
        this.user = {};
        this.$store.dispatch('setUser', {});
//        Toast({
//          message: r && r.message || '请登录',
//          duration: 1500
//        });

//        setTimeout(() => {
//          this.$router.push('/login');
//        }, 2000);
      }
    }
  }
</script>

<style lang='scss'>
  @import './assets/styles/main.scss';
</style>
