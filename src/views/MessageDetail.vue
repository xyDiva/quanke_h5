<style lang='scss' rel="stylesheet/scss" scoped>
  .page-message {
    height: 100%;
    background-color: white;
    .msg-item {
      height: auto;
      border-bottom: 0;
      .row:nth-child(1) {
        padding-bottom: 0.3rem;
        margin-bottom: 0.4rem;
        border-bottom: #969696 1px solid;
      }
      .content {
        color: black;
        word-break:break-all;
      }
    }
  }
</style>

<template>
  <div class="page-message">
    <div class="msg-item">
      <div class="row">
        <div class="title" :class="{'ico-type1':item.type==1,'ico-type2':item.type==2}">{{item.title}}</div>
        <div class="time">{{item.createTime|convertTime}}</div>
      </div>
      <div class="row content" v-html="item.content"></div>
    </div>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'

  export default {
    data(){
      return {
        user:this.$store.state.user
      }
    },
    computed: {
      item(){
        return this.$store.state.msg
      }
    },
    filters: {
      convertTime(timestamp){
        var date = new Date(timestamp);
        var month = date.getMonth() + 1,
          day = date.getDate(),
          hour = date.getHours(),
          minute = date.getMinutes();

        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;

        return month + '-' + day + ' ' + hour + ':' + minute;
      }
    },
    updated(){
      this.save();
    },
    methods:{
      save(){
        let unreadNotify = this.user.unreadNotify;
        if(unreadNotify&&unreadNotify.indexOf(this.item.id) >= 0) {
          api.notify.save(this.item.id).then((r) => {
            if (!r.success) {
              Toast(r.message);
            }
          })
        }
      }
    }
  }
</script>
