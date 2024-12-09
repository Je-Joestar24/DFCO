import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("DFCO | Checkouts");
    }

    async getHtml() {
        return `
        <section id="app-checkouts" class="app__checkouts" role="region" aria-label="Checkout History">
          <div class="checkouts__content">
            <div class="checkouts__header">
              <label class="checkouts__select-all" aria-label="Select all checkouts">
                <input type="checkbox">
                <span class="checkouts__select-all-mark"></span>
              </label>
              <h2 class="checkouts__title">Checkout History</h2>
            </div>
            <div id="app-checkout-list" class="checkouts__list">
              <!-- ALL checkout item -->
              ${await this.getCheckoutList()}
            </div>
            <div id="app-checkout-summary" class="checkouts__summary">
              ${await this.getCheckoutSummary()}
            </div>
          </div>
        </section>
        `;
    }

    async getCheckoutList(){
        return `
        <div class="checkouts__item">
            <label class="checkouts__checkbox" aria-label="Select checkout">
                <input type="checkbox">
                <span class="checkouts__checkbox-mark"></span>
            </label>
        
            <div class="checkouts__product">
                <div class="checkouts__product-image">
                <img src="images/devil-fruits/gura-gura.png" alt="Product name" loading="lazy">
                </div>
                <div class="checkouts__product-info">
                <span class="checkouts__product-name">Product Name</span>
                </div>
            </div>
        
            <span class="checkouts__quantity">2x</span>
            <span class="checkouts__price">$299.99</span>
        </div>
        `;
    }

    async getCheckoutSummary(){
        return `
        <div class="checkouts__summary-row">
            <span>Selected Items</span>
            <span>3</span>
        </div>
        <div class="checkouts__summary-row">
            <span>Total Items</span>
            <span>5</span>
        </div>
        <div class="checkouts__summary-row checkouts__summary-total">
            <span>Total Amount</span>
            <span>$899.97</span>
        </div>
        `;
    }
}