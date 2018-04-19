<template>
  <div>
    <router-view></router-view>
    <sub-nav></sub-nav>
  </div>
</template>
<script>
  import common from '../js/common';
  import SubNav from '../components/SubNav'
  export default {
    components: {
      'sub-nav': SubNav
    },
    data() {
      return {}
    },
  }
</script>
