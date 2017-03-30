<style lang='scss' rel="stylesheet/scss">
  .page-message {
    .item {
      height: 1.86rem;
      padding: 0.25rem 0.3rem;
      border-bottom: #969696 1px solid;
      background-color: white;
      font-size: 0.18rem;
      color: #979797;
      a {
        color: #979797;
      }
      .row:nth-child(1) {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
      }
      .title {
        flex: 1;
        -webkit-flex: 1;
        padding-left: 0.55rem;
        padding-right: 0.05rem;
        line-height: 0.35rem;
        color: black;
        font-size: 0.24rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background-position: left center;
        background-size: 0.35rem;
        background-repeat: no-repeat;

        &.ico-type1 {
          background-image: url("../assets/images/ico-type1.png");
        }
        &.ico-type2 {
          background-image: url("../assets/images/ico-type2.png");
        }
      }
      .time {
        width: 0.85rem;
        line-height: 0.35rem;
        text-align: right;
      }
      .content {
        margin: 0 0.55rem;
        &:after {
          content: '...';
        }
        .container {
          max-height: 0.6rem;
          overflow: hidden;
        }
      }
    }
  }
</style>

<template>
  <div class="page-message">
    <div class="item" v-if="list.length" v-for="(item,index) in list" @click="setMsg(item)">
      <router-link :to="'/message/'+(item.id)">
        <div class="row">
          <div class="title" :class="{'ico-type1':item.type==1,'ico-type2':item.type==2}">{{item.title}}</div>
          <div class="time">{{item.createTime|convertTime}}</div>
        </div>
        <div class="row content">
          <div class="container" v-html="item.content"></div>
        </div>
      </router-link>
    </div>
    <div class="no-data" v-else>
      暂无记录
    </div>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'

  export default {
    data(){
      return {
        list: []
      }
    },
    mounted(){
      this.getList();
    },
    methods: {
      getList(){
        api.notify.query().then((r) => {
          if (r.success) {
            this.list = r.list || [];
          }
          else {
            Toast(r.message);
          }
        })
      },
      setMsg(item){
        this.$store.dispatch('setMsg', item);
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
    }
  }
</script>
