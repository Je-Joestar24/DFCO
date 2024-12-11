/**
 * About View Class
 * Handles rendering of the About page sections including intro, mission and why choose us
 * Extends AbstractView for common view functionality
 */
import AbstractView from './AbstractView.js';

/* Sub components */
import Intro from './about/intro.js';
import WhyChoose from './about/whychoose.js';
import Mission from './about/mission.js';

export default class extends AbstractView {

    /**
     * Constructor
     * Initializes the about view and sets the page title
     */
    constructor() {
        super();
        this.setTitle('DFCO | About');
        this.intro = new Intro();
        this.mission = new Mission();
        this.whychoose = new WhyChoose();
    }

    /**
     * Main HTML renderer
     * Assembles all section components into final page HTML
     * @returns {Promise<string>} Complete HTML for about page
     */
    async getHtml() {
        return `
        ${await this.intro.getHtml()}
        ${await this.mission.getHtml()}
        ${await this.whychoose.getHtml()}
         
        `;
    }

}

