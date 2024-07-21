import { createRouter, createWebHistory } from 'vue-router';
import Home from './Pages/Home.vue';
import Products from './Pages/Products.vue';
import About from './Pages/About.vue';
import Contact from './Pages/Contact.vue';
import ShopingCart from "./Pages/ShopingCart.vue";
import ProductDetail from "./Pages/ProductDetail.vue";
import Checkout from "./Pages/Checkout.vue";
import TrackOrder from "./Pages/TrackOrder.vue";


const routes = [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/shop', component: Products },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    {path: '/shoping-cart', component: ShopingCart},
    {
        path: '/product-detail/:id',
        component: ProductDetail,
        props: true
    },
    {
        path: '/checkout',
        component: Checkout
    },
    {
        path: '/track-order',
        component: TrackOrder
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    console.log('Navigation vers la route', to);
    next();
});


export default router;
