import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('About');
    }

    async getHtml() {
        return `
        <section
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
        </section>
        <section id="about-mission" class="about-mission" data-section="about-mission">
            <div class="about-mission__container">
                <h2 class="about-mission__title">Our Mission</h2>
                <div class="about-mission__content">
                    <p class="about-mission__statement">
                        Empowering individuals with extraordinary abilities through the world's finest Devil Fruits.
                    </p>
                    <p class="about-mission__description">
                        At <span class="about-mission__highlight">DFCO</span>, we believe that extraordinary power should be accessible to those who seek it. Our mission is to curate and provide the rarest, most powerful Devil Fruits to both adventurers and collectors alike.
                    </p>
                    <div class="about-mission__values">
                        <div class="about-mission__value">
                            <div class="about-mission__value-icon">
                                <svg class="about-mission__value-icon-svg" viewBox="0 0 24 24" aria-hidden="true" >
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                </svg>
                            </div>
                            <h3 class="about-mission__value-title">Quality</h3>
                            <p class="about-mission__value-description">
                                Every fruit is authenticated and preserved to maintain its full potential.
                            </p>
                        </div>
                        <div class="about-mission__value">
                            <div class="about-mission__value-icon">
                                <svg class="about-mission__value-icon-svg" viewBox="0 0 24 24" aria-hidden="true" >
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"></path>
                                </svg>
                            </div>
                            <h3 class="about-mission__value-title">Trust</h3>
                            <p class="about-mission__value-description">
                                Building lasting relationships through transparency and authenticity.
                            </p>
                        </div>
                        <div class="about-mission__value">
                            <div class="about-mission__value-icon">
                                <svg class="about-mission__value-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"></path>
                                </svg>
                            </div>
                            <h3 class="about-mission__value-title">Excellence</h3>
                            <p class="about-mission__value-description">
                                Committed to providing the finest selection and service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="about-team" class="about-team" data-section="about-team">
            <div class="about-team__container">
                <h2 class="about-team__title">Our Team</h2>
            </div>
        </section>
         <section id="about-choosing" class="about-choosing" data-section="about-choosing">
            <div class="about-choosing__container">
                <h2 class="about-choosing__title">Why Choose Us?</h2>
                <div class="about-choosing__grid">
                    <div class="about-choosing__item">
                        <div class="about-choosing__bullet"></div>
                        <h3 class="about-choosing__item-title">Authentic Collection</h3>
                        <p class="about-choosing__item-text">
                            Every Devil Fruit is meticulously verified and certified for authenticity.
                        </p>
                    </div>

                    <div class="about-choosing__item">
                        <div class="about-choosing__bullet"></div>
                        <h3 class="about-choosing__item-title">Premium Quality</h3>
                        <p class="about-choosing__item-text">
                            Only the finest and most powerful fruits make it to our collection.
                        </p>
                    </div>

                    <div class="about-choosing__item">
                        <div class="about-choosing__bullet"></div>
                        <h3 class="about-choosing__item-title">Expert Guidance</h3>
                        <p class="about-choosing__item-text">
                            Our seasoned professionals help you find your perfect match.
                        </p>
                    </div>

                    <div class="about-choosing__item">
                        <div class="about-choosing__bullet"></div>
                        <h3 class="about-choosing__item-title">Secure Storage</h3>
                        <p class="about-choosing__item-text">
                            State-of-the-art facilities ensure perfect preservation.
                        </p>
                    </div>

                    <div class="about-choosing__item">
                        <div class="about-choosing__bullet"></div>
                        <h3 class="about-choosing__item-title">Global Network</h3>
                        <p class="about-choosing__item-text">
                            Access to rare fruits from every corner of the world.
                        </p>
                    </div>

                    <div class="about-choosing__item">
                        <div class="about-choosing__bullet"></div>
                        <h3 class="about-choosing__item-title">Lifetime Support</h3>
                        <p class="about-choosing__item-text">
                            Continuous assistance throughout your journey with your Devil Fruit.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}
