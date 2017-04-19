<style lang="scss" rel="stylesheet/scss" scoped>
  .address-list {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #f9f9f9;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
</style>

<template>
  <div class="address-list" v-if="show">
<!--     <mt-header title="选择省份">
      <router-link to="" slot="left" @click.native="back">
        <mt-button icon="back">编辑资料</mt-button>
      </router-link>
    </mt-header> -->
    <div class="list">
      <div class="item" v-for="item in provinces" v-if="type=='provinces'" @click="selectItem(item.id,item.name)">
        <a href="javascript:;">{{item.name}}</a> 
      </div>
      <div class="item" v-for="item in cities" v-if="type=='cities'" @click="selectItem(item.id,item.name)">
        <a href="javascript:;">{{item.name}}</a> 
      </div>
      <div class="item" v-for="item in counties" v-if="type=='counties'" @click="selectItem(item.id,item.name)">
        <a href="javascript:;">{{item.name}}</a> 
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {Toast} from 'mint-ui'
  import api from '../assets/scripts/api'

  export default {
    props: ['show'],
    data () {
      return {
        type: 'provinces',
        provinces: [],
        cities: [],
        counties: [],
        selectedItem: {
          province: '',
          provinceId:'',
          city: '',
          cityId:'',
          county: '',
          countyId:''
        }
      }
    },
    mounted(){
      // 获取省份列表
      this.getList();
    },
    methods: {
      getList(id){
        if (!id) {
          id = -1;
        }
        api.address.listDistrict(id).then((r)=> {
          if (r.success) {
            this[this.type] = r.list;
          }
          else {
            Toast(r.message);
          }
        });
      },
      selectItem(id, name){
        if (this.type == 'provinces') {
          this.type = 'cities';
          this.selectedItem.province = name;
          this.selectedItem.provinceId = id;
          this.getList(id);
        }
        else if (this.type == 'cities') {
          this.type = 'counties';
          this.selectedItem.city = name;
          this.selectedItem.cityId = id;
          this.getList(id);
        }
        else if (this.type == 'counties') {
          this.selectedItem.county = name;
          this.selectedItem.countyId = id;
          this.type = 'provinces';
          this.$emit('addressEvent', false, this.selectedItem);
        }
      },
      back(){
        if (this.type == 'provinces') {
          this.$emit('addressEvent', false);
        }
        else if (this.type == 'cities') {
          this.cities = [];
          this.type = 'provinces';
        }
        else if (this.type == 'counties') {
          this.counties = [];
          this.type = 'cities';
        }
      }
    }
  }
</script>
