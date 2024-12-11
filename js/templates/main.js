/**
 * Main application class that initializes and coordinates core components
 * Extends AbstractTemplate for common functionality
 */
import Builder from "./builder.js";
import Navigations from "./navigations.js";
import Footer from "./footer.js";
import AbstractTemplate from "./AbstractTemplate.js";

import AuthsModal from "./modal/AuthsModal.js";
import ProductsModal from "./modal/ProductsModal.js"; 
import CartsModal from "./modal/CartRemoveItemModal.js";
import CheckoutModal from "./modal/CheckoutModal.js";
import { actions, mutations } from "../util/state.js";

export default class extends AbstractTemplate {
    /** @type {Navigations|null} Navigation component instance */
    nav = null;

    /**
     * Initializes main application components and starts setup
     */
    constructor() {
        super();
        new Builder();
        this.nav = new Navigations();
        this.footer = new Footer();
        this.init();
    }

    /**
     * Initializes the application by:
     * - Rendering navigation and footer
     * - Setting up notification markers
     * - Initializing modal components
     * - Binding event handlers
     */
    async init() {
        document.getElementById('app__nav').innerHTML = await this.nav.getHtml();
        document.getElementById('footer').innerHTML = await this.footer.getHtml();
        await actions.setNotificationMark();
        new AuthsModal();
        new ProductsModal();
        new CartsModal();
        new CheckoutModal();
        await this.nav.bindLogout();
        await this.bindAddToCart();
    }

    /**
     * Binds click handler for adding items to cart
     * Updates cart state and displays confirmation message
     */
    async bindAddToCart() {
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[data-cart-add]`)) {
                e.preventDefault();
                const attributeValue = e.target.getAttribute(`data-cart-add`);

                if (attributeValue) {
                    mutations.addToCart(parseInt(attributeValue));
                    actions.displayMessage("ADDED TO CART", 700);
                    actions.setNotificationMark();
                }
            }
        });
    }
}