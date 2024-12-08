import AbstractModal from "./AbstractModal.js";

export default class extends AbstractModal {
    constructor() {
        super({ modal: 'fruit-modal', toggledata: 'data-fruit-toggle', activeclass: 'open' });
        this.init();
    }

    async init(){
        this.modal.innerHTML = await this.getContent()
        this.bindButtons();
    }

    async getContent(){
        return `
        <div class="fruit-modal__content">
            <div class="fruit-modal__header">
            <div>
                <h2 class="fruit-modal__title">Hito Hito no Mi</h2>
                <p class="fruit-modal__alias">Human-Human Fruit, Model: Nika</p>
            </div>
            <button class="fruit-modal__close" aria-label="Close modal" data-fruit-toggle>
                ×
            </button>
            </div>

            <div class="fruit-modal__body">
            <div class="fruit-modal__main-info">
                <div class="fruit-modal__image">
                <img src="path/to/fruit-image.jpg" alt="Hito Hito no Mi">
                <div class="fruit-modal__price">$999,999</div>
                </div>
                
                <p class="fruit-modal__description">
                The Hito Hito no Mi, Model: Nika is a Mythical Zoan-type Devil Fruit that allows the user to transform into the legendary 'Sun God' Nika, granting them immense power and freedom.
                </p>

                <div class="fruit-modal__popular-user">
                <span class="fruit-modal__user-label">Popular User:</span>
                <span class="fruit-modal__user-name">Monkey D. Luffy</span>
                </div>

                <div class="fruit-modal__specifications">
                <div class="fruit-modal__spec">
                    <div class="fruit-modal__spec-label">Power</div>
                    <div class="fruit-modal__spec-value">S+</div>
                </div>
                <div class="fruit-modal__spec">
                    <div class="fruit-modal__spec-label">Range</div>
                    <div class="fruit-modal__spec-value">∞</div>
                </div>
                <div class="fruit-modal__spec">
                    <div class="fruit-modal__spec-label">Durability</div>
                    <div class="fruit-modal__spec-value">S</div>
                </div>
                </div>
            </div>

            <div class="fruit-modal__lists">
                <div class="fruit-modal__list-section">
                <h3 class="fruit-modal__list-title">Abilities</h3>
                <ol class="fruit-modal__list">
                    <li class="fruit-modal__list-item">Nika Transformation</li>
                    <li class="fruit-modal__list-item">Enhanced Strength</li>
                    <li class="fruit-modal__list-item">Rubber Body</li>
                    <li class="fruit-modal__list-item">Freedom of Movement</li>
                </ol>
                </div>

                <div class="fruit-modal__list-section">
                <h3 class="fruit-modal__list-title">Weaknesses</h3>
                <ol class="fruit-modal__list">
                    <li class="fruit-modal__list-item">Standard Devil Fruit weaknesses (cannot swim)</li>
                    <li class="fruit-modal__list-item">Requires stamina to maintain transformation</li>
                </ol>
                </div>
            </div>
            </div>

            <div class="fruit-modal__actions">
            <button class="fruit-modal__button fruit-modal__button--cart" aria-label="Add to cart">
                <svg class="fruit-modal__button-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0-3l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1v2h2l3.6 7.59L3.62 17H19v-2H7z"/>
                </svg>
                Add to Cart
            </button>
            <button class="fruit-modal__button fruit-modal__button--buy" aria-label="Buy now">
                <svg class="fruit-modal__button-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-2 0H3V6h14v8zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm13 0v11c0 1.1-.9 2-2 2H4v-2h17V7h2z"/>
                </svg>
                Buy Now
            </button>
            </div>
        </div>
        `;
    }
}