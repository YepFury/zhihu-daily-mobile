<template>
  <div class="sub-nav" @click.stop="handleEvent" :class="{hide:isShow}">
    <div class="sub-nav-container">
      <div class="user">
        <img src="../images/logo.png" alt="">
        <span>有丶东西</span>
      </div>
      <div class="collect">
        <i class="icon-collection"></i>
        <span>我的收藏</span>
      </div>
      <ul class="sub-list">
        <li v-for="(sub,index) in subLists" :key="sub.id" @click="getThemeContent(sub.id, sub.name)">
          <span>{{sub.name}}</span>
          <i class="icon-add"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import bus from '../js/bus'
  export default {
    data() {
      return {
        isShow: true,
        subLists: null
      }
    },
    methods: {
      getThemeContent(id, name) {
        bus.$emit('getTitle', name);
        this.$router.push({
          path: '/theme',
          name: 'theme',
          params: {
            id: id
          }
        });
      },
      handleEvent() {
        this.isShow = true;
      }
    },
    created() {
      bus.$on('getShowSub', res => {
        this.isShow = res
      })
      this.$axios.get('/4/themes').then(res => {
        this.subLists = res.data.others;
      })
    }
  }
</script>
<style lang="less" scoped>
  @import "../less/c-sub-nav";
</style>
