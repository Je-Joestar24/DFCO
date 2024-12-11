export default class {

    /**
     * About Intro Section renderer
     * Renders the main intro section with animated fruit visuals
     * @returns {Promise<string>} Intro section HTML
     */
    async getHtml() {
        return `        <section
          id="about-intro"
          class="about-intro"
          data-section="about-intro"
        >
          <div class="about-intro__container">
            <div class="about-intro__content">
              <h1 class="about-intro__title">Discover the Power Within</h1>
              <p class="about-intro__description">
                Welcome to <span class="about-intro__highlight">DFCO</span>,
                where legendary power meets destiny. We're not just a store –
                we're curators of extraordinary abilities, bringing you the
                rarest and most powerful Devil Fruits from across the seas.
              </p>
              <p class="about-intro__description">
                Each fruit in our collection is carefully authenticated and
                preserved, ensuring that whether you're an adventurer seeking
                power or a collector pursuing legends, you'll find your perfect
                match at DFCO.
              </p>
            </div>
            <div class="about-intro__visual">
              <div class="about-intro__fruits">
                <div class="about-intro__fruit about-intro__fruit--main"></div>
                <div
                  class="about-intro__fruit about-intro__fruit--accent1"
                ></div>
                <div
                  class="about-intro__fruit about-intro__fruit--accent2"
                ></div>
              </div>
            </div>
            <div class="about-intro__background">
              <div class="about-intro__glow"></div>
            </div>
          </div>
        </section>`;
    }

}