import Vue from 'vue'
import Router from 'vue-router'
import rank from 'components/rank/rank'
import recommend from 'components/recommend/recommend'
import search from 'components/search/search'
import singer from 'components/singer/singer'
import singerDetail from 'components/singer-detail/singer-detail'
Vue.use(Router)

export default new Router({
  routes: [
    /* 默认 */
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      component: rank
    },
    {
      path: '/recommend',
      component: recommend
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/singer',
      component: singer,
      children: [{
        path: ':id',
        component: singerDetail
      }]
    },
  ]
})
