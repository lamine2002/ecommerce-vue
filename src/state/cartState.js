import { reactive, watch } from 'vue';

// Chargement initial de l'état du panier depuis localStorage
const savedCart = JSON.parse(localStorage.getItem('cartState')) || { items: [], total: 0 };

export const cartState = reactive(savedCart);

export function addToCart(product) {
    const existingItem = cartState.items.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartState.items.push({ ...product, quantity: 1 });
    }
    cartState.total += product.price;
}

export function removeFromCart(productId) {
    const itemIndex = cartState.items.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cartState.total -= cartState.items[itemIndex].price * cartState.items[itemIndex].quantity;
        cartState.items.splice(itemIndex, 1);
    }
}

export function updateCartState() {
    cartState.total = cartState.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

// incrémente la quantité d'un produit dans le panier
export function incrementQuantity(productId) {
    const item = cartState.items.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        cartState.total += item.price;
    }
}

// décrémente la quantité d'un produit dans le panier
export function decrementQuantity(productId) {
    const item = cartState.items.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        cartState.total -= item.price;
    }
}

// Vider le panier
export function clearCart() {
    cartState.items = [];
    cartState.total = 0;
}


// Sauvegarder l'état du panier dans localStorage à chaque modification
watch(cartState, (newState) => {
    localStorage.setItem('cartState', JSON.stringify(newState));
}, { deep: true });
