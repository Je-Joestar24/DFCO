import { state } from "../../util/state.js";

export default class {1
    constructor() { }

    /**
     * Hero Section renderer
     * Renders the main hero section with animated fruit visuals
     * @returns {Promise<string>} Hero section HTML
     */
    async getHtml() {
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
                  <a
                    class="hero__button hero__button--primary"
                    role="button"
                    aria-label="Explore Devil Fruits"
                    href="#/products"
                  >
                    Explore Fruits
                    <span class="hero__button-shine" aria-hidden="true"></span>
                  </a>
                  ${!state.user.isLoggedIn ? `<button
                    class="hero__button hero__button--secondary"
                    role="button"
                    aria-label="Join Us button to signup or login"
                    data-auth-toggle
                    data-change-auth-active="signup"
                  >
                    Join us
                  </button>`: ""}
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
}