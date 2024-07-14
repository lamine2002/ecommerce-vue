import Home from "./Pages/Home.vue";
import Products from "./Pages/Products.vue";
import About from "./Pages/About.vue";
import Contact from "./Pages/Contact.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/shop',
        component: Products
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/Contact',
        component: Contact
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;