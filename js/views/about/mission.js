export default class {

    /**
     * Mission values data
     * Contains icon paths, titles and descriptions for mission section
     */
    mission = [
        {
            iconpath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
            title: 'Quality',
            description: 'Every fruit is authenticated and preserved to maintain its full potential.',
        },
        {
            iconpath: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z',
            title: 'Trust',
            description: 'Building lasting relationships through transparency and authenticity.',
        },
        {
            iconpath: 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z',
            title: 'Excellence',
            description: 'Committed to providing the finest selection and service.',
        },
    ];


    /**
     * Mission Section renderer
     * Renders the mission statement and core values
     * @returns {Promise<string>} Mission section HTML
     */
    async getHtml() {
        return `<section id="about-mission" class="about-mission" data-section="about-mission">
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
                        ${this.mission.map(mission => `
                        <div class="about-mission__value">
                            <div class="about-mission__value-icon">
                                <svg class="about-mission__value-icon-svg" viewBox="0 0 24 24" aria-hidden="true" >
                                    <path d="${mission.iconpath}"></path>
                                </svg>
                            </div>
                            <h3 class="about-mission__value-title">${mission.title}</h3>
                            <p class="about-mission__value-description">
                                ${mission.description}
                            </p>
                        </div>`).join('')}
                    </div>
                </div>
            </div>
        </section>`;
    }

}