<template>
  <div>
    <c-header>
      <span slot="sub">
        <i class="icon-back" @click="goForward"></i>
      </span>
      <span slot="icon">
        <i class="icon-share"></i>
        <i class="icon-collection" :class="{collectioned: isCollected}" @click="isCollected = !isCollected"></i>
        <span class="can-click" @click="getComment">
          <i class="icon-disscuss"></i>{{comments}}
        </span>
        <span class="can-click" @click="clickPop">
          <i class="icon-praise" :class="{praised: isPraised}"></i>{{popularity}}
        </span>
      </span>
    </c-header>
    <div class="post">
      <img :src="postImg" alt="">
      <p>{{title}}</p>
      <span>{{imgSource}}</span>
    </div>
    <div class="body" v-html="mainContent" ref="body"></div>
  </div>
</template>
<script>
  import common from '../js/common'
  import CHeader from  '../components/CHeader'
  import {Toast} from 'mint-ui'
  export default {
    components: {
      'c-header': CHeader
    },
    data() {
      return {
        isCollected: false,
        isPraised: false,
        comments: 0,
        popularity: 0,
        mainContent: '',
        postImg: '',
        title: '',
        imgSource: ''
      }
    },
    methods: {
      goForward() {
        this.$router.go(-1);
      },
      clickPop() {
        if (!this.isPraised) {
          Toast({
            message: this.popularity + ' + 1',
            className: 'toast-class',
            iconClass: 'icon-praise',
            duration: 1200
          });
          this.popularity += 1;
          this.isPraised = !this.isPraised
        }
        else {
          this.popularity -= 1;
          this.isPraised = !this.isPraised
        }
      },
      getComment() {
        this.$router.push({
          path: '/comment',
          name: 'comment',
          params: {
            id: this.$route.params.id
          }
        })
      }
    },
    mounted() {
      const id = this.$route.params.id;
      this.$axios.get('/4/news/' + id).then(res => {
        this.mainContent = res.data.body.replace(/src=\"https:\/\/|src=\"http:\/\//g, 'src=\"https://images.weserv.nl/?url=');
        this.postImg = common.getImage(res.data.image);
        this.title = res.data.title;
        this.imgSource = res.data.image_source;
      });
      this.$axios.get('/4/story-extra/' + id).then(res => {
        this.comments = res.data.comments;
        this.popularity = res.data.popularity;
      })
    }
  }
</script>
<style lang="less">
  @import "../less/c-header";
  @import "../less/detail";
</style>
