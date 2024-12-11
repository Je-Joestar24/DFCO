/**
 * Builder class responsible for constructing the main application layout
 * Creates the initial HTML structure including navigation, main content area,
 * footer, message display, and various modal components
 */
export default class {
    constructor() {
        this.build();
    }

    /**
     * Initializes the application layout by inserting HTML into root element
     */
    build() {
        document.getElementById("app").innerHTML = this.getHtml();
    }

    /**
     * Generates the complete HTML structure for the application
     * @returns {string} Combined HTML for all major layout sections
     */
    getHtml() {
        return `
        ${this.getNav()}
        ${this.getDisplayArea()}
        ${this.getFooter()}
        ${this.getMessages()}
        ${this.getAuthModal()}
        ${this.getFruitsModal()}
        ${this.getDeleteItemModal()}
        ${this.getCheckoutModal()}
        `;
    }

    /**
     * Creates the main navigation container
     * @returns {string} Navigation HTML structure
     */
    getNav() {
        return `
        <nav
            id="app__nav"
            class="nav"
            role="navigation"
            aria-label="Main Navigation"
        ></nav>
        `;
    }

    /**
     * Creates the main content display area
     * @returns {string} Main content area HTML structure
     */
    getDisplayArea() {
        return `
        <main
            id="app__display"
            aria-label="All contents of the page display area"
        >
        <!-- All sections are loaded here -->
        </main>
        `;
    }

    /**
     * Creates the footer container
     * @returns {string} Footer HTML structure
     */
    getFooter() {
        return `
        <footer id="footer" class="footer" role="contentinfo" aria-label="Footer">
        </footer>
        `;
    }

    /**
     * Creates the message display area for notifications
     * @returns {string} Message display HTML structure
     */
    getMessages(){
        return `
        <div
            class="app__message"
            role="alert"
            aria-label="Application Message Display Area"
        ></div>
        `;
    }

    /**
     * Creates the authentication modal container
     * @returns {string} Auth modal HTML structure
     */
    getAuthModal(){
        return `
        <div
            id="auth-modal"
            class="auth-modal auth-modal--loading"
            aria-label="Auth Modal Display area"
            data-auth-toggle
        ></div>
        `;
    }

    /**
     * Creates the fruits display modal container
     * @returns {string} Fruits modal HTML structure
     */
    getFruitsModal(){
        return `
        <div
            id="fruit-modal"
            class="fruit-modal"
            aria-label="Fruit Modal Display area"
            data-fruit-toggle
        >
        </div>
        `;
    }

    /**
     * Creates the cart item deletion modal container
     * @returns {string} Delete item modal HTML structure
     */
    getDeleteItemModal(){
        return `
        <div
            id="cart-modal__delete-item"
            class="cart-modal cart-modal--delete"
            aria-label="Cart Modal Delete Dialog"
            data-remove-item
        >
        </div>
        `;
    }

    /**
     * Creates the checkout modal container
     * @returns {string} Checkout modal HTML structure
     */
    getCheckoutModal(){
        return `
        <div
            id="item__checkout-modal"
            class="item-modal item__checkout-modal"
            aria-label="Item Modal Checkout Dialog"
            data-checkout-item
        >
        </div>
        `;
    }
}