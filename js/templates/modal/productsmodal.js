/**
 * Product Modal Class
 * Handles displaying detailed product information in a modal dialog.
 * Provides rich UI for viewing product details, images, specifications and actions.
 * Supports add to cart and buy now functionality with authentication checks.
 * @extends AbstractModal
 */
import AbstractModal from "./AbstractModal.js";
import HTMLContentGenerator from "./products/HTMLContentGenerator.js";// This is responsible for generating the html structure of the Modal
import { actions } from "../../util/state.js";

export default class ProductsModal extends AbstractModal {
    /**
     * Initialize the product modal with required configuration
     * Sets up modal element, toggle attribute and active class
     */
    constructor() {
        super({ modal: 'fruit-modal', toggledata: 'data-fruit-toggle', activeclass: 'open' });
        this.HTMLHelper = new HTMLContentGenerator();
        this.init();
    }

    /**
     * Initialize modal content and bind event handlers
     * Sets up initial HTML content and attaches event listeners
     */
    async init() {
        this.modal.innerHTML = await this.HTMLHelper.getContent()
        this.bindButtons();
        this.bindButtons2();
    }

    /**
     * Bind product-specific click handlers
     * Handles modal toggling and product data loading on click
     */
    bindButtons2(){
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[${this.toggleAttr}]`)) {
                e.preventDefault();
                const attributeValue = e.target.getAttribute(this.toggleAttr);
    
                if (attributeValue) {
                    this.setData(attributeValue); 
                }
            }
        });
    }

    /**
     * Update modal data with product details
     * Fetches fresh data and re-renders modal content
     * @param {string} json - Product identifier to fetch details for
     */
    async setData(json) {
        await actions.fetchDevilFruitDetails(json);
        this.modal.innerHTML = await this.HTMLHelper.getContent();
    }

}
