import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js';
import BaseModal from "./components/BaseModal.vue";



const app = createApp(App)

app.use(router)
app.use(store);

app.component('base-modal', BaseModal)
app.mount('#app')
