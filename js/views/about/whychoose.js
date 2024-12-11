export default class{
    
    /**
     * Why Choose Us section data
     * Contains titles and descriptions for each selling point
     */
    whyChooseUs = [
        {
            title: 'Authentic Collection',
            description: 'Every Devil Fruit is meticulously verified and certified for authenticity.',
        },
        {
            title: 'Premium Quality',
            description: 'Only the finest and most powerful fruits make it to our collection.',
        },
        {
            title: 'Expert Guidance',
            description: 'Our seasoned professionals help you find your perfect match.',
        },
        {
            title: 'Secure Storage',
            description: 'State-of-the-art facilities ensure perfect preservation.',
        },
        {
            title: 'Global Network',
            description: 'Access to rare fruits from every corner of the world.',
        },
        {
            title: 'Lifetime Support',
            description: 'Continuous assistance throughout your journey with your Devil Fruit.',
        },
    ];

    /**
     * Why Choose Us Section renderer
     * Renders grid of selling points and benefits
     * @returns {Promise<string>} Why Choose Us section HTML
     */
    async getHtml() {
        return `<section id="about-choosing" class="about-choosing" data-section="about-choosing">
            <div class="about-choosing__container">
                <h2 class="about-choosing__title">Why Choose Us?</h2>
                <div class="about-choosing__grid">
                    ${this.whyChooseUs.map(item => `<div class="about-choosing__item">
                        <div class="about-choosing__bullet"></div>
                        <h3 class="about-choosing__item-title">${item.title}</h3>
                        <p class="about-choosing__item-text">
                            ${item.description}
                        </p>
                    </div>`).join('')}

                </div>
            </div>
        </section>`;
    }
}