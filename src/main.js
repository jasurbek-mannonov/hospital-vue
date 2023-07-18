
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { store } from './store';

import  VueCookies  from 'vue-cookies'

const app = createApp(App)

app.use(router)
app.use(VueCookies, {expires: '10h'})
app.use(store)
app.mount('#app')
