export default class {
    async getDeleteItemContent() {
        return `
        <div class="fruit-modal__loading"></div>
        <div class="cart-modal__content cart-modal__content--delete">
            <div class="cart-modal__header">
                <h2 class="cart-modal__title">Remove Item?</h2>
            </div>
            <div class="cart-modal__body">
                <p class="cart-modal__message">Are you sure you want to remove this item from your cart?</p>
                <div class="cart-modal__actions">
                    <button data-remove-item class="cart-modal__button cart-modal__button--cancel" data-delete-cancel>
                        Cancel
                    </button>
                    <button class="cart-modal__button cart-modal__button--confirm" data-delete-confirm>
                        Remove
                    </button>
                </div>
            </div>
        </div>
        `;
    }
}
