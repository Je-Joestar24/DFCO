import { actions, state } from "../../util/state.js";

export default class {
    constructor() {

    }


    getTopSoldFruits() {
        const sortedFruits = state.products.sort((a, b) => parseInt(b.sold.replace(',', '')) - parseInt(a.sold.replace(',', '')));
        // Select the top 5 fruits
        return sortedFruits.slice(0, 3);
    }

    /**
     * Best Sellers Section renderer
     * Renders product cards for top selling devil fruits
     * @returns {Promise<string>} Best sellers section HTML
     */
    async getHtml() {
        await actions.fetchProducts()
        const sortedFruits = state.products.sort((a, b) => parseInt(b.sold.replace(',', '')) - parseInt(a.sold.replace(',', '')));
        this.bestSellers = await sortedFruits.slice(0, 3);
        return `
        <section
          id="section-3"
          class="bestsellers"
          role="region"
          aria-label="Best Selling Devil Fruits"
        >
          <div class="bestsellers__container">
            <h2 class="bestsellers__title">Best Sellers</h2>
            <div class="bestsellers__grid">
            ${this.bestSellers.map(bestSeller => `
              <article
                class="bestsellers__card"
                role="article"
                aria-label="Pica Pica no Mi Devil Fruit"
              >
                <div class="bestsellers__image-wrapper">
                  <img
                    src="${bestSeller.image1}"
                    alt="${bestSeller.name1}"
                    class="bestsellers__image"
                    loading="lazy"
                  />
                  <div class="bestsellers__glow"></div>
                </div>
                <div class="bestsellers__info">
                  <h3 class="bestsellers__name">${bestSeller.name}</h3>
                  <p class="bestsellers__price">${bestSeller.price}</p>
                  <button
                    class="bestsellers__button"
                    aria-label="Add ${bestSeller.name} to cart"
                      ${state.user.isLoggedIn ? ` data-cart-add="${bestSeller.id}" ` : ` data-auth-toggle data-change-auth-active="login"`}
                  >
                    Add to Cart
                    <span class="bestsellers__cart-icon" aria-hidden="true"
                      >🛒</span
                    >
                  </button>
                </div>
              </article>
            `).join('')}
            </div>
          </div>
        </section>
        `;
    }
}