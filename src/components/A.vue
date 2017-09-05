<template>
  <button @click="aEventHandle">click me</button>
</template>

<script>
  import bus from '../assets/scripts/bus'
  export default {
    methods: {
      aEventHandle(){
        bus.$emit('a-event','我是来自a的数据')
      }
    }
  }
</script>
