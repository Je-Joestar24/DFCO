export default class {
    constructor() {

    }

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
     * Testimonials Section renderer
     * Renders customer testimonial cards
     * @returns {Promise<string>} Testimonials section HTML
     */
    async getHtml() {
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
}