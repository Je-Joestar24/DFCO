/**
 * Cart Remove Item Modal Class
 * Handles confirmation and removal of items from shopping cart
 * Provides modal UI with cancel/confirm options and keyboard interaction
 * @extends AbstractModal 
 */
import AbstractModal from "./AbstractModal.js";
import { actions, getters, mutations } from "../../util/state.js";
import Cart from "../../views/cart.js";

export default class extends AbstractModal {
    /**
     * Initialize modal with required configuration
     * Sets up modal element, toggle attribute and active class
     */
    constructor() {
        super({ modal: 'cart-modal__delete-item', toggledata: 'data-remove-item', activeclass: 'open' });
        this.init();
        this.id = -1;
        this.helper = new Cart();
    }

    /**
     * Initialize the modal content and bind event handlers
     * Sets up initial HTML content and attaches event listeners
     */
    async init() {
        this.modal.innerHTML = await this.getContent()
        this.bindButtons();
    }

    /**
     * @override parent bindButtons to add cart-specific handlers
     * Binds click handlers for item removal and cancel
     * Adds keyboard escape handler to close modal
     */
    async bindButtons(){
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[${this.toggleAttr}]`)) {
                e.preventDefault();
                const attributeValue = e.target.getAttribute(this.toggleAttr);
                this.id = attributeValue ? attributeValue : -1;
                this.toggle();
            }
        });

        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[data-delete-confirm]`)) {
                e.preventDefault();
                this.deleteNow();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' || event.key === 'Esc') { 
                this.close();
            }
        });
    }

    /**
     * Handle item deletion from cart
     * Removes item and updates cart UI if successful
     */
    async deleteNow(){
        const deleted = await mutations.removeFromCart(this.id);
        if(deleted){
            this.helper.fullRerender();
            this.toggle();
            await actions.setNotificationMark();
        }
    }

    /**
     * Update modal data with devil fruit details
     * @param {Object} json - Devil fruit data to display
     */
    async setData(json) {
        await actions.fetchDevilFruitDetails(json);
        this.modal.innerHTML = await this.getContent();
    }

    /**
     * Generate the modal content HTML
     * Includes loading state, confirmation message and action buttons
     * @returns {Promise<string>} Modal content HTML
     */
    async getContent() {
        this.data = await getters.getDisplay();

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
                <button  class="cart-modal__button cart-modal__button--confirm" data-delete-confirm>
                Remove
                </button>
            </div>
            </div>
        </div>
        `;
    }

}
