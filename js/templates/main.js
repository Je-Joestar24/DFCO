import Builder from "./builder.js";
import Navigations from "./navigations.js";
import Footer from "./footer.js";
import AbstractTemplate from "./AbstractTemplate.js";

import AuthsModal from "./modal/authsmodal.js";
import ProductsModal from "./modal/productsmodal.js";
import CartsModal from "./modal/CartRemoveItemModal.js";
import CheckoutModal from "./modal/CheckoutModal.js";
import { actions, mutations } from "../util/state.js";

export default class extends AbstractTemplate {
    nav = null;
    constructor() {
        super();
        new Builder();
        this.nav = new Navigations();
        this.footer = new Footer();
        this.init();
    }

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