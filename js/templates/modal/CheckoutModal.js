/**
 * Checkout Modal Class
 * Handles checkout process for single items and cart items
 * Provides confirmation UI and processes checkout requests
 * @extends AbstractModal
 */
import AbstractModal from "./AbstractModal.js";
import { actions, getters, mutations } from "../../util/state.js";

export default class extends AbstractModal {
    /**
     * Initialize checkout modal with required configuration
     * @param {Object} config - Modal configuration object
     */
    constructor() {
        super({ modal: 'item__checkout-modal', toggledata: 'data-checkout-item', activeclass: 'open' });
        this.init();
        this.id;
    }

    /**
     * Initialize modal content and bind event handlers
     * Sets up initial HTML and attaches event listeners
     */
    async init() {
        this.modal.innerHTML = await this.getContent()
        this.bindButtons();
        this.bindCheckoutButtons();
    }

    /**
     * Bind checkout-specific button handlers
     * Handles item selection and checkout confirmation
     */
    bindCheckoutButtons() {
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

    /**
     * Process checkout for single item or multiple cart items
     * Handles success/failure cases and displays appropriate messages
     */
    checkoutNow() {
        try {
            if (this.id === "multi") {
                // Handle the case when id is "multi"
                const response = mutations.multiCheckout();
                if (response.success) {
                    this.toggle();
                }
                actions.displayMessage(response.message, 500);
                actions.setNotificationMark();
                setTimeout(() => {
                    window.location.href = window.location.origin + '#/profile/checkouts';
                    location.reload();
                }, 500);
            } else if (typeof this.id == 'string') {
                const response = mutations.singleCheckout(parseInt(this.id));
                if (response.success) {
                    this.toggle();
                }
                actions.displayMessage(response.message, 500);
                actions.setNotificationMark();
                setTimeout(() => {
                    window.location.href = window.location.origin + '#/profile/checkouts';
                    location.reload();
                }, 500);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    /**
     * Generate checkout modal content HTML
     * Includes loading animation, title, message and action buttons
     * @returns {Promise<string>} Modal content HTML
     */
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
