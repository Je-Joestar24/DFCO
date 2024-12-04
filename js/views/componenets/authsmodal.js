import AbstractModal from "./AbstractModal.js";

export default class extends AbstractModal {
    constructor() {
        super({ modal: 'auth-modal', toggledata: 'data-auth-toggle', activeclass: 'auth-modal--active' });
        this.init();
    }

    async init(){
        this.modal.innerHTML = await this.getContent()
        await this.bindButtons();
    }

    async getContent(){
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

    async getSignupForm(){
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

            <form
            id="signup-form"
            name="signup-form"
            class="auth-modal__signup-form"
            aria-label="Sign up form"
            >
                <div class="auth-modal__field">
                    <input
                    type="text"
                    class="auth-modal__input"
                    placeholder="Username or Mobile Number"
                    required
                    aria-label="Username or Mobile Number"
                    aria-required="true"
                    />
                </div>

                <div class="auth-modal__field">
                    <div class="auth-modal__password">
                    <input
                        type="password"
                        class="auth-modal__input"
                        placeholder="Password"
                        required
                        aria-label="Password"
                        aria-required="true"
                    />
                    <button
                        type="button"
                        class="auth-modal__show-password"
                        aria-label="Show password"
                    >
                        Show
                    </button>
                    </div>
                </div>

                <button type="submit" class="auth-modal__signup-submit">
                    Sign Up
                </button>
            </form>

            <div class="auth-modal__login-link">
                Already have an account?
                <a href="#" class="auth-modal__link" aria-label="Switch to login">Login</a>
            </div>
        </div>
        `;
    }

    async getLoginForm(){
        return `
        <div
        id="login-contents"
        class="auth-modal__login auth-modal__content--active"
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
            >
            <div class="auth-modal__field">
                <input
                type="text"
                class="auth-modal__input"
                placeholder="Username or Mobile Number"
                required
                aria-label="Username or Mobile Number"
                aria-required="true"
                />
            </div>

            <div class="auth-modal__field">
                <div class="auth-modal__password">
                <input
                    type="password"
                    class="auth-modal__input"
                    placeholder="Password"
                    required
                    aria-label="Password"
                    aria-required="true"
                />
                <button
                    type="button"
                    class="auth-modal__show-password"
                    aria-label="Show password"
                >
                    Show
                </button>
                </div>
            </div>

            <button type="submit" class="auth-modal__login-submit">Login</button>
            </form>

            <div class="auth-modal__signup-link">
            Don't have an account?
            <a href="#" class="auth-modal__link" aria-label="Switch to signup">
                Sign Up
            </a>
            </div>
        </div>
        `;
    }

    changeActive(){

    }

    open() {
        this.modal.classList.add(this.activeclass);
        document.body.classList.add("no-scroll");
        setTimeout(() => {
            this.modal.classList.remove("auth-modal--loading");
        }, 100);
    }

    close() {
        this.modal.classList.remove(this.activeclass);
        document.body.classList.remove("no-scroll");

        setTimeout(() => {
            this.modal.classList.add("auth-modal--loading");
        }, 300);
    }
}