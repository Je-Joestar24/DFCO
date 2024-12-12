import { getters } from "../../util/state.js";

export default class {

    /**
     * Generates the HTML for the cart summary.
     * Displays the subtotal, shipping, and total amounts.
     * @returns {Promise<string>} The HTML string for the cart summary.
     */
    async getHtml() {
        const summary = getters.getCartSummary();
        const toBeCheckout = getters.getCartChecked();
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
                <button ${toBeCheckout.length > 0 ? `data-checkout-item="multi"` : "hidden"} class="cart__checkout-btn" 
                        aria-label="Proceed to checkout with ${summary.itemCount} items"
                        ${summary.itemCount === 0 ? 'disabled' : ''}>
                    Proceed to Checkout (${summary.itemCount} items)
                </button>
            </div>
        `;
    }
}