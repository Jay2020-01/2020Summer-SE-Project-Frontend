import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Register from '../components/Register.vue'
import WorkingTable from '../components/working_table/WorkingTable.vue'
import MyInfo from '../components/myinfo/MyInfo.vue'
import Inbox from '../components/working_table/In-box.vue'
import Mydesktop from '../components/working_table/My-desktop.vue'
import Editor from '../components/editor/Editor.vue'
import Recyclebin from '../components/working_table/Recycle-bin.vue'
import Team1 from '../components/working_table/team1.vue'
import Team2 from '../components/working_table/team2.vue'
import Templates from '../components/working_table/Templates.vue'
import ceshi from '../components/working_table/ceshi.vue'
import template1 from '../components/working_table/templates/1.vue'
import template2 from '../components/working_table/templates/2.vue'
import template3 from '../components/working_table/templates/3.vue'
import template4 from '../components/working_table/templates/4.vue'

import store from '../store/index.js'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  // { path: '/editor', component: Editor },
  { path: '/editor', component: Editor, meta: { requiresAuth: true } },
  {
    path: '/home',
    redirect: '1',
    component: Home,
    children: [
      { path: '/1', component: WorkingTable, meta: { requiresAuth: true } },
      { path: '/myinfo', component: MyInfo, meta: { requiresAuth: true } },
      { path: '/2', component: Inbox, meta: { requiresAuth: true } },
      { path: '/3', component: Mydesktop, meta: { requiresAuth: true } },
      { path: '/4-1', component: Team1, meta: { requiresAuth: true } },
      { path: '/4-2', component: Team2, meta: { requiresAuth: true } },
      { path: '/5', component: Recyclebin, meta: { requiresAuth: true } },
      { path: '/100', component: Templates, meta: { requiresAuth: true } },
      { path: '/101', component: template1, meta: { requiresAuth: true } },
      { path: '/102', component: template2, meta: { requiresAuth: true } },
      { path: '/103', component: template3, meta: { requiresAuth: true } },
      { path: '/104', component: template4, meta: { requiresAuth: true } },
      { path: '/200', component: ceshi, meta: { requiresAuth: true } },
    ],
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (store.getters.isLoggedIn) {
//             next()
//             return
//         }
//         console.log(2222)
//         next('/login')
//     } else {
//         next()
//     }
// })

export default router