import { getters } from "../../util/state.js";

export default class{
  /**
   * Retrieves the list of checkouts and generates the corresponding HTML.
   * @returns {Promise<string>} The HTML string for the checkout items or an empty state message.
   */
  async getHtml() {
    const checkouts = getters.getCheckouts();
    if (!checkouts || checkouts.length === 0) {
      return `
            ${await this.getEmpty()}
        `;
    }

    return `
            ${await this.getCheckouts(checkouts)}
        `;
  }

  async getEmpty(){
    return`
        <div class="cart__empty" role="alert">
          <div class="cart__empty-icon" aria-hidden="true">📦</div>
          <h2 class="cart__empty-text">No checkout history</h2>
        </div>
    `;
  }

  async getCheckouts(checkouts){
    return `
    ${checkouts.map(item => `
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