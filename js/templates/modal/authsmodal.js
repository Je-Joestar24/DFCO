/**
 * Authentication Modal Class
 * Handles user authentication UI and functionality including signup and login forms.
 * Provides form validation, error handling, and success/failure messaging.
 * Manages switching between login and signup views with smooth transitions.
 * @extends AbstractModal
 */
import AbstractModal from "./AbstractModal.js";
import { state, actions } from "../../util/state.js";

export default class extends AbstractModal {
    /**
     * Initialize the auth modal with required configuration
     * @param {Object} config - Modal configuration object
     * @param {string} config.modal - Modal element ID
     * @param {string} config.toggledata - Data attribute for toggling modal
     * @param {string} config.activeclass - Class name for active modal state
     */
    constructor() {
        super({ modal: 'auth-modal', toggledata: 'data-auth-toggle', activeclass: 'auth-modal--active' });
        this.init();
    }

    /**
     * Initialize the modal content and bind event handlers
     * Sets up initial HTML content and attaches all necessary event listeners
     */
    async init() {
        this.modal.innerHTML = await this.getContent()
        await this.bindButtons();
        await this.bindChangeActive();
        await this.bindAuths();
    }

    /**
     * Bind authentication form submission handlers
     * Handles form submissions for both signup and login forms
     * Prevents default form behavior and routes to appropriate handler
     */
    async bindAuths() {
        document.body.addEventListener('submit', async (e) => {
            if (e.target.matches(`[data-signup-form]`)) {
                e.preventDefault();
                this.signupNow();
            }
        });

        document.body.addEventListener('submit', async (e) => {
            if (e.target.matches(`[data-login-form]`)) {
                e.preventDefault();
                this.loginNow();
            }
        });

        document.body.addEventListener('click', async (e) => {
            if (e.target.matches(`[data-message-hide]`)) {
                e.preventDefault();
                this.hide();
            }
        });
    }

    /**
     * Hide any displayed messages and reset message styling
     * Removes success/error classes from message element
     */
    async hide(){
        const message = this.modal.querySelector("#auth-modal__signup-message");

        message.classList.remove("error");
        message.classList.remove("success");
    }

    /**
     * Handle signup form submission and validation
     * Validates email format and password match
     * Displays appropriate success/error messages
     * Attempts signup and auto-login on success
     */
    async signupNow() {
        const email = this.modal.querySelector("#auth-signup__email").value.trim();
        const password = this.modal.querySelector("#auth-signup__pass").value;
        const cpass = this.modal.querySelector("#auth-signup__pass-confirm").value;
        const message = this.modal.querySelector("#auth-modal__signup-message");

        await this.hide();
        // Reset the message display before validation
        message.style.display = "block";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            message.classList.add("error");
            message.innerHTML = "INVALID EMAIL ADDRESS";
            return;
        }

        if (password !== cpass) {
            message.classList.add("error");
            message.innerHTML = "PASSWORD DOESN'T MATCH";
            return;
        }

