import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(){
        super()
        this.setTitle("DFCO | Cart")
    }

    async getHtml(){
        return `
            <div class="app__cart-container">
                <div class="cart__header">
                    <h1 class="cart__title">Your Cart</h1>
                    <span class="cart__count">3 items</span>
                </div>
                
                <div class="cart__content">
                    <div class="cart__items">
                        <div class="cart__item">
                            <div class="cart__item-select">
                                <label class="cart__checkbox">
                                    <input type="checkbox" class="cart__checkbox-input">
                                    <span class="cart__checkbox-mark"></span>
                                </label>
                            </div>
                            <div class="cart__item-image">
                                <img src="./images/devil-fruits/gura-gura.png" alt="Gura Gura no Mi">
                            </div>
                            <div class="cart__item-details">
                                <h3 class="cart__item-name">Gura Gura no Mi</h3>
                                <p class="cart__item-type">Paramecia Type</p>
                                <p class="cart__item-price">₿ 5,000,000</p>
                            </div>
                            <div class="cart__item-controls">
                                <div class="cart__quantity">
                                    <button class="cart__quantity-btn">-</button>
                                    <span class="cart__quantity-number">1</span>
                                    <button class="cart__quantity-btn">+</button>
                                </div>
                                <button class="cart__item-remove">×</button>
                            </div>
                        </div>
                    </div>

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
                        <button class="cart__checkout-btn">Proceed to Checkout</button>
                    </div>
                </div>

                <!-- Empty Cart State (hidden by default) -->
                <div class="cart__empty">
                    <div class="cart__empty-icon">🛒</div>
                    <h2 class="cart__empty-text">Your cart is empty</h2>
                    <div class="cart__auth-buttons">
                        <button class="cart__auth-btn cart__auth-btn--login">Login</button>
                        <button class="cart__auth-btn cart__auth-btn--signup">Sign Up</button>
                    </div>
                </div>
            </div>
        `;
    }

}