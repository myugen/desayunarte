import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import VueClipboard from "vue-clipboard2";
import "./plugins/element";
import "./plugins/vue-scrollto";
import "./assets/style/bulma.scss";
import "./assets/style/root.scss";

Vue.config.productionTip = false;
Vue.use(VueClipboard);

new Vue({
  render: h => h(App)
}).$mount("#app");
