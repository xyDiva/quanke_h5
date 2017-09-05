<template>
  <div class="b">
    <p>content from component a blow:</p>
    <p>{{content}}</p>
  </div>

</template>

<script>
  import bus from '../assets/scripts/bus'
  export default {
    data(){
      return {
        content:''
      }
    },
    created() {
      bus.$on('a-event', (a) => {
        this.content = a;
      });
    }
  }
</script>

<style>
  .b {
    padding: 10px;
    border-top: black 1px solid;
    border-bottom: black 0.01rem solid;
  }
</style>
