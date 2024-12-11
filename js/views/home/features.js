export default class {
    constructor() {

    }

    /**
     * Features section data
     * Contains icon paths, titles and descriptions for feature cards
     */
    features = [
        {
            iconpath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
            title: 'Wide Selection',
            description: 'Explore a diverse range of devil fruits for every taste.',
        },
        {
            iconpath: 'M7 17h10v-2H7v2zm0-4h10v-2H7v2zm0-4h10V7H7v2zm12-4h-4.18C14.4 3.84 13.3 3 12 3c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75z',
            title: 'Quality Guarantee',
            description: 'Each fruit is certified for authenticity.',
        },
        {
            iconpath: 'M7 17h10v-2H7v2zm0-4h10v-2H7v2zm0-4h10V7H7v2zm12-4h-4.18C14.4 3.84 13.3 3 12 3c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75z',
            title: 'Easy Shopping',
            description: 'Intuitive cart and checkout experience.',
        },
    ];

    /**
     * Features Section renderer
     * Renders feature cards highlighting DFCO benefits
     * @returns {Promise<string>} Features section HTML
     */
    async getHtml() {
        return `<section
          id="section-2"
          class="features"
          role="region"
          aria-label="Why Choose DFCO"
        >
          <div class="features__container">
            <h2 class="features__title">Why Choose DFCO?</h2>
            <div class="features__grid">
            ${this.features.map(feature => `
              <article class="features__card" role="article">
                <div class="features__icon-wrapper">
                  <div class="features__icon-circle">
                    <svg
                      class="features__icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="${feature.iconpath}"
                      />
                    </svg>
                  </div>
                </div>
                <h3 class="features__card-title">${feature.title}</h3>
                <p class="features__card-description">
                  ${feature.description}
                </p>
              </article>
            `).join('')}
            </div>
          </div>
        </section>
        `;
    }
}