        message.classList.add("success");
        message.innerHTML = "SIGNUP SUCCESS";
        await actions.signup({ email, password });
        await this.login(email, password)
    }

    /**
     * Handle login form submission and redirect on success
     * Extracts form data and attempts login
     */
    async loginNow() {
        const email = await this.modal.querySelector("#auth-login__email").value;
        const password = await this.modal.querySelector("#auth-login__pass").value;
        await this.login(email, password);
    }

    /**
     * Process login attempt with provided credentials
     * Handles success/failure cases and redirects on success
     * @param {string} email - User's email address
     * @param {string} password - User's password
     */
    async login(email, password){
        const res = await actions.login({ email, password });
        if (res.success) {
            // Change the location safely and remove the hash
            window.location.href = window.location.origin + '#/products';
            await actions.displayMessage("LOGING IN...", 500);
            setTimeout(() => location.reload(), 500);
        }else{
            await actions.displayMessage("LOGIN FAILED, NO MATCH FOUND!", 500);
        }
    }

    /**
     * Generate the main modal content HTML
     * Includes loader animation, backdrop, and both form containers
     * @returns {Promise<string>} Modal content HTML
     */
    async getContent() {
        return `
        <div class="auth-modal__loader" role="status" aria-label="Loading">
        <div class="auth-modal__ball auth-modal__ball--1"></div>
        <div class="auth-modal__ball auth-modal__ball--2"></div>
        <div class="auth-modal__ball auth-modal__ball--3"></div>
        </div>
        <div
            class="auth-modal__backdrop"
            role="back drop"
            aria-hidden="true"
            data-auth-toggle
        ></div>
        ${await this.getSignupForm()}
        ${await this.getLoginForm()}
        `;
    }

    /**
     * Generate the signup form HTML
     * Creates a complete signup form with email and password fields
     * Includes validation and accessibility attributes
     * @returns {Promise<string>} Signup form HTML
     */
    async getSignupForm() {
        this.signup = { email: "", password: "" };
        return `
        <div
        id="signup-contents"
        class="auth-modal__signup"
        aria-label="Signup conents">
            <button
            class="auth-modal__close"
            aria-label="Close modal"
            data-auth-toggle >
                ×
            </button>

            <header class="auth-modal__signup-header">
                <h2 id="modal-title" class="auth-modal__signup-title">Sign Up</h2>
                <p class="auth-modal__signup-subtitle">Join the DFCO community</p>
            </header>
            <h3 id="auth-modal__signup-message" class="auth-modal__signup-message" data-message-hide>MESSAGE</h3>
            <form
            id="signup-form"
            name="signup-form"
            class="auth-modal__signup-form"
            aria-label="Sign up form"
            data-signup-form
            >
                <div class="auth-modal__field">
                    <input
                        id="auth-signup__email"
                        value=""
                        type="text"
                        class="auth-modal__input"
                        placeholder="Email Account"
                        required
                        aria-label="email"
                        aria-required="true"
                    />
                </div>

                <div class="auth-modal__field">
                    <div class="auth-modal__password">
                    <input
                        id="auth-signup__pass"
                        value=""
                        type="password"
                        class="auth-modal__input"
                        placeholder="Password"
                        required
                        aria-label="Password"
                        aria-required="true"
                    />
                    </div>
                </div>
                <div class="auth-modal__field">
                    <div class="auth-modal__password">
                    <input
                        type="password"
                        id="auth-signup__pass-confirm"
                        value=""
                        class="auth-modal__input"
                        placeholder="Confirm Password"
                        required
                        aria-label="Confirm Password"
                        aria-required="true"
                    />
                    </div>
                </div>
                <button type="submit" class="auth-modal__signup-submit">
                    Sign Up
                </button>
            </form>

            <div class="auth-modal__login-link">
                Already have an account?
                <a data-change-auth-active="login" href="#" class="auth-modal__link" aria-label="Switch to login">Login</a>
            </div>
        </div>
        `;
    }

    /**
     * Generate the login form HTML
     * Creates a complete login form with email and password fields
     * Includes validation and accessibility attributes
     * @returns {Promise<string>} Login form HTML
     */
    async getLoginForm() {
        return `
        <div
        id="login-contents"
        class="auth-modal__login"
        aria-label="Login conents">
            <button
            class="auth-modal__close"
            aria-label="Close modal"
            data-auth-toggle
            >
            ×
            </button>

            <div class="auth-modal__login-header">
            <h2 id="modal-title" class="auth-modal__login-title">Login</h2>
            <p class="auth-modal__login-subtitle">Welcome back to DFCO</p>
            </div>

            <form
            id="login-form"
            name="login-form"
            class="auth-modal__login-form"
            aria-label="Login form"
            data-login-form
            >
            <div class="auth-modal__field">
                <input
                type="text"
                id="auth-login__email"
                value=""
                class="auth-modal__input"
                placeholder="Email Account"
                required
                aria-label="Email Account"
                aria-required="true"
                />
            </div>

            <div class="auth-modal__field">
                <div class="auth-modal__password">
                <input
                    type="password"
                    id="auth-login__pass"
                    value=""
                    class="auth-modal__input"
                    placeholder="Password"
                    required
                    aria-label="Password"
                    aria-required="true"
                />
                </div>
            </div>

            <button type="submit" class="auth-modal__login-submit">Login</button>
            </form>

            <div class="auth-modal__signup-link">
            Don't have an account?
            <a href="#" data-change-auth-active="signup" class="auth-modal__link" aria-label="Switch to signup">
                Sign Up
            </a>
            </div>
        </div>
        `;
    }

    /**
     * Bind event handlers for switching between login/signup forms
     * Attaches click handlers to form switch triggers
     */
    bindChangeActive() {
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[data-change-auth-active]`)) {
                e.preventDefault();
                const authActiveValue = e.target.getAttribute('data-change-auth-active');
                this.changeActive(authActiveValue);
            }
        });
    }

    /**
     * Change active form between signup and login
     * Handles class toggling for smooth transitions
     * @param {string} active - Which form to activate ('signup' or 'login')
     */
    changeActive(active) {
        // Remove the active class from both login and signup contents
        document.getElementById('login-contents').classList.remove('auth-modal__content--active');
        document.getElementById('signup-contents').classList.remove('auth-modal__content--active');

        // Add the active class to the selected content
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