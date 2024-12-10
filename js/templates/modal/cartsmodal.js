import AbstractModal from "./AbstractModal.js";
import { actions, getters, mutations } from "../../util/state.js";
import Cart from "../../views/cart.js";

export default class extends AbstractModal {
    constructor() {
        super({ modal: 'cart-modal__delete-item', toggledata: 'data-remove-item', activeclass: 'open' });
        this.init();
        this.id = -1;
        this.helper = new Cart();
    }

    async init() {
        this.modal.innerHTML = await this.getContent()
        this.bindButtons();
    }

    /* override */
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

    async deleteNow(){
        alert(this.id)
        const deleted = await mutations.removeFromCart(this.id);
        if(deleted){
            this.helper.fullRerender();
            this.toggle();
        }
    }

    async setData(json) {
        await actions.fetchDevilFruitDetails(json);
        this.modal.innerHTML = await this.getContent();
    }

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
