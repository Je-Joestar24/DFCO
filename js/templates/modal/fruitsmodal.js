import AbstractModal from "./AbstractModal.js";
import { actions, getters } from "../../util/state.js";

export default class extends AbstractModal {
    constructor() {
        super({ modal: 'fruit-modal', toggledata: 'data-fruit-toggle', activeclass: 'open' });
        this.init();
    }

    async init() {
        this.modal.innerHTML = await this.getContent()
        this.bindButtons();
        this.bindButtons2();
    }

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

    async setData(json) {
        await actions.fetchDevilFruitDetails(json);
        this.modal.innerHTML = await this.getContent();
    }

    async getContent() {
        this.data = await getters.getDisplay();
        
        return `
        <div class="fruit-modal__loading"></div>
        <div id="fruit-modal__content" class="fruit-modal__content">
            <div class="fruit-modal__header">
            <div>
                ${await this.getModalHeader()}
            </div>
            <button class="fruit-modal__close" aria-label="Close modal" data-fruit-toggle>
                ×
            </button>
            </div>

            <div class="fruit-modal__body">
                ${await this.getModalContents()}
            </div>

            <div class="fruit-modal__actions">
            <button class="fruit-modal__button fruit-modal__button--cart" aria-label="Add to cart" ${getters.getUser().isLoggedIn ? '': ` data-auth-toggle data-change-auth-active="login"`}>
                <svg class="fruit-modal__button-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0-3l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1v2h2l3.6 7.59L3.62 17H19v-2H7z"/>
                </svg>
                Add to Cart
            </button>
            <button class="fruit-modal__button fruit-modal__button--buy" aria-label="Buy now" ${getters.getUser().isLoggedIn ? '': ` data-auth-toggle data-change-auth-active="login"`}>
                <svg class="fruit-modal__button-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-2 0H3V6h14v8zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm13 0v11c0 1.1-.9 2-2 2H4v-2h17V7h2z"/>
                </svg>
                Buy Now
            </button>
            </div>
        </div>
        `;
    }

    async getModalHeader() {
        return `
        <h2 class="fruit-modal__title">
            ${this.data.name}
            <span class="fruit-modal__type fruit-modal__type--${this.data.type.toLowerCase()}" role="text">
                <svg class="fruit-modal__type-icon" viewBox="0 0 24 24" aria-hidden="true">
                    ${getTypeIcon(this.data.type)}
                </svg>
                ${this.data.type}
            </span>
        </h2>
        <p class="fruit-modal__alias">${this.data.alias}</p>
        `;
    }

    async getModalContents() {
        return `
        <div class="fruit-modal__main-info">
            <div class="fruit-modal__image">
            <img src="${this.data.img}" alt="${this.data.name}">
            <div class="fruit-modal__price">${this.data.price}</div>
        </div>
            
            <p class="fruit-modal__description">
            ${this.data.description}
            </p>

        <div class="fruit-modal__popular-user">
            <span class="fruit-modal__user-label">Popular User:</span>
            <span class="fruit-modal__user-name">${this.data.currentUser}</span>
        </div>

        <div class="fruit-modal__specifications">
            ${Object.entries(this.data.specifications).map(([key, value]) => `<div class="fruit-modal__spec">
                <div class="fruit-modal__spec-label">${key}</div>
                <div class="fruit-modal__spec-value">${value}</div>
            </div>`).join('')}
            </div>
        </div>

        <div class="fruit-modal__lists">
            <div class="fruit-modal__list-section">
            <h3 class="fruit-modal__list-title">Abilities</h3>
            <ol class="fruit-modal__list">
                ${this.data.abilities.map((val) => `<li class="fruit-modal__list-item">${val}</li>`).join("")}
            </ol>
            </div>

            <div class="fruit-modal__list-section">
            <h3 class="fruit-modal__list-title">Weaknesses</h3>
            <ol class="fruit-modal__list">
                ${this.data.weaknesses.map((val) => `<li class="fruit-modal__list-item">${val}</li>`).join("")}
            </ol>
            </div>
        </div>
        `;
    }
}

function getTypeIcon(type) {
    const icons = {
        Paramecia: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>',
        Zoan: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>',
        Logia: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>',
        Mythical: '<path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>'
    };
    return icons[type] || icons.Paramecia;
}