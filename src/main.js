import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { Lazyload } from 'mint-ui'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Lazyload);


/* global resources */
import './assets/scripts/rem'
import store from './assets/scripts/store'
import common from './assets/scripts/common'

Vue.prototype.$com = common; // 全局挂载

/* views */
import App from './App'
import Login from './views/Login'
import Bind from './views/Bind'
import Index from './views/Index'
import Item from './views/Item'
import Seckill from './views/Seckill'
import My from './views/My'
import MyEdit from './views/MyEdit'
import Income from './views/Income'
import Withdraw from './views/Withdraw'
import Address from './views/Address'
import Message from './views/Message'
import MessageDetail from './views/MessageDetail'
import About from './views/About'
import Contact from './views/Contact'
import Mall from './views/Mall'
import Search from './views/Search'

const routes = [
  {path: '/login', component: Login,meta:{title:'登录'}},
  {path: '/bind', component: Bind,meta:{title:'手机绑定'}},
  {path: '/',  redirect: '/index'},
  {path: '/index', component: Index,meta: {keep:true,title:'券客商城'}},
  {path: '/item/:id', component: Item,meta:{title:'券客商城'}},
  {path: '/seckill', component: Seckill,meta:{keep:true,title:'秒杀中心'}},
  {path: '/my', component: My,meta:{title:'个人中心'}},
  {path: '/my/edit', component: MyEdit,meta:{title:'修改资料'}},
  {path: '/message', component: Message,meta:{title:'通知中心'}},
  {path: '/message/:id', component: MessageDetail,meta:{title:'通知详情'}},
  {path: '/income',component:Income,meta:{title:'我的收益'}},
  {path: '/withdraw',component:Withdraw,meta:{title:'申请提现'}},
  {path: '/address',component:Address,meta:{title:'收货地址'}},
  {path: '/about', component: About,meta:{title:'关于我们'}},
  {path: '/contact', component: Contact,meta:{title:'联系客服'}},
  {path: '/mall', component: Mall,meta:{title:'积分商城'}},
  {path: '/search', component: Search,meta:{keep:true,title:'搜索'}},
  {path: '/search/:cid', component: Search,meta:{keep:true,title:'搜索'}},
];

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});

router.beforeEach((to, from, next) => {
  let title = to.meta.title;
  common.setTitle(title);

  // index -> search
  if(to.path == '/search' && from.path == '/index'){
    to.meta.clear = true;
  }
  else {
    to.meta.clear = false;
  };

  // item -> index/seckill/search 保持滚动状态
  if(from.path.indexOf('/item')>=0){
    if(to.path == '/index' || to.path == '/seckill' || to.path.indexOf('/search')>=0){
      to.meta.stay = true;
    }
    else {
      to.meta.stay = false;
    }
  }
  else {
    to.meta.stay = false;
  }

  next();
})

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
