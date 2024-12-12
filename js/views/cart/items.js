export default class {

    /**
     * Generates the HTML for the cart items.
     * Displays each item in the cart with its details and controls.
     * @returns {Promise<string>} The HTML string for the cart items.
     */
    async getHtml(cart) {
        return `
        <div class="cart__items">
            ${!cart.cart || cart.cart.length === 0 ? `
                <div class="cart__empty" role="alert">
                    <div class="cart__empty-icon" aria-hidden="true">🛒</div>
                    <h2 class="cart__empty-text">No items in cart</h2>
                </div>
            ` : cart.cart.map(item => `
                <div class="cart__item" data-item-id="${item.id}">
                    <div class="cart__item-select">
                        <label class="cart__checkbox" aria-label="Select ${item.name}">
                            <input type="checkbox" 
                                   class="cart__checkbox-input" 
                                   ${item.checked ? 'checked' : ''}
                                   aria-label="Select ${item.name}">
                            <span class="cart__checkbox-mark"></span>
                        </label>
                    </div>
                    <div class="cart__item-image">
                        <img src="${item.image1}" 
                             alt="${item.name}" 
                             role="img" 
                             loading="lazy">
                    </div>
                    <div class="cart__item-details">
                        <h3 class="cart__item-name">${item.name}</h3>
                        <p class="cart__item-type">${item.type} Type</p>
                        <p class="cart__item-price">${item.price}</p>
                    </div>
                    <div class="cart__item-controls">
                        <div id="cart__quantity-${item.id}" class="cart__quantity">
                            <button class="cart__quantity-btn" 
                                    ${item.quantity == 1 ? ` data-remove-item="${item.id}" ` : ""}
                                    aria-label="Decrease quantity">-</button>
                            <span id="quantity-${item.id}" 
                                  class="cart__quantity-number"
                                  role="text"
                                  aria-label="Quantity">${item.quantity}</span>
                            <button class="cart__quantity-btn" 
                                    aria-label="Increase quantity">+</button>
                        </div>
                        <button class="cart__item-remove" 
                                aria-label="Remove ${item.name} from cart" data-remove-item="${item.id}">×</button>
                    </div>
                </div>
            `).join('')}
        </div>
        `;
    }

}