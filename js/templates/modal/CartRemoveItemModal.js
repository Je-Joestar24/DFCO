import AbstractModal from "./AbstractModal.js";
import CartItemHandler from "./carts/CartItemHandler.js";
import ModalContentGenerator from "./carts/HTMLContentGenerator.js";

/**
 * CartRemoveItemModal Class
 * Handles the modal dialog for cart item removal confirmation.
 * Extends AbstractModal for base modal functionality.
 */
export default class CartRemoveItemModal extends AbstractModal {
    /**
     * Initialize the cart remove modal with required dependencies
     * @constructor
     */
    constructor() {
        // Initialize with modal-specific configuration
        super({ 
            modal: 'cart-modal__delete-item', 
            toggledata: 'data-remove-item', 
            activeclass: 'open' 
        });
        this.cartHandler = new CartItemHandler();
        this.contentGenerator = new ModalContentGenerator();
        this.id = -1; // Track the item ID to be removed
        this.init();
    }

    /**
     * Initialize the modal content and bind event handlers
     * @async
     */
    async init() {
        this.modal.innerHTML = await this.contentGenerator.getDeleteItemContent();
        this.bindButtons();
    }

    /**
     * Bind event listeners for modal interactions
     * Handles confirm, cancel, and keyboard events
     */
    bindButtons() {
        // Toggle modal visibility
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[${this.toggleAttr}]`)) {
                e.preventDefault();
                this.id = e.target.getAttribute(this.toggleAttr) || -1;
                this.toggle();
            }
        });

        // Confirm item deletion
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[data-delete-confirm]`)) {
                e.preventDefault();
                this.cartHandler.deleteItem(this.id, this);
            }
        });

        // Cancel deletion
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[data-delete-cancel]`)) {
                e.preventDefault();
                this.close();
            }
        });

        // Keyboard event handling
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' || event.key === 'Esc') { 
                this.close();
            }
            if (event.key === 'Enter') {
                if(this.id != -1) this.cartHandler.deleteItem(this.id, this);
            }
        });
    }

    /**
     * Update modal content with specific item data
     * @async
     * @param {Object} data - Item data to display in modal
     */
    async setData(data) {
        this.modal.innerHTML = await this.contentGenerator.getDeleteItemContent(data);
    }
}
