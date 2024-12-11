/**
 * Checkout Modal Class
 * Handles checkout process for single items and cart items
 * Provides confirmation UI and processes checkout requests
 * @extends AbstractModal
 */
import AbstractModal from "./AbstractModal.js";
import HTMLContentGenerator from "./checkout/HTMLContentGenerator.js";
import { actions, mutations } from "../../util/state.js";
import CheckoutHandler from "./checkout/CheckoutHandler.js";

export default class CheckoutModal extends AbstractModal {
    /**
     * Initialize checkout modal with required configuration
     * @param {Object} config - Modal configuration object
     */
    constructor() {
        super({ modal: 'item__checkout-modal', toggledata: 'data-checkout-item', activeclass: 'open' });
        this.HTMLHelper = new HTMLContentGenerator();
        this.CheckoutHandler = new CheckoutHandler();
        this.init();
        this.id;
    }

    /**
     * Initialize modal content and bind event handlers
     * Sets up initial HTML and attaches event listeners
     */
    async init() {
        this.modal.innerHTML = await this.HTMLHelper.getContent()
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
                this.CheckoutHandler.checkoutNow(this);
            }
        });

        
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') { 
                if(this.id) this.CheckoutHandler.checkoutNow(this);
            }
        });
    }

}
