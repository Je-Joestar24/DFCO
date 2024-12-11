import { actions } from "../../../util/state.js";

/**
 * FormHandler Class
 * Manages authentication form submissions and validation
 */
export default class {
    /**
     * Binds authentication form submit events
     * @param {HTMLElement} modal - The modal container element
     */
    bindAuths(modal) {
        document.body.addEventListener('submit', async (e) => {
            if (e.target.matches(`[data-signup-form]`)) {
                e.preventDefault();
                this.signupNow(modal);
            }
            if (e.target.matches(`[data-login-form]`)) {
                e.preventDefault();
                this.loginNow(modal);
            }
        });
    }

    /**
     * Handles signup form submission
     * Validates input and creates new user account
     * @async
     * @param {HTMLElement} modal - The modal container element
     */
    async signupNow(modal) {
        const email = modal.querySelector("#auth-signup__email").value.trim();
        const password = modal.querySelector("#auth-signup__pass").value;
        const cpass = modal.querySelector("#auth-signup__pass-confirm").value;
        const message = modal.querySelector("#auth-modal__signup-message");

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.displayMessage(message, "error", "INVALID EMAIL ADDRESS");
            return;
        }

        // Password confirmation
        if (password !== cpass) {
            this.displayMessage(message, "error", "PASSWORD DOESN'T MATCH");
            return;
        }

        // Create account and login
        this.displayMessage(message, "success", "SIGNUP SUCCESS");
        await actions.signup({ email, password });
        await this.login(email, password, modal);
    }

    /**
     * Handles login form submission
     * @async
     * @param {HTMLElement} modal - The modal container element
     */
    async loginNow(modal) {
        const email = modal.querySelector("#auth-login__email").value.trim();
        const password = modal.querySelector("#auth-login__pass").value;
        await this.login(email, password, modal);
    }

    /**
     * Performs login operation and handles response
     * @async
     * @param {string} email - User email
     * @param {string} password - User password
     * @param {HTMLElement} modal - The modal container element
     */
    async login(email, password, modal) {
        const res = await actions.login({ email, password });
        if (res.success) {
            window.location.href = window.location.origin + "#/products";
            await actions.displayMessage("LOGGING IN...", 500);
            setTimeout(() => location.reload(), 500);
        } else {
            actions.displayMessage("LOGIN FAILED, NO MATCH FOUND!");
        }
    }

    /**
     * Displays status messages to user
     * @param {HTMLElement} element - Message container element
     * @param {string} type - Message type ('error' or 'success')
     * @param {string} text - Message content
     */
    displayMessage(element, type, text) {
        element.classList.remove("error", "success");
        element.classList.add(type);
        element.innerHTML = text;
        element.style.display = "block";
    }
}
