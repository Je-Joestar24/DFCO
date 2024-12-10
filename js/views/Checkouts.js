import AbstractView from "./AbstractView.js";
import { getters } from "../util/state.js";

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
              <h2 class="checkouts__title">My Checkout History</h2>
            </div>
            <div id="app-checkout-list" class="checkouts__list">
              <!-- ALL checkout item -->
              ${await this.getCheckoutList()}
            </div>
          </div>
        </section>
        `;
  }

  async getCheckoutList() {
    const checkouts =[];
    if (!checkouts || checkouts.length === 0) {
      return `
        <div class="cart__empty" role="alert">
          <div class="cart__empty-icon" aria-hidden="true">📦</div>
          <h2 class="cart__empty-text">No checkout history</h2>
        </div>
        `;
    }

    return `${checkouts.map(item => `
        <div class="checkouts__item">
        
            <div class="checkouts__product">
                <div class="checkouts__product-image">
                <img src="${item.image1}" alt="${item.name}" loading="lazy">
                </div>
                <div class="checkouts__product-info">
                <span class="checkouts__product-name">${item.name}</span>
                </div>
            </div>
        
            <span class="checkouts__quantity">${item.quantity}x</span>
            <span class="checkouts__price">${item.total}</span>
        </div>`).join("")}
        `;
  }

}