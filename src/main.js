import { createApp } from 'vue'
import App from './App.vue'
import './select.css'
import router from "./router.js";


const app = createApp(App);
// Ajoute le router à l'application
app.use(router);

app.mount('#app');