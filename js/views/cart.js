import AbstractView from "./AbstractView.js";
import { getters, state, mutations, actions } from "../util/state.js";

/**
 * CartView Class
 * Represents the shopping cart view in the application.
 * Extends the AbstractView class to manage the cart's HTML content and state.
 */
export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("DFCO | Cart");
    }



    async getHtml() {
        await actions.fetchProducts();
        this.cart = await getters.getCart();
        return `
        <section class="app__cart" aria-label="Shopping Cart">
            <div class="app__cart-container">
                ${state.user.isLoggedIn ? `
                    <div class="cart__header">
                        <h1 class="cart__title">Your Cart</h1>
                        <span class="cart__count">${this.cart.length} items</span>
                    </div>
                    <div class="cart__content">
                        ${await this.getCartItems()}
                        ${await this.getCartSummary()}
                    </div>
                ` : await this.getUnAuth()}
            </div>
        </section>
        `;
    }

    async getUnAuth() {
        return `
        <div class="cart__empty" role="alert">
            <div class="cart__empty-icon" aria-hidden="true">🛒</div>
            <h2 class="cart__empty-text">Your cart is empty</h2>
            <div class="cart__auth-buttons">
                <button class="cart__auth-btn cart__auth-btn--login" aria-label="Login" data-auth-toggle data-change-auth-active="login" >Login</button>
                <button class="cart__auth-btn cart__auth-btn--signup" aria-label="Sign Up" data-auth-toggle data-change-auth-active="signup">Sign Up</button>
            </div>
        </div>
        `;
    }

    async getCartSummary() {
        const summary = getters.getCartSummary();
        return `
            <div class="cart__summary" role="complementary" aria-label="Order Summary">
                <h2 class="cart__summary-title">Order Summary</h2>
                <div class="cart__summary-row cart__summary-subtotal">
                    <span>Subtotal</span>
                    <span>${summary.total}</span>
                </div>
                <div class="cart__summary-row cart__summary-shipping">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div class="cart__summary-row cart__summary-total">
                    <span>Total</span>
                    <span>${summary.total}</span>
                </div>
                <button class="cart__checkout-btn" 
                        aria-label="Proceed to checkout with ${summary.itemCount} items"
                        ${summary.itemCount === 0 ? 'disabled' : ''}>
                    Proceed to Checkout (${summary.itemCount} items)
                </button>
            </div>
        `;
    }


    bindAll() {
        if (state.cart.isBound) return; // Prevent multiple bindings
        document.body.addEventListener('click', (e) => {
            if (e.target.matches('.cart__quantity-btn')) {
                const itemId = parseInt(e.target.closest('.cart__item').dataset.itemId);
                const isIncrease = e.target.textContent === '+';
                this.handleQuantityChange(itemId, isIncrease);
            }

            if (e.target.matches('.cart__item-remove')) {
                const itemId = parseInt(e.target.closest('.cart__item').dataset.itemId);
                this.handleRemoveItem(itemId);
            }
        });

        document.body.addEventListener('change', (e) => {
            if (e.target.matches('.cart__checkbox-input')) {
                this.handleCheckboxChange(e.target);
            }
        });

        state.cart.isBound = true; // Mark as bound
    }
    async getCartItems() {
        return `
        <div class="cart__items">
            ${!this.cart || this.cart.length === 0 ? `
                <div class="cart__empty" role="alert">
                    <div class="cart__empty-icon" aria-hidden="true">🛒</div>
                    <h2 class="cart__empty-text">No items in cart</h2>
                </div>
            ` : this.cart.map(item => `
                <div class="cart__item" data-item-id="${item.id}">
                    <div class="cart__item-select">
                        <label class="cart__checkbox" aria-label="Select ${item.name}">
                            <input type="checkbox" 
                                   class="cart__checkbox-input" 
                                   ${item.checked ? 'checked' : ''}
                                   aria-label="Select ${item.name}">
                            <span class="cart__checkbox-mark"></span>
                        </label>
                    </div>
                    <div class="cart__item-image">
                        <img src="${item.image1}" 
                             alt="${item.name}" 
                             role="img" 
                             loading="lazy">
                    </div>
                    <div class="cart__item-details">
                        <h3 class="cart__item-name">${item.name}</h3>
                        <p class="cart__item-type">${item.type} Type</p>
                        <p class="cart__item-price">${item.price}</p>
                    </div>
                    <div class="cart__item-controls">
                        <div class="cart__quantity">
                            <button class="cart__quantity-btn" 
                                    aria-label="Decrease quantity">-</button>
                            <span id="quantity-${item.id}" 
                                  class="cart__quantity-number"
                                  role="text"
                                  aria-label="Quantity">${item.quantity}</span>
                            <button class="cart__quantity-btn" 
                                    aria-label="Increase quantity">+</button>
                        </div>
                        <button class="cart__item-remove" 
                                aria-label="Remove ${item.name} from cart">×</button>
                    </div>
                </div>
            `).join('')}
        </div>
        `;
    }
    
    async handleCheckboxChange(checkbox) {
        const itemId = parseInt(checkbox.closest('.cart__item').dataset.itemId);
        const isChecked = checkbox.checked;
        
        // Get current quantity from state
        const cartItem = state.user.cart.find(item => item.id === itemId);
        if (!cartItem) return;

        // Use updateCartItemQuantity mutation which now handles checked state
        const result = await mutations.updateCartItemQuantity(itemId, cartItem.quantity, isChecked);
        
        if (result.success) {
            await this.updateSummary();
        }
    }
    async handleQuantityChange(itemId, isIncrease) {
        const quantityElement = document.getElementById(`quantity-${itemId}`);
        const currentQuantity = parseInt(quantityElement.textContent);
        const newQuantity = isIncrease ? currentQuantity + 1 : currentQuantity - 1;

        if (newQuantity < 1) {
            if (confirm('Remove item from cart?')) {
                await mutations.removeFromCart(itemId);
                await this.fullRerender();
            }
            return;
        }

        // Get current cart item to preserve checked status
        const cartItems = await getters.getCart();
        const currentItem = cartItems.find(item => item.id === itemId);
        
        const result = await mutations.updateCartItem(itemId, {
            ...currentItem,
            quantity: newQuantity
        });

        if (result.success) {
            this.cart = await getters.getCart();
            quantityElement.textContent = newQuantity;
            await this.updateSummary();
            await this.updateCartCount();
        } else if (result.error) {
            actions.displayMessage(result.message);
        }
    }

    async handleRemoveItem(itemId) {
        if (confirm('Are you sure you want to remove this item?')) {
            await mutations.removeFromCart(itemId);
            await this.fullRerender();
            await this.updateCartCount();
        }
    }


    async updateSummary() {
        const summaryContainer = document.querySelector('.cart__summary');
        if (summaryContainer) {
            summaryContainer.outerHTML = await this.getCartSummary();
        }
    }

    async updateCartCount() {
        const cartCount = document.querySelector('.cart__count');
        if (cartCount) {
            this.cart = await getters.getCart();
            cartCount.textContent = `${this.cart.length} items`;
        }
    }

    async fullRerender() {
        const cartContainer = document.querySelector('.app__cart-container');
        if (cartContainer) {
            await actions.fetchProducts();
            this.cart = await getters.getCart();

            cartContainer.innerHTML = state.user.isLoggedIn ? `
                <div class="cart__header">
                    <h1 class="cart__title">Your Cart</h1>
                    <span class="cart__count">${this.cart.length} items</span>
                </div>
                <div class="cart__content">
                    ${await this.getCartItems()}
                    ${await this.getCartSummary()}
                </div>
            ` : await this.getUnAuth();
        }
    }
}