export default class {
    constructor() {
        this.build();
    }

    build() {
        document.getElementById("app").innerHTML = this.getHtml();
    }

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

    getFooter() {
        return `
        <footer id="footer" class="footer" role="contentinfo" aria-label="Footer">
        </footer>
        `;
    }

    getMessages(){
        return `
        <div
            class="app__message"
            role="alert"
            aria-label="Application Message Display Area"
        ></div>
        `;
    }

    getAuthModal(){
        return `
        <div
            id="auth-modal"
            class="auth-modal auth-modal--loading"
            aria-label="Auth Modal Display area"
        ></div>
        `;
    }

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