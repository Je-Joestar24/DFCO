import Navigations from "./navigations.js";
import AbstractTemplate from "./AbstractTemplate.js";

export default class extends AbstractTemplate{
    nav = null;
    constructor(){
        super();
        this.nav = new Navigations();
        this.init();
    }

    async init(){
        document.getElementById('app__nav').innerHTML = await this.getHtml();
    }

    async getHtml(){
        return `
        ${await this.nav.getHtml()}
        `;
    }

}