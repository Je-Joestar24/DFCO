export default class {
    constructor() {

    }

    /**
     * Call-to-Action Section renderer
     * Renders final CTA section with animated elements
     * @returns {Promise<string>} CTA section HTML
     */
    async getHtml() {
        return `
        <section
          id="section-6"
          class="cta"
          role="region"
          aria-label="Call to Action"
        >
          <div class="cta__container">
            <div class="cta__content">
              <h2 class="cta__title">Ready to Find Your Devil Fruit?</h2>
              <p class="cta__description">
                Join the ranks of legendary power users and discover your
                destiny.
              </p>
              <div class="cta__buttons">
                <a
                  href="#/products"
                  class="cta__button cta__button--primary"
                  role="button"
                  aria-label="Explore Fruits for Devil Fruits"
                  data-link
                >
                  Explore Fruits
                  <div class="cta__particles" aria-hidden="true">
                    <span class="cta__particle"></span>
                    <span class="cta__particle"></span>
                    <span class="cta__particle"></span>
                  </div>
                </a>
                <button
                  class="cta__button cta__button--secondary"
                  role="button"
                  aria-label="Join DFCO Community"
                  data-auth-toggle
                  data-change-auth-active="signup"
                >
                  Join Us
                  <div class="cta__glow" aria-hidden="true"></div>
                </button>
              </div>
            </div>
            <div class="cta__background" aria-hidden="true">
              <div class="cta__ring"></div>
              <div class="cta__core"></div>
            </div>
          </div>
        </section>
        `;
    }

}