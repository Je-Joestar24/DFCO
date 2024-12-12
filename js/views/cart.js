import AbstractView from "./AbstractView.js";
import { getters, state, mutations, actions } from "../util/state.js";

import UnAuthed from "./cart/unauthed.js";
import Summary from "./cart/summary.js";
import Items from "./cart/items.js";

/**
 * CartView Class
 * Represents the shopping cart view in the application.
 * Extends the AbstractView class to manage the cart's HTML content and state.
 */
export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("DFCO | Cart");
        this.unauthed = new UnAuthed();
        this.summary = new Summary();
        this.items = new Items();
    }

    /**
     * Binds event listeners for quantity change and checkbox selection.
     * Prevents multiple bindings by checking the state.
     */
    bindAll() {
        if (state.cart.isBound) return; // Prevent multiple bindings
        document.body.addEventListener('click', (e) => {
            if (e.target.matches('.cart__quantity-btn')) {
                const itemId = parseInt(e.target.closest('.cart__item').dataset.itemId);
                const isIncrease = e.target.textContent === '+';
                this.handleQuantityChange(itemId, isIncrease);
            }
        });

        document.body.addEventListener('change', (e) => {
            if (e.target.matches('.cart__checkbox-input')) {
                this.handleCheckboxChange(e.target);
            }
        });

        state.cart.isBound = true; // Mark as bound
    }

    /**
     * Generates the HTML for the cart view.
     * Fetches products and displays the cart items and summary.
     * @returns {Promise<string>} The HTML string for the cart view.
     */
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
                        ${await this.items.getHtml(this)}
                        ${await this.summary.getHtml()}
                    </div>
                ` : await this.unauthed.getHtml()}
            </div>
        </section>
        `;
    }

    /**
     * Handles the change event for the checkbox input.
     * Updates the checked state of the cart item and refreshes the summary.
     * @param {HTMLInputElement} checkbox - The checkbox input element.
     */
    async handleCheckboxChange(checkbox) {
        const itemId = parseInt(checkbox.closest('.cart__item').dataset.itemId);
        const isChecked = checkbox.checked;

        // Get current quantity from state
        const cartItem = mutations.setChecked(itemId, isChecked);
        if (!cartItem) return;
        await this.updateSummary();
    }

    /**
     * Handles the change event for the quantity buttons.
     * Updates the quantity of the cart item and refreshes the UI.
     * @param {number} itemId - The ID of the cart item.
     * @param {boolean} isIncrease - Indicates if the quantity is increasing.
     */
    async handleQuantityChange(itemId, isIncrease) {
        const quantityElement = document.getElementById(`quantity-${itemId}`);
        const currentQuantity = parseInt(quantityElement.textContent);
        const newQuantity = isIncrease ? currentQuantity + 1 : currentQuantity - 1;

        const result = mutations.updateCartItem(itemId, newQuantity);

        if (!result.success) {
            actions.displayMessage(result.message);
            return;
        }

        if (result.success) {
            await this.updateQuantity(itemId, newQuantity);
            await this.updateSummary();
            await this.updateCartCount();
            await actions.setNotificationMark();
        }
    }

    /**
     * Updates the displayed quantity for a specific cart item.
     * @param {number} itemId - The ID of the cart item.
     * @param {number} newQuantity - The new quantity to display.
     */
    async updateQuantity(itemId, newQuantity) {
        const cartQuantity = document.getElementById(`cart__quantity-${itemId}`);

        cartQuantity.innerHTML = `
            <button class="cart__quantity-btn" 
                    ${newQuantity == 1 ? ` data-remove-item="${itemId}" ` : ""}
                    aria-label="Decrease quantity">-</button>
            <span id="quantity-${itemId}" 
                    class="cart__quantity-number"
                    role="text"
                    aria-label="Quantity">${newQuantity}</span>
            <button class="cart__quantity-btn" 
                    aria-label="Increase quantity">+</button>
        `;
    }

    /**
     * Updates the cart summary displayed in the UI.
     */
    async updateSummary() {
        const summaryContainer = document.querySelector('.cart__summary');
        if (summaryContainer) {
            summaryContainer.outerHTML = await this.summary.getHtml();
        }
    }

    /**
     * Updates the cart item count displayed in the header.
     */
    async updateCartCount() {
        const cartCount = document.querySelector('.cart__count');
        if (cartCount) {
            this.cart = await getters.getCart();
            cartCount.textContent = `${this.cart.length} items`;
        }
    }

    /**
     * Rerenders the entire cart view.
     * Fetches products and updates the cart items and summary.
     */
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
                    ${await this.items.getHtml(this)}
                    ${await this.summary.getHtml()}
                </div>
            ` : await this.unauthed.getHtml();
        }
    }
}