export default class {

    /**
     * Generates decorative elements for the footer
     * @returns {Promise<string>} Decorative elements HTML
     */
    async getHtml() {
        return `
            <div
            class="footer__decoration footer__decoration--1"
            aria-hidden="true"
            ></div>
            <div
            class="footer__decoration footer__decoration--2"
            aria-hidden="true"
            ></div>
        `;
    }
}