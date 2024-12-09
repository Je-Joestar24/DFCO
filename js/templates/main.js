import Navigations from "./navigations.js";
import AbstractTemplate from "./AbstractTemplate.js";
import AuthsModal from "./modal/authsmodal.js";
import FruitModal from "./modal/fruitsmodal.js";
import { mutations } from "../util/state.js";

export default class extends AbstractTemplate {
    nav = null;
    constructor() {
        super();
        this.nav = new Navigations();
        this.init();
    }

    async init() {
        document.getElementById('app__nav').innerHTML = await this.getHtml();
        new AuthsModal();
        new FruitModal();
        await this.nav.bindLogout();
        await this.bindAddToCart();
    }

    async getHtml() {
        return `
        ${await this.nav.getHtml()}
        `;
    }

    async bindAddToCart() {
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[data-cart-add]`)) {
                e.preventDefault();
                const attributeValue = e.target.getAttribute(`data-cart-add`);

                if (attributeValue) {
                    mutations.addToCart(parseInt(attributeValue));
                }
            }
        });
    }

}