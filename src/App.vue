<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="less">
  @import url("//unpkg.com/mint-ui/lib/style.css");
  @import "less/common";
</style>
