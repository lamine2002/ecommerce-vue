import Home from "./Pages/Home.vue";
import Products from "./Pages/Products.vue";
import About from "./Pages/About.vue";
import Contact from "./Pages/Contact.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/",
        Component: Home
    },
    {
        path: "/shop",
        Component: Products
    },
    {
        path: "/about",
        Component: About
    },
    {
        path: "Contact",
        Component: Contact
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;