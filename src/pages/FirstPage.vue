<template>
  <div>
    <c-header>
      <span slot="sub">
        <i class="icon-other" @click="showSub"></i>
      </span>
      <span slot="title">{{title}}</span>
      <span slot="icon">
        <i class="icon-switch"></i>
        <i class="icon-msg"></i>
      </span>
    </c-header>
    <div class="scroll-container">
      <div class="swiper" style="color: #123;">
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="(swiper,index) in swiperList" :key="swiper.id">
            <img :src="swiper.image" alt="">
            <p>{{swiper.title}}</p>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <mt-loadmore ref="loadmore" :bottom-method="loadBottom" :bottom-all-loaded="isBottom">
        <div class="news" v-for="(dataObj, index) in dataLists" :key="index">
          <div class="title">{{dataObj.title}}</div>
          <div class="news-card" v-for="(news, i) in dataObj.data" :key="news.id" @click="getDetail(news.id)">
            <div class="news-title">{{news.title}}</div>
            <img :src="news.image" alt="">
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  import bus from '../js/bus';
  import common from '../js/common';
  import CHeader from '../components/CHeader';
  export default {
    components: {
      'c-header': CHeader
    },
    data() {
      return {
        title: '首页',
        swiperList: null,
        currentIndex: 0,
        dataLists: [],
        isBottom: false,
      }
    },
    methods: {
      showSub() {
        bus.$emit('getShowSub', false)
      },
      loadBottom() {
        this.getMore();
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      getMore() {
        if (this.currentIndex > 4) {
          this.isBottom = true;
        }
        if (!this.isBottom) {
          const date = new Date().getTime() - parseInt(24 * 60 * 60 * 1000 * this.currentIndex)
          const prama = common.parmaFmt(new Date(date))
          this.$axios.get('/4/news/before/' + prama).then(res => {
            res.data.stories.map((item, index) => {
              item.image = common.getImage(item.images[0])
            })
            const newsObj = {};
            newsObj.title = common.titleFmt(new Date(date));
            newsObj.data = res.data.stories;
            this.dataLists.push(newsObj)
            this.currentIndex++;
          })
        }
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
      this.$axios.get('/4/news/latest').then(res => {
        res.data.stories.map((item, index) => {
          item.image = common.getImage(item.images[0])
        })
        this.swiperList = res.data.stories.slice(0, 5);
        const newsObj = {};
        newsObj.title = '今日热闻';
        newsObj.data = res.data.stories;
        this.dataLists.push(newsObj)
      });
    }
  }
</script>
<style lang="less">
  @import "../less/first-page";
</style>
