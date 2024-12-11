export default class {
    /**
     * Generate checkout modal content HTML
     * Includes loading animation, title, message and action buttons
     * @returns {Promise<string>} Modal content HTML
     */
    async getContent() {
        return `
        <div class="fruit-modal__loading"></div>
        <div class="item-modal__content">
            <div class="item-modal__header">
                <h2 class="item-modal__title">Proceed to Checkout?</h2>
            </div>
            <div class="item-modal__body">
                <p class="item-modal__message">
                    Are you ready to complete your purchase? You can review your items one last time before proceeding.
                </p>
                <div class="item-modal__actions">
                    <button data-checkout-item class="item-modal__button item-modal__button--cancel" data-checkout-cancel>
                        Continue Shopping
                    </button>
                    <button class="item-modal__button item-modal__button--confirm" data-checkout-now>
                        Checkout Now
                    </button>
                </div>
            </div>
        </div>
        `;
    }
}
