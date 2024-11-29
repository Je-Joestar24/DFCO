/**
 * Home View Class
 * Extends AbstractView to handle the home page rendering
 */
import AbstractView from './AbstractView.js';

export default class extends AbstractView {
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
     * Best Sellers section data
     * Contains product images, names and prices for best selling items
     */
    bestSellers = [
        {
            image: 'images/devil-fruits/gura-gura.png',
            name: 'Gura Gura no Mi',
            price: '₿ 5,000,000',
        },
        {
            image: 'images/devil-fruits/mera-mera.png',
            name: 'Mera Mera no Mi',
            price: '₿ 5,500,000',
        },
        {
            image: 'images/devil-fruits/pica-pica.png',
            name: 'Pica Pica no Mi',
            price: '₿ 4,800,000',
        }
    ];

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
     * Testimonials section data
     * Contains user testimonials with profile images and quotes
     */
    testimonials = [
        {
            image: 'images/profile/ace.jpg',
            name: 'Portgas D. Ace',
            title: 'Mera Mera no Mi User',
            quote: 'The Mera Mera no Mi was exactly as described. The power of flames has completely transformed my abilities. DFCO\'s service was exceptional!',
            large: true,
        },
        {
            image: 'images/profile/marco.jpg',
            name: 'Marco',
            title: 'Phoenix Devil Fruit User',
            quote: 'Regenerative abilities beyond imagination. Best investment ever!',
            large: false,
        },
        {
            image: 'images/profile/luffy.jpg',
            name: 'Monkey D. Luffy',
            title: 'Gomu Gomu no Mi User',
            quote: 'Shishishi! This rubber power is amazing! Now I can be the Pirate King!',
            large: false,
        }
    ];

    /**
     * Constructor
     * Initializes the home view and sets the page title
     */
    constructor() {
        super();
        this.setTitle('Home');
    }

    /**
     * Main HTML renderer
     * Assembles all section components into final page HTML
     * @returns {Promise<string>} Complete HTML for home page
     */
    async getHtml() {
        return `
        <!-- Section Hero Section -->
        ${await this.getHero()}

        <!-- Section 2, features -->
        ${await this.getFeatures()}

        <!-- Section 3, best sellers -->
        ${await this.getBestSellers()}

        <!-- Section 4, how to shop -->
        ${await this.getHowToShop()}

        <!-- Section 5, testimonials -->
        ${await this.getTestimonials()}

        <!-- Section 6, cta -->
        ${await this.getCta()}
        `;
    }

    /**
     * Hero Section renderer
     * Renders the main hero section with animated fruit visuals
     * @returns {Promise<string>} Hero section HTML
     */
    async getHero() {
        return `
        <section
          id="section-1"
          class="hero"
          role="banner"
          aria-label="Hero Section"
        >
          <div class="hero__container">
            <div class="hero__content" role="region" aria-label="Hero Content">
              <div class="hero__text">
                <h1 class="hero__title" role="heading" aria-level="1">
                  Discover the Power of
                  <span class="hero__title-highlight" aria-label="Devil Fruits"
                    >Devil Fruits</span
                  >
                  <span class="hero__title-suffix" aria-label="with DFCO"
                    >with DFCO</span
                  >
                </h1>
                <p class="hero__subtitle" role="text">
                  Unleash extraordinary abilities with our exclusive collection.
                </p>
                <div
                  class="hero__buttons"
                  role="group"
                  aria-label="Call to Action Buttons"
                >
                  <button
                    class="hero__button hero__button--primary"
                    role="button"
                    aria-label="Explore Devil Fruits"
                  >
                    Explore Fruits
                    <span class="hero__button-shine" aria-hidden="true"></span>
                  </button>
                  <button
                    class="hero__button hero__button--secondary"
                    role="button"
                    aria-label="Learn More about Devil Fruits"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            <div
              class="hero__visual"
              role="presentation"
              aria-label="Decorative Devil Fruits Visual"
            >
              <div class="hero__fruits" aria-hidden="true">
                <div class="hero__fruit hero__fruit--paramecia"></div>
                <div class="hero__fruit hero__fruit--mythical"></div>
                <div class="hero__fruit hero__fruit--logia"></div>
              </div>
            </div>
            <div class="hero__particles" aria-hidden="true"></div>
          </div>
        </section>
        `;
    }

    /**
     * Features Section renderer
     * Renders feature cards highlighting DFCO benefits
     * @returns {Promise<string>} Features section HTML
     */
    async getFeatures() {
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

    /**
     * Best Sellers Section renderer
     * Renders product cards for top selling devil fruits
     * @returns {Promise<string>} Best sellers section HTML
     */
    async getBestSellers() {
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
                    src="${bestSeller.image}"
                    alt="${bestSeller.name}"
                    class="bestsellers__image"
                  />
                  <div class="bestsellers__glow"></div>
                </div>
                <div class="bestsellers__info">
                  <h3 class="bestsellers__name">${bestSeller.name}</h3>
                  <p class="bestsellers__price">${bestSeller.price}</p>
                  <button
                    class="bestsellers__button"
                    aria-label="Add ${bestSeller.name} to cart"
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

    /**
     * Shopping Process Section renderer
     * Renders step-by-step guide for shopping process
     * @returns {Promise<string>} Shopping process section HTML
     */
    async getHowToShop() {
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

    /**
     * Testimonials Section renderer
     * Renders customer testimonial cards
     * @returns {Promise<string>} Testimonials section HTML
     */
    async getTestimonials() {
        return `
        <section
          id="section-5"
          class="testimonials"
          role="region"
          aria-label="Customer Testimonials"
        >
          <div class="testimonials__container">
            <h2 class="testimonials__title">What Our Customers Say</h2>
            <div class="testimonials__grid">
              
              ${this.testimonials.map(testimonial => `
                <article
                class="testimonials__card ${testimonial.large ? 'testimonials__card--large' : ''}"
                role="article"
              >
                <div class="testimonials__user-info">
                  <div class="testimonials__avatar">
                    <img
                      src="${testimonial.image}"
                      alt="${testimonial.name} - ${testimonial.title}"
                      class="testimonials__avatar-img"
                    />
                  </div>
                  <div class="testimonials__user-details">
                    <h3 class="testimonials__user-name">${testimonial.name}</h3>
                    <p class="testimonials__user-title">${testimonial.title}</p>
                  </div>
                </div>
                <blockquote class="testimonials__text">
                  "${testimonial.quote}"
                </blockquote>
              </article>
            `)}
            </div>
            <div class="testimonials__floating-elements" aria-hidden="true">
              <div class="testimonials__element testimonials__element--1"></div>
              <div class="testimonials__element testimonials__element--2"></div>
              <div class="testimonials__element testimonials__element--3"></div>
            </div>
          </div>
        </section>
        `;
    }

    /**
     * Call-to-Action Section renderer
     * Renders final CTA section with animated elements
     * @returns {Promise<string>} CTA section HTML
     */
    async getCta() {
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
                  href="#products"
                  class="cta__button cta__button--primary"
                  role="button"
                  aria-label="Start Shopping for Devil Fruits"
                >
                  Start Shopping
                  <div class="cta__particles" aria-hidden="true">
                    <span class="cta__particle"></span>
                    <span class="cta__particle"></span>
                    <span class="cta__particle"></span>
                  </div>
                </a>
                <a
                  href="#login"
                  class="cta__button cta__button--secondary"
                  role="button"
                  aria-label="Join DFCO Community"
                >
                  Join Us
                  <div class="cta__glow" aria-hidden="true"></div>
                </a>
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