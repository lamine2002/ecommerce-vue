<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { cartState, clearCart } from '../state/cartState';
import { useRouter } from 'vue-router';
import Header from "../components/Header.vue";

const router = useRouter();
const customer_id = ref(-1);
const firstname = ref('');
const lastname = ref('');
const address = ref('');
const phone = ref('');
const sex = ref('male'); // default value
const payment = ref('Espece'); // default value
const isLoading = ref(false);
const errorMessage = ref('');

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  const orderData = {
    customer_id: customer_id.value, // Mettre à jour si le client existe déjà
    firstname: firstname.value,
    lastname: lastname.value,
    address: address.value,
    phone: phone.value,
    sex: sex.value,
    payment: payment.value,
    // total en string pour éviter les problèmes de précision
    total: cartState.total.toString(),
    products: cartState.items.map(item => item.id),
    quantities: cartState.items.map(item => item.quantity),
  };
  console.log('orderData:', orderData);

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/make-order', orderData);
    if (response.data.status === 200) {
      alert('Commande enregistrée avec succès');
      clearCart();
      // router.push('/confirmation');
    } else {
      errorMessage.value = response.data.message;
    }
  } catch (error) {
    console.error('l\'erreur est :', error.response.data.message);
    errorMessage.value = 'Erreur lors de l\'enregistrement de la commande';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="animsition">

    <Header />

    <div class="checkout" style="padding-bottom: 5rem">
      <h1 class="mtext-100 font-weight-bold cl2 pb-5">Checkout</h1>

      <form @submit.prevent="handleSubmit" class="checkout-form" style="padding-bottom: 10rem">
        <div class="form-row">
          <div class="form-group">
            <label for="firstname">Prenom</label>
            <input type="text" id="firstname" v-model="firstname" required class="input1 bg-none plh1 stext-107 cl2"/>
          </div>

          <div class="form-group">
            <label for="lastname">Nom</label>
            <input type="text" id="lastname" v-model="lastname" required class="input1 bg-none plh1 stext-107 cl2"/>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="address">Addresse</label>
            <input type="text" id="address" v-model="address" required class="input1 bg-none plh1 stext-107 cl2"/>
          </div>

          <div class="form-group">
            <label for="phone">Téléphone</label>
            <input type="text" id="phone" v-model="phone" required class="input1 bg-none plh1 stext-107 cl2"/>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="sex">Sexe</label>
            <select id="sex" v-model="sex" required class="input1 bg-none plh1 stext-107 cl2">
              <option value="male">Masculin</option>
              <option value="female">Féminin</option>
            </select>
          </div>

          <div class="form-group">
            <label for="payment">Méthode de Payement</label>
            <select id="payment" v-model="payment" required class="input1 bg-none plh1 stext-107 cl2">
              <option value="card">Chèque</option>
              <option value="cash">Carte Bancaire</option>
              <option value="cash">Espece</option>
            </select>
          </div>
        </div>

        <div class="cart-summary">
          <h2 class="mtext-103 cl2">Mes commandes</h2>
          <ul class="header-cart-wrapitem w-full">
            <li v-for="item in cartState.items" :key="item.id" class="header-cart-item flex-w flex-t m-b-12">
              <div class="header-cart-item-img">
                <img :src="`http://127.0.0.1:8000/storage/${item.photo}`" :alt="item.name">
              </div>
              <div class="header-cart-item-txt p-t-8">
                <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                  {{ item.name }}
                </a>
                <span class="header-cart-item-info">
                {{ item.quantity }} x ${{ item.price }}
              </span>
              </div>
            </li>
          </ul>
          <div class="header-cart-total w-full p-tb-40">
            Total: ${{ cartState.total.toFixed(2) }}
          </div>
        </div>

        <button type="submit" class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04">
          Commandez Maintenant
        </button>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>


    <!-- Footer -->
    <footer class="bg3 p-t-75 p-b-32">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-lg-3 p-b-50">
            <h4 class="stext-301 cl0 p-b-30">
              Categories
            </h4>

            <ul>
              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  Women
                </a>
              </li>

              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  Men
                </a>
              </li>

              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  Shoes
                </a>
              </li>

              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  Watches
                </a>
              </li>
            </ul>
          </div>

          <div class="col-sm-6 col-lg-3 p-b-50">
            <h4 class="stext-301 cl0 p-b-30">
              Help
            </h4>

            <ul>
              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  Track Order
                </a>
              </li>

              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  Returns
                </a>
              </li>

              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  Shipping
                </a>
              </li>

              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div class="col-sm-6 col-lg-3 p-b-50">
            <h4 class="stext-301 cl0 p-b-30">
              GET IN TOUCH
            </h4>

            <p class="stext-107 cl7 size-201">
              Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
            </p>

            <div class="p-t-27">
              <a href="#" class="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                <i class="fa fa-facebook"></i>
              </a>

              <a href="#" class="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                <i class="fa fa-instagram"></i>
              </a>

              <a href="#" class="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                <i class="fa fa-pinterest-p"></i>
              </a>
            </div>
          </div>

          <div class="col-sm-6 col-lg-3 p-b-50">
            <h4 class="stext-301 cl0 p-b-30">
              Newsletter
            </h4>

            <form>
              <div class="wrap-input1 w-full p-b-4">
                <input class="input1 bg-none plh1 stext-107 cl7" type="text" name="email" placeholder="email@example.com">
                <div class="focus-input1 trans-04"></div>
              </div>

              <div class="p-t-18">
                <button class="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="p-t-40">
          <div class="flex-c-m flex-w p-b-18">
            <a href="#" class="m-all-1">
              <img src="/images/icons/icon-pay-01.png" alt="ICON-PAY">
            </a>

            <a href="#" class="m-all-1">
              <img src="/images/icons/icon-pay-02.png" alt="ICON-PAY">
            </a>

            <a href="#" class="m-all-1">
              <img src="/images/icons/icon-pay-03.png" alt="ICON-PAY">
            </a>

            <a href="#" class="m-all-1">
              <img src="/images/icons/icon-pay-04.png" alt="ICON-PAY">
            </a>

            <a href="#" class="m-all-1">
              <img src="/images/icons/icon-pay-05.png" alt="ICON-PAY">
            </a>
          </div>

          <p class="stext-107 cl6 txt-center">
            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
            Copyright &copy;<!--<script>document.write(new Date().getFullYear());</script>--> All rights reserved | Made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a> &amp; distributed by <a href="https://themewagon.com" target="_blank">ThemeWagon</a>
            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->

          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.checkout {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.checkout-form {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.form-group {
  width: 48%;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.cart-summary {
  margin-top: 20px;
}

.cart-summary h2 {
  margin-bottom: 10px;
}

.cart-summary ul {
  list-style-type: none;
  padding: 0;
}

.cart-summary li {
  margin-bottom: 5px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
