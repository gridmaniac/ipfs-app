import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueUploadComponent from "vue-upload-component";
import VueCarousel from "vue-carousel";
import Axios from "axios";

Vue.component("file-upload", VueUploadComponent);
Vue.use(VueCarousel);

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_BASE_URL;

const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

Vue.prototype.$http.interceptors.response.use(null, (error) => {
  switch (error.response.status) {
    case 403:
      store.commit("resetState");
      break;
  }

  router.push("/");
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
