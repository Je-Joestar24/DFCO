import AbstractModal from "./AbstractModal.js";
import AuthFormHandler from "./auths/FormHandler.js";
import MessageHandler from "./auths/MessageHandler.js";
import HTMLContentGenerator from "./auths/HTMLContentGenerator.js";

/**
 * AuthsModal Class
 * Handles authentication modal functionality including login and signup forms.
 * Extends AbstractModal for base modal functionality.
 */
export default class AuthsModal extends AbstractModal {
    /**
     * Initialize authentication modal with required handlers
     * @constructor
     */
    constructor() {
        super({ 
            modal: 'auth-modal', 
            toggledata: 'data-auth-toggle', 
            activeclass: 'auth-modal--active' 
        });
        this.authFormHandler = new AuthFormHandler();
        this.messageHandler = new MessageHandler(this.modal);
        this.htmlGenerator = new HTMLContentGenerator();
        this.init();
    }

    /**
     * Initialize modal content and bind event handlers
     * @async
     */
    async init() {
        this.modal.innerHTML = await this.htmlGenerator.getContent();
        this.bindButtons();
        this.bindChangeActive();
        this.authFormHandler.bindAuths(this.modal);
    }

    /**
     * Binds event listeners for form switching and message handling
     * Uses event delegation for efficient event handling
     */
    bindChangeActive() {
        // Handle form switching
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[data-change-auth-active]`)) {
                e.preventDefault();
                const authActiveValue = e.target.getAttribute('data-change-auth-active');
                this.changeActive(authActiveValue);
            }
        });

        // Handle message hiding
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[data-message-hide]`)) {
                e.preventDefault();
                this.messageHandler.hide();
            }
        });
    }

    /**
     * Switches active form between login and signup
     * Manages CSS classes for smooth transitions
     * @param {string} active - Form to activate ('login' or 'signup')
     */
    changeActive(active) {
        // Remove active state from both forms
        document.getElementById('login-contents')
            .classList.remove('auth-modal__content--active');
        document.getElementById('signup-contents')
            .classList.remove('auth-modal__content--active');

        // Add active state to the specified form
        document.getElementById(`${active}-contents`)
            .classList.add('auth-modal__content--active');
    }

    /**
     * Custom open method with loading animation
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
     * Custom close method with cleanup
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
