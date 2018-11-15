// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import Recommend from './components/Recommend';
import Filter from './assets/Filter.js';
import ListDetails from './components/ListDetails';
import Market from './components/Market';
import RecommendTopLists from './components/RecommendTopLists';
import RecommendMV from './components/RecommendMV';
import SongDetails from './components/SongDetails';
import RecommendListDetails from './components/RecommendListDetails';
import MvDetails from './components/MvDetails';
import SearchResult from './components/SearchResult'


Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.productionTip = false;

/* eslint-disable no-new */
const router = new VueRouter({
    routes: [
      {path: "/register", component: Register},
      {path: "/home", component: Home},
      {path: "/login", component: Login},
      {path: '/recommend', component: Recommend},
      {path: '/listdetails', component: ListDetails},
      {path: '/market', component: Market},
      {path: '/toplist', component: RecommendTopLists},
      {path: '/mv', component: RecommendMV},
      {path: '/details', component: SongDetails},
      {path: '/recommendlistdetails',component: RecommendListDetails},
      {path: '/mvdetails', component: MvDetails},
      {path: '/result', component: SearchResult}
    ],
  mode: "history"
})


new Vue({
  el: '#app',
  render: h => h(App),
  components: { App },
  router,
  template: '<App/>',
})
