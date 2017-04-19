<style lang='scss' rel="stylesheet/scss" scoped>
  .page-address {
    .item {
      input {
        width: 100%;
        height: 0.88rem;
        font-size: 0.24rem;
        &::-webkit-input-placeholder {
          color: #979797;
        }
      }
      textarea {
        width: 100%;
        height: 1.76rem;
        padding: 0.3rem 0;
        font-size: 0.24rem;
        resize: none;
      }
    }
    .btn-save {
      margin-top: 0.15rem;
    }
  }
</style>

<template>
  <div class="page-address">
    <div class="item"><input type="text" v-model="o.name" placeholder="收货人姓名(请使用真实姓名)"></div>
    <div class="item"><input type="text" v-model="o.tel" placeholder="手机号码"></div>
    <div class="item">
      <router-link to="" @click.native="toggleAddress(true)">
        省市区
        <span>{{o.province||'省'}},{{o.city||'市'}},{{o.country||'区'}}</span>
      </router-link>
    </div>
    <div class="item"><textarea placeholder="详细地址" v-model="o.address"></textarea></div>

    <button class="btn btn-save" @click="save">保存</button>

    <!-- 选择省市区 -->
    <addresslist :show='addressVisible' v-on:addressEvent="toggleAddress"></addresslist>

  </div>
</template>

<script>
  import Vue from 'vue'
  import {Toast, Loadmore, Spinner} from 'mint-ui'
  import api from '../assets/scripts/api'
  import footer from '../components/Footer'
  import addresslist from '../components/Address'

  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Spinner.name, Spinner);

  export default {
    data(){
      return {
        user: this.$store.state.user,
        o: {
          name: '',
          tel: '',
          province: '',
          provinceId: '',
          city: '',
          cityId: '',
          country: '',
          countryId: '',
          address: ''
        },
        addressVisible: false
      }
    },
    mounted(){
      this.getAddress();
    },
    methods: {
      getAddress(){
        api.address.getAddress(this.user.id).then((r) => {
          if (r.success) {
            this.o = r.value;
          }
          else {
            Toast(r.message);
          }
        });
      },
      toggleAddress(arg, selectedItem){
        this.addressVisible = arg;
        if (selectedItem) {
          this.o.province = selectedItem.province;
          this.o.provinceId = selectedItem.provinceId;
          this.o.city = selectedItem.city;
          this.o.cityId = selectedItem.cityId;
          this.o.country = selectedItem.county;
          this.o.countryId = selectedItem.countyId;
        }
      },
      save(){
        api.address.save(this.o).then((r) => {
          if (r.success) {
            Toast({
              message: '保存成功',
              duration: 1500
            });
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
          else {
            Toast(r.message);
          }
        })
      }
    },
    components: {
      addresslist
    }
  }
</script>
