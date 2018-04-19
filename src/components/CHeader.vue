<template>
  <header>
    <slot name="sub"></slot>
    <slot name="title">{{title}}</slot>
    <slot name="icon"></slot>
  </header>
</template>
<script>
  import bus from '../js/bus'
  export default {
    data() {
      return {
        title: ''
      }
    },
    created() {
      bus.$on('getTitle', res => {
        this.title = res
      })
    }
  }
</script>
<style lang="less" scoped>
  @import "../less/c-header";
</style>
