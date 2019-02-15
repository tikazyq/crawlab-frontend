import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '../views/layout/Layout'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/', redirect: '/home' },

  // Crawlab Pages
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/home/Home'),
        meta: {
          title: 'Home',
          icon: 'fa fa-home'
        }
      }
    ]
  },
  {
    name: 'Node',
    path: '/nodes',
    component: Layout,
    meta: {
      title: 'Node',
      icon: 'fa fa-server'
    },
    children: [
      {
        path: 'list',
        name: 'NodeList',
        component: import('../views/node/NodeList'),
        meta: {
          title: 'Node List',
          icon: 'fa fa-circle-o'
        }
      },
      {
        path: 'detail',
        name: 'NodeDetail',
        component: import('../views/node/NodeDetail'),
        meta: {
          title: 'Node Detail',
          icon: 'fa fa-circle-o'
        }
      }
    ]
  },
  {
    name: 'Spider',
    path: '/spiders',
    component: Layout,
    meta: {
      title: 'Spider',
      icon: 'fa fa-bug'
    },
    children: [
      {
        path: 'list',
        name: 'SpiderList',
        component: import('../views/spider/SpiderList'),
        meta: {
          title: 'Spider List',
          icon: 'fa fa-circle-o'
        }
      },
      {
        path: 'detail',
        name: 'SpiderDetail',
        component: import('../views/spider/SpiderDetail'),
        meta: {
          title: 'Spider Detail',
          icon: 'fa fa-circle-o'
        }
      }
    ]
  },
  {
    name: 'Deploy',
    path: '/deploys',
    component: Layout,
    meta: {
      title: 'Deploy',
      icon: 'fa fa-cloud'
    },
    children: [
      {
        path: 'list',
        name: 'DeployList',
        component: import('../views/deploy/DeployList'),
        meta: {
          title: 'Deploy List',
          icon: 'fa fa-circle-o'
        }
      },
      {
        path: 'detail',
        name: 'DeployDetail',
        component: import('../views/deploy/DeployDetail'),
        meta: {
          title: 'Deploy Detail',
          icon: 'fa fa-circle-o'
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
