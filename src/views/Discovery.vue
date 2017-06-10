<template>
  <div class="page-discovery">
    <div @click="toList(list1[0])"><img :src="list1[0]&&list1[0].pic" width="100%"></div>
    <ul class="flex flex-wrap">
      <li v-for="item in list2">
        <div @click="toList(item)"><img :src="item.pic" width="100%"></div>
      </li>
    </ul>
    <ul class="flex flex-wrap">
      <li>
        <div @click="toList(list1[1])"><img :src="list1[1]&&list1[1].pic" width="100%"></div>
      </li>
      <li>
        <div @click="toList(list1[2])"><img :src="list1[2]&&list1[2].pic" width="100%"></div>
      </li>
    </ul>
    <div @click="toList(list1[3])"><img :src="list1[3]&&list1[3].pic" width="100%"></div>
    <ul class="flex flex-wrap">
      <li>
        <div @click="toList(list1[4])"><img :src="list1[4]&&list1[4].pic" width="100%"></div>
      </li>
      <li>
        <div @click="toList(list1[5])"><img :src="list1[5]&&list1[5].pic" width="100%"></div>
      </li>
      <li>
        <div @click="toList(list1[6])"><img :src="list1[6]&&list1[6].pic" width="100%"></div>
      </li>
      <li>
        <div @click="toList(list1[7])"><img :src="list1[7]&&list1[7].pic" width="100%"></div>
      </li>
    </ul>
    <div class="wrap-footer">
      <my-footer tab="discovery"></my-footer>
    </div>
  </div>
</template>

<script>
  import api from '../assets/scripts/api'
  import footer from '../components/Footer'
  export default {
    data(){
      return {
        list1: [],
        list2: []
      }
    },
    mounted(){
      api.channel.query().then((r) => {
        const list = r.list || [];
        list.forEach((item) => {
          item.pic = api.banner.getImg(item.listPic);
          if (item.type == 1) {
            this.list1.push(item);
          }
          else if (item.type == 2) {
            this.list2.push(item);
          }
        });
      })
    },
    methods: {
      toList(channel) {
        this.$store.dispatch('setChannel', channel);
        this.$router.push('discovery/' + channel.id);
      }
    },
    components: {
      'my-footer': footer
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  .page-discovery {
    font-size: 0;
    ul {
      li {
        width: 50%;
        margin-bottom: 1px;
      }
    }
  }
</style>
