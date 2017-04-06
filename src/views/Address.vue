<style lang='scss' rel="stylesheet/scss" scoped>
  .page-address {
    .item {
      input {
        width: 100%;
        height: 0.88rem;
        font-size: 0.24rem;
        &::-webkit-input-placeholder {
          color: #979797;
        };
      }
      textarea {
        width: 100%;
        height: 1.76rem;
        padding: 0.3rem 0;
        font-size: 0.24rem;
        resize:none;
      }
    }
  }
</style>

<template>
  <div class="page-address">
    <div class="item"><input type="text" v-model="address.name" placeholder="收货人姓名(请使用真实姓名)"></div>
    <div class="item"><input type="text" v-model="address.tel" placeholder="手机号码"></div>
    <div class="item">
      <router-link to="" @click.native="toggleAddress(true)">
        省市区
        <span>{{address.province||'省'}},{{address.city||'市'}},{{address.district||'区'}}</span>
      </router-link>
    </div>
    <div class="item"><textarea placeholder="详细地址" v-modal="address.detail"></textarea></div>

    <!-- 选择省市区 -->
    <addresslist :show='addressVisible' v-on:addressEvent="toggleAddress"></addresslist>

  </div>
</template>

<script>
  import Vue from 'vue'
  import {Toast,Loadmore, Spinner} from 'mint-ui'
  import api from '../assets/scripts/api'
  import footer from '../components/Footer'
  import addresslist from '../components/Address'

  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Spinner.name, Spinner);

  export default {
    data(){
      return {
        id:this.$route.params.id,
        address:{
          name:'熊',
          tel:159,
          province:'浙江省',
          city:'杭州市',
          district:'西湖区',
          detail:'浙大科技园B座410室'
        },
        addressVisible: false
      }
    },
    mounted(){
      if(this.id){
        this.getAddress();
      }
    },
    methods: {
      getAddress(){
        let params = {
          id:this.id
        };
      },
      toggleAddress(arg, selectedItem){
        console.log(arg?'show':'hide');
        this.addressVisible = arg;
        if (selectedItem) {
          this.address.province = selectedItem.province;
          this.address.city = selectedItem.city;
          this.address.district = selectedItem.county;
        }
      }
    },
    components: {
      addresslist
    }
  }
</script>
