import AbstractView from "./AbstractView.js";
import { state } from "../util/state.js";

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

    /**
     * Generates the HTML for the cart view.
     * Displays the cart header, items, and summary if the user is logged in.
     * If the user is not logged in, it shows the authentication prompt.
     * 
     * @async
     * @returns {Promise<string>} The HTML string for the cart view.
     */
    async getHtml() {
        return `
        <section class="app__cart" aria-label="Shopping Cart">
            <div class="app__cart-container">
                ${state.user.isLoggedIn ? `<div class="cart__header">
                    <h1 class="cart__title">Your Cart</h1>
                    <span class="cart__count">3 items</span>
                </div>
                
                <div class="cart__content">
                    ${await this.getCartItems()}
                    ${await this.getCartSummary()}
                </div>` : ''}

                <!-- Empty Cart State (hidden by default) -->
                ${state.user.isLoggedIn ? '' : await this.getUnAuth()}
            </div>
        </section>
        `;
    }

    /**
     * Generates the HTML for the cart items.
     * Displays each item in the cart with its details and controls.
     * 
     * @async
     * @returns {Promise<string>} The HTML string for the cart items.
     */
    async getCartItems() {
        return `
        <div class="cart__items">
            <div class="cart__item">
                <div class="cart__item-select">
                    <label class="cart__checkbox" aria-label="Select item">
                        <input type="checkbox" class="cart__checkbox-input" aria-label="Select Gura Gura no Mi">
                        <span class="cart__checkbox-mark"></span>
                    </label>
                </div>
                <div class="cart__item-image">
                    <img src="./images/devil-fruits/gura-gura.png" alt="Gura Gura no Mi" role="img">
                </div>
                <div class="cart__item-details">
                    <h3 class="cart__item-name">Gura Gura no Mi</h3>
                    <p class="cart__item-type">Paramecia Type</p>
                    <p class="cart__item-price">₿ 5,000,000</p>
                </div>
                <div class="cart__item-controls">
                    <div class="cart__quantity">
                        <button class="cart__quantity-btn" aria-label="Decrease quantity">-</button>
                        <span class="cart__quantity-number">1</span>
                        <button class="cart__quantity-btn" aria-label="Increase quantity">+</button>
                    </div>
                    <button class="cart__item-remove" aria-label="Remove item">×</button>
                </div>
            </div>
        </div>
        `;
    }

    /**
     * Generates the HTML for the cart summary.
     * Displays the subtotal, shipping, and total amounts.
     * 
     * @async
     * @returns {Promise<string>} The HTML string for the cart summary.
     */
    async getCartSummary() {
        return `
            <div class="cart__summary">
                <h2 class="cart__summary-title">Order Summary</h2>
                <div class="cart__summary-row">
                    <span>Subtotal</span>
                    <span>₿ 5,000,000</span>
                </div>
                <div class="cart__summary-row">
                    <span>Shipping</span>
                    <span>₿ 50,000</span>
                </div>
                <div class="cart__summary-row cart__summary-total">
                    <span>Total</span>
                    <span>₿ 5,050,000</span>
                </div>
                <button class="cart__checkout-btn" aria-label="Proceed to checkout">Proceed to Checkout</button>
            </div>
        `;
    }

    /**
     * Generates the HTML for the unauthenticated state of the cart.
     * Prompts the user to log in or sign up if the cart is empty.
     * 
     * @async
     * @returns {Promise<string>} The HTML string for the unauthenticated state.
     */
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
}