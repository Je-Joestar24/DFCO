export default class {

    /**
     * Common footer navigation links shown to all users
     * @type {Array<{href: string, name: string}>}
     */
    navs = [
        { href: "#/", name: "Home" },
        { href: "#/products", name: "Products" },
        { href: "#/about", name: "About" }
    ];

    /**
     * Generates the navigation links section for the footer
     * @returns {Promise<string>} Navigation HTML with mapped links
     */
    async getHtml() {
        return `
            <nav
                class="footer__nav"
                role="navigation"
                aria-label="Footer Navigation"
                >
                ${this.navs.map(nav => `<a href="${nav.href}" class="footer__link" data-link>${nav.name}</a>`).join("")}
            </nav>
        `;
    }
}