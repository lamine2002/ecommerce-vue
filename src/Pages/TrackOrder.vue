<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Header from "../components/Header.vue";

const numOrder = ref('');
const order = ref(null);
const isLoading = ref(false);
const errorMessage = ref('');

const trackOrder = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  order.value = null;

  try {
    const response = await axios.get("http://127.0.0.1:8000/api/track-order/" + numOrder.value);
    if (response.data.status === 200) {
      order.value = response.data.order;
    } else {
      errorMessage.value = 'Commande non trouvée';
    }
  } catch (error) {
    console.error('Erreur:', error.response.data.message);
    errorMessage.value = 'Erreur lors de la recherche de la commande';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="animsition">
    <Header />

    <div class="track-order" style="padding-bottom: 5rem">
      <h1 class="mtext-100 font-weight-bold cl2 pb-5">Suivre ma commande</h1>

      <form @submit.prevent="trackOrder" class="track-order-form">
        <div class="form-group">
          <label for="numOrder">Numéro de commande</label>
          <input type="text" id="numOrder" v-model="numOrder" required class="input1 bg-none plh1 stext-107 cl2"/>
        </div>

        <button type="submit" class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10">
          Rechercher
        </button>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>

      <div v-if="order" class="order-details">
        <h2 class="mtext-103 cl2">Détails de la commande</h2>
        <p><strong>Numéro de commande:</strong> {{ order.numOrder }}</p>
        <p><strong>Date:</strong> {{ order.orderDate }}</p>
        <p><strong>Statut:</strong> {{ order.status }}</p>
        <p><strong>Total:</strong> ${{ order.total }}</p>
        <h3 class="mtext-102 cl2">Produits commandés</h3>
        <ul class="header-cart-wrapitem w-full">
          <li v-for="product in order.products" :key="product.id" class="header-cart-item flex-w flex-t m-b-12">
            <div class="header-cart-item-img">
              <img :src="`http://127.0.0.1:8000/storage/${product.photo}`" :alt="product.name">
            </div>
            <div class="header-cart-item-txt p-t-8">
              <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                {{ product.name }}
              </a>
              <span class="header-cart-item-info">
                {{ product.pivot.quantity }} x ${{ product.price }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <!-- (Votre pied de page ici, similaire à celui de Checkout.vue) -->
  </div>
</template>

<style scoped>
.track-order {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.track-order-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: red;
  margin-top: 10px;
}

.order-details {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 4px;
}

.order-details h2, .order-details h3 {
  margin-bottom: 15px;
}

.order-details p {
  margin-bottom: 10px;
}
</style>