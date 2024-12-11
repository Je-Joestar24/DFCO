import AbstractModal from "./AbstractModal.js";
import AuthFormHandler from "./auths/FormHandler.js";
import MessageHandler from "./auths/MessageHandler.js";
import HTMLContentGenerator from "./auths/HTMLContentGenerator.js";

export default class extends AbstractModal {
    constructor() {
        super({ modal: 'auth-modal', toggledata: 'data-auth-toggle', activeclass: 'auth-modal--active' });
        this.authFormHandler = new AuthFormHandler();
        this.messageHandler = new MessageHandler(this.modal);
        this.htmlGenerator = new HTMLContentGenerator();
        this.init();
    }

    async init() {
        this.modal.innerHTML = await this.htmlGenerator.getContent();
        this.bindButtons();
        this.bindChangeActive();
        this.authFormHandler.bindAuths(this.modal);
    }

    bindChangeActive() {
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[data-change-auth-active]`)) {
                e.preventDefault();
                const authActiveValue = e.target.getAttribute('data-change-auth-active');
                this.changeActive(authActiveValue);
            }
        });
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[data-message-hide]`)) {
                e.preventDefault();
                this.messageHandler.hide();
            }
        });
    }

    changeActive(active) {
        document.getElementById('login-contents').classList.remove('auth-modal__content--active');
        document.getElementById('signup-contents').classList.remove('auth-modal__content--active');
        document.getElementById(`${active}-contents`).classList.add('auth-modal__content--active');
    }

    /**
     * Override parent open method with custom animation
     * Adds loading state and handles body scroll
     * @override
     */
    open() {
        this.modal.classList.add(this.activeclass);
        document.body.classList.add("no-scroll");
        setTimeout(() => {
            this.modal.classList.remove("auth-modal--loading");
        }, 100);
    }

    /**
     * Override parent close method with custom animation
     * Removes active state and restores body scroll
     * @override
     */
    close() {
        this.modal.classList.remove(this.activeclass);
        document.body.classList.remove("no-scroll");

        setTimeout(() => {
            this.modal.classList.add("auth-modal--loading");
        }, 300);
    }
}
