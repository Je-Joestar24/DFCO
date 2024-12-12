export default class {

    /**
     * Common navigation links shown to all users
     * @type {Array<{id: string, href: string, name: string}>}
     */
    commonNav = [
        { id: 'home-nav', href: "#/", name: "Home" },
        { id: 'products-nav', href: "#/products", name: "Products" },
        { id: 'about-nav', href: "#/about", name: "About" }
    ];

    /**
     * Generates the HTML for the navigation that has common designs
     * @returns {Promise<string>} Common navigation html
     */
    async geHtml() {
        return `
      <ul class="nav__list">
        ${this.commonNav.map(nav => `
        <li class="nav__item">
          <a id="${nav.id}" href="${nav.href}" class="nav__link" data-link>${nav.name}</a>
        </li>
        `).join("")}
      </ul>
    `;
    }
}