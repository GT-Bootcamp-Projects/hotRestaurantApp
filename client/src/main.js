import Vue from 'vue'
import Vuetify from 'vuetify';
import App from './App.vue'
import router from './router'
import AuthPlugin from './plugins/auth';
import 'vuetify/dist/vuetify.min.css';
import VueMoment from 'vue-moment';
import DatetimePicker from 'vuetify-datetime-picker';
import 'vuetify-datetime-picker/src/stylus/main.styl';

// import ApiService from './common/api.service';

Vue.use(Vuetify);
Vue.use(AuthPlugin);
Vue.use(VueMoment);
Vue.use(DatetimePicker);
Vue.config.productionTip = false

// ApiService.init();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
