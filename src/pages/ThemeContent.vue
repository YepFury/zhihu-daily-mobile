<template>
  <div>
    <c-header>
      <span slot="sub">
        <i class="icon-other" @click="showSub"></i>
      </span>
      <span slot="title">{{title}}</span>
    </c-header>
    <div class="post">
      <img :src="postImg" alt="">
      <p>{{description}}</p>
    </div>
    <div class="edit">
      <span>主编</span>
      <ul class="edit-list">
        <li v-for="(editor, i) in editors" :key="i">
          <img src="http://pic1.zhimg.com/da8e974dc_m.jpg" alt="">
        </li>
      </ul>
    </div>
    <div class="news">
      <div class="news-card" v-for="(story, index) in stories" :key="index"  @click="getDetail(story.id)">
        <div class="news-title">{{story.title}}</div>
        <img v-if="story.images" :src="story.image" alt="">
      </div>
    </div>

  </div>
</template>
<script>
  import bus from '../js/bus';
  import common from '../js/common';
  import CHeader from  '../components/CHeader'
  export default {
    components: {
      'c-header': CHeader
    },
    data() {
      return {
        title: '',
        postImg: '',
        description: '',
        editors: null,
        stories: null
      }
    },
    methods: {
      showSub() {
        bus.$emit('getShowSub', false)
      },
      getDetail(id) {
        this.$router.push({
          path: '/detail',
          name: 'detail',
          params: {
            id: id
          }
        })
      }
    },
    mounted() {
      this.$axios.get('/4/theme/' + this.$route.params.id).then(res => {
        this.title = res.data.name;
        this.postImg = common.getImage(res.data.image);
        this.description = res.data.description;
        this.editors = res.data.editors;
        const stories = res.data.stories.map((item, index) => {
          if (item.images) {
            item.image = item.images[0];
          }
          else {
            item.image = '';
          }
          return item;
        })
        this.stories = stories;
      })
    }
  }
</script>
<style lang="less" scoped>
  @import "../less/theme-content";
</style>
