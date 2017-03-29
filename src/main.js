import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { Lazyload } from 'mint-ui'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Lazyload);


/* global resources */
import './assets/scripts/rem.js'
import store from './assets/scripts/store'

/* views */
import App from './App'
import Login from './views/Login'
import Index from './views/Index'
import Item from './views/Item'
import Seckill from './views/Seckill'
import My from './views/My'
import MyEdit from './views/MyEdit'
import Message from './views/Message'
import MessageDetail from './views/MessageDetail'
import About from './views/About'
import Contact from './views/Contact'
import Mall from './views/Mall'
import Search from './views/Search'

const routes = [
  {path: '/login', component: Login},
  {path: '/', component: Index,meta: {keep:true}},
  {path: '/index', component: Index,meta: {keep:true}},
  {path: '/item/:id', component: Item},
  {path: '/seckill', component: Seckill},
  {path: '/my', component: My},
  {path: '/my/edit', component: MyEdit},
  {path: '/message', component: Message},
  {path: '/message/:id', component: MessageDetail},
  {path: '/about', component: About},
  {path: '/contact', component: Contact},
  {path: '/mall', component: Mall},
  {path: '/search', component: Search},
  {path: '/search/:cid', component: Search}
];

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
