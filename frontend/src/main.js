import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(faStarSolid, faStarRegular);
axios.defaults.baseURL = 'http://0.0.0.0:8000';
const app = createApp(App);
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');
