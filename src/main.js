// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import './assets/css/material-icons.css'
import requestHybird from './assets/lib/hybird'

Vue.use(MuseUI);
Vue.prototype.requestHybird = requestHybird;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
