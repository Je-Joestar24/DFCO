import AbstractModal from "./AbstractModal.js";
import CartItemHandler from "./carts/CartItemHandler.js";
import ModalContentGenerator from "./carts/HTMLContentGenerator.js";

export default class CartRemoveItemModal extends AbstractModal {
    constructor() {
        super({ modal: 'cart-modal__delete-item', toggledata: 'data-remove-item', activeclass: 'open' });
        this.cartHandler = new CartItemHandler();
        this.contentGenerator = new ModalContentGenerator();
        this.id = -1;
        this.init();
    }

    async init() {
        this.modal.innerHTML = await this.contentGenerator.getDeleteItemContent();
        this.bindButtons();
    }

    bindButtons() {
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[${this.toggleAttr}]`)) {
                e.preventDefault();
                this.id = e.target.getAttribute(this.toggleAttr) || -1;
                this.toggle();
            }
        });

        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[data-delete-confirm]`)) {
                e.preventDefault();
                this.cartHandler.deleteItem(this.id, this);
            }
        });

        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[data-delete-cancel]`)) {
                e.preventDefault();
                this.close();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' || event.key === 'Esc') { 
                this.close();
            }
            if (event.key === 'Enter') {
                if(this.id != -1)this.cartHandler.deleteItem(this.id, this);
            }
        });
    }

    async setData(data) {
        this.modal.innerHTML = await this.contentGenerator.getDeleteItemContent(data);
    }
}
