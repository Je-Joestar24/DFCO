export default class {
    constructor() {

    }
    /**
     * Shopping Steps section data
     * Contains icon paths, titles and descriptions for shopping process steps
     */
    steps = [
        {
            iconpath: `M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z`,
            title: 'Browse Fruits',
            description: 'Explore our extensive collection of authentic devil fruits.',
        },
        {
            iconpath: `M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z`,
            title: 'Add Favorites',
            description: 'Select your desired fruits and add them to your cart.',
        },
        {
            iconpath: `M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z`,
            title: 'Checkout & Enjoy',
            description: 'Complete your purchase securely and await your power.',
        }
    ];

    
  /**
   * Shopping Process Section renderer
   * Renders step-by-step guide for shopping process
   * @returns {Promise<string>} Shopping process section HTML
   */
  async getHtml() {
    return `
        <section
          id="section-4"
          class="process"
          role="region"
          aria-label="How to Shop with DFCO"
        >
          <div class="process__container">
            <div class="process__steps">
            ${this.steps.map((step, index) => `
              <article class="process__card" role="article">
                <div class="process__number">${index + 1}</div>
                <div class="process__icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="${step.iconpath}"
                    />
                  </svg>
                </div>
                <h3 class="process__card-title">${step.title}</h3>
                <p class="process__card-description">
                  ${step.description}
                </p>
              </article>
            `).join('')}
            </div>
            <h2 class="process__title">How to Shop with DFCO</h2>
          </div>
        </section>
        `;
  }
}