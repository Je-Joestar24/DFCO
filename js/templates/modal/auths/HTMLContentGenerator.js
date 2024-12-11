export default class {
    
    /**
     * Generate the main modal content HTML
     * Includes loader animation, backdrop, and both form containers
     * @returns {Promise<string>} Modal content HTML
     */
    async getContent() {
        return `
        <div class="auth-modal__loader" role="status" aria-label="Loading" data-auth-toggle>
        <div class="auth-modal__ball auth-modal__ball--1"></div>
        <div class="auth-modal__ball auth-modal__ball--2"></div>
        <div class="auth-modal__ball auth-modal__ball--3"></div>
        </div>
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

}
