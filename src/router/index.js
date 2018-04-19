import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import ThemeContent from '@/pages/ThemeContent'
import FirstPage from '@/pages/FirstPage'
import Detail from '@/pages/Detail'
import Comment from '@/pages/Comment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children:[
        {
          path: '/',
          name: 'first',
          component: FirstPage
        },{
          path: '/theme',
          name: 'theme',
          component: ThemeContent
        },{
          path: '/detail',
          name: 'detail',
          component: Detail
        },{
          path: '/comment',
          name: 'comment',
          component: Comment
        }
      ]
    }
  ]
})
