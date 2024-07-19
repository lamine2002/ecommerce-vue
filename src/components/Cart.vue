<script setup>
import { computed } from 'vue';
import { cartState, removeFromCart, updateCartState } from '../state/cartState';

const cartItems = computed(() => cartState.items);

function updateQuantity(item, quantity) {
  item.quantity = quantity;
  updateCartState();
}
</script>

<template>
  <div class="wrap-header-cart js-panel-cart">
    <div class="s-full js-hide-cart"></div>

    <div class="header-cart flex-col-l p-l-65 p-r-25">
      <div class="header-cart-title flex-w flex-sb-m p-b-8">
        <span class="mtext-103 cl2">Your Cart</span>
        <div class="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
          <i class="zmdi zmdi-close"></i>
        </div>
      </div>

      <div class="header-cart-content flex-w js-pscroll">
        <ul class="header-cart-wrapitem w-full">
          <li v-for="item in cartItems" :key="item.id" class="header-cart-item flex-w flex-t m-b-12">
            <div class="header-cart-item-img" @click="removeFromCart(item.id)">
              <img :src="`http://127.0.0.1:8000/storage/${item.photo}`" alt="IMG">
            </div>

            <div class="header-cart-item-txt p-t-8">
              <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">{{ item.name }}</a>
              <span class="header-cart-item-info">{{ item.quantity }} x ${{ item.price }}</span>
<!--              <button @click="removeFromCart(item.id)">Remove</button>-->
            </div>
          </li>
        </ul>

        <div class="w-full">
          <div class="header-cart-total w-full p-tb-40">
            Total: ${{ cartState.total.toFixed(2) }}
          </div>

          <div class="header-cart-buttons flex-w w-full">
            <a href="/shoping-cart" class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10">
              View Cart
            </a>

            <a href="/shoping-cart" class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10">
              Check Out
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
