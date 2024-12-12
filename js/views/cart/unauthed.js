export default class {
    /**
     * Generates the HTML for the unauthenticated state of the cart.
     * Displays a message indicating the cart is empty and provides login/signup options.
     * @returns {Promise<string>} The HTML string for the unauthenticated cart state.
     */
    async getHtml() {
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