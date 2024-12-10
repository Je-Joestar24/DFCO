import AbstractModal from "./AbstractModal.js";
import { actions, getters, mutations } from "../../util/state.js";

export default class extends AbstractModal {
    constructor() {
        super({ modal: 'item__checkout-modal', toggledata: 'data-checkout-item', activeclass: 'open' });
        this.init();
        this.id;
    }

    async init() {
        this.modal.innerHTML = await this.getContent()
        this.bindButtons();
        this.bindButtons2();
    }

    async setData(json) {
        await actions.fetchDevilFruitDetails(json);
        this.modal.innerHTML = await this.getContent();
    }

    bindButtons2() {
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[${this.toggleAttr}]`)) {
                e.preventDefault();
                const attributeValue = e.target.getAttribute(this.toggleAttr);

                if (attributeValue) {
                    this.id = attributeValue;
                }
            }
        });

        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[data-checkout-now]`)) {
                e.preventDefault();
                this.checkoutNow();
            }
        });
    }

    checkoutNow() {
        try {
            if (this.id === "multi") {
                // Handle the case when id is "multi"
                const response = mutations.multiCheckout();
                if (response.success) {
                    this.toggle();
                }
                actions.displayMessage(response.message, 500);
            } else if (typeof this.id == 'string') {
                const response = mutations.singleCheckout(parseInt(this.id));
                if (response.success) {
                    this.toggle();
                }
                actions.displayMessage(response.message, 500);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    async getContent() {
        this.data = await getters.getDisplay();
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
