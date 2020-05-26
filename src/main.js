import Vue from "vue";
import App from "./App.vue";
import router from './router';
import VueSession from 'vue-session'
import VueSimpleAlert from "vue-simple-alert";
import 'bootstrap/dist/css/bootstrap.min.css';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(VueSession);
Vue.use(VueSimpleAlert);

export const bus = new Vue() //Per gestire il token "jwt" in localStorage

new Vue({
  // inject the router to make whole app router-aware
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");