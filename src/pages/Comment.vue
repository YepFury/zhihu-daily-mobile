<template>
  <div>
    <c-header>
      <span slot="sub">
        <i class="icon-back" @click="goForward"></i>
      </span>
      <span slot="title">{{long + short}}条点评</span>
      <span slot="icon" class="fr">
        <i class="icon-edit"></i>
      </span>
    </c-header>
    <div class="main">
      <div class="title" @click="isShow = !isShow">{{long}}条长评</div>
      <div class="content" v-show="!isShow">
        <ul>
          <li class="clearfix" v-for="(lComment, index) in longList" :key="lComment.id">
            <div class="avatar">
              <img :src="lComment.image" alt="">
            </div>
            <div class="content">
              <div class="name">{{lComment.author}}</div>
              <p>{{lComment.content}}</p>
              <span>{{lComment.time | dateFormate}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="title" @click="isShow = !isShow">{{short}}条短评</div>
      <div class="content" v-show="isShow">
        <ul>
          <li class="clearfix" v-for="(lComment, index) in shortList" :key="lComment.id">
            <div class="avatar">
              <img :src="lComment.image" alt="">
            </div>
            <div class="content">
              <div class="name">{{lComment.author}}</div>
              <p>{{lComment.content}}</p>
              <span>{{lComment.time | dateFormate}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import common from '../js/common'
  import CHeader from '../components/CHeader'
  export default {
    components: {
      'c-header': CHeader
    },
    data() {
      return {
        long: 0,
        short: 0,
        longList: null,
        shortList: null,
        isShow: false
      }
    },
    methods: {
      goForward() {
        this.$router.go(-1);
      },
    },
    filters: {
      dateFormate(value) {
        return common.dateFmt(new Date(value * 1000))
      }
    },
    created() {
      this.$axios.get('/4/story/' + this.$route.params.id + '/long-comments').then(res => {
        this.long = res.data.comments.length;
        res.data.comments.map((item, index) => {
          item.image = common.getImage(item.avatar)
          return item;
        })
        this.longList = res.data.comments
      });
      this.$axios.get('/4/story/' + this.$route.params.id + '/short-comments').then(res => {
        this.short = res.data.comments.length;
        res.data.comments.map((item, index) => {
          item.image = common.getImage(item.avatar)
          return item;
        })
        this.shortList = res.data.comments
      })
    }
  }
</script>
<style lang="less" scoped>
  @import "../less/comment";
</style>
