<script setup>

import Cart from "./Cart.vue";
import Sidebar from "./Sidebar.vue";
import router from "../router.js";
import {ref, watch} from "vue";
import {cartState} from "../state/cartState";

const numberOfItems = ref(0);

const updateNumberOfItems = () => {
  numberOfItems.value = cartState.items.length;
};

watch(cartState.items, () => {
  updateNumberOfItems();
});
updateNumberOfItems();

</script>

<template>
  <header class="header-v4">
    <div class="container-menu-desktop">
      <div class="top-bar">
        <div class="content-topbar flex-sb-m h-full container">
          <div class="left-top-bar">
            Free shipping for standard order over $100
          </div>
          <div class="right-top-bar flex-w h-full">
            <a href="#" class="flex-c-m trans-04 p-lr-25">Help & FAQs</a>
            <a href="#" class="flex-c-m trans-04 p-lr-25">My Account</a>
            <a href="#" class="flex-c-m trans-04 p-lr-25">EN</a>
            <a href="#" class="flex-c-m trans-04 p-lr-25">USD</a>
          </div>
        </div>
      </div>

      <div class="wrap-menu-desktop how-shadow1">
        <nav class="limiter-menu-desktop container">
          <a href="/" class="logo">
            <img src="/images/icons/logo-01.png" alt="IMG-LOGO">
          </a>
          <div class="menu-desktop">
            <ul class="main-menu">
              <li>
                <a href="/home">Accueil</a>
              </li>
              <li>
                <a href="/shop">Produits</a>
              </li>
              <li >
                <a href="/about">A propos</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div class="wrap-icon-header flex-w flex-r-m">
            <div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
              <i class="zmdi zmdi-search"></i>
            </div>
            <!--      PAnier       -->
            <div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" :data-notify="numberOfItems">
              <i class="zmdi zmdi-shopping-cart"></i>
            </div>
            <div class="flex-c-m h-full p-lr-19">
              <div class="icon-header-item cl0 hov-cl1 trans-04 p-lr-11 js-show-sidebar" id="sidebar">
                <i class="zmdi zmdi-menu"></i>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="wrap-header-mobile">
      <div class="logo-mobile">
        <router-link to="/"><img src="/images/icons/logo-01.png" alt="IMG-LOGO"></router-link>
      </div>
      <div class="wrap-icon-header flex-w flex-r-m m-r-15">
        <div class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
          <i class="zmdi zmdi-search"></i>
        </div>
        <div class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify="2">
          <i class="zmdi zmdi-shopping-cart"></i>
        </div>
        <router-link to="#" class="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti" data-notify="0">
          <i class="zmdi zmdi-favorite-outline"></i>
        </router-link>
      </div>
      <div class="btn-show-menu-mobile hamburger hamburger--squeeze">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </div>
    </div>
    <div class="menu-mobile">
      <ul class="topbar-mobile">
        <li>
          <div class="left-top-bar">
            Free shipping for standard order over $100
          </div>
        </li>
        <li>
          <div class="right-top-bar flex-w h-full">
            <a href="#" class="flex-c-m p-lr-10 trans-04">Help & FAQs</a>
            <a href="#" class="flex-c-m p-lr-10 trans-04">My Account</a>
            <a href="#" class="flex-c-m p-lr-10 trans-04">EN</a>
            <a href="#" class="flex-c-m p-lr-10 trans-04">USD</a>
          </div>
        </li>
      </ul>
      <ul class="main-menu-m">
        <li>
          <router-link to="/home">Home</router-link>
        </li>
        <li>
          <router-link to="/shop">Shop</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/contact">Contact</router-link>
        </li>
      </ul>
    </div>
    <Sidebar />
    <Cart />
  </header>
</template>

<style>
#sidebar:hover {
  color: #717fe0;
}
#sidebar {
  color: #000;
}

</style>


