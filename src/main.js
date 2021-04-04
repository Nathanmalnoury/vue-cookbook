import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

axios.defaults.baseURL = 'http://localhost:5300';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');
