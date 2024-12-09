import Navigations from "./navigations.js";
import AbstractTemplate from "./AbstractTemplate.js";
import AuthsModal from "./modal/authsmodal.js";
import FruitModal from "./modal/fruitsmodal.js";

export default class extends AbstractTemplate{
    nav = null;
    constructor(){
        super();
        this.nav = new Navigations();
        this.init();
    }

    async init(){
        document.getElementById('app__nav').innerHTML = await this.getHtml();
        new AuthsModal();
        new FruitModal();
        this.nav.bindLogout();
    }

    async getHtml(){
        return `
        ${await this.nav.getHtml()}
        `;
    }

}