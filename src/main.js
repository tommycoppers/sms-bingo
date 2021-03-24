import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js';
import BaseModal from "./components/BaseModal.vue";
//import VueConfetti from 'vue-confetti';

const app = createApp(App)

app.use(router)
app.use(store);
//Vue.use(VueConfetti);

app.component('base-modal', BaseModal)
app.mount('#app')
