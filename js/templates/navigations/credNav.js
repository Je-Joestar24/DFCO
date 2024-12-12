import { state } from "../../util/state.js";

export default class {
    /**
     * Generates the HTML for the user and cart icon
     * @returns {Promise<string>} Cred type html
     */
    async getHtml() {
        return `
      <li class="nav__item nav__icons">
        <a href="#/cart" class="nav__icon-wrapper" aria-label="Shopping Cart" data-link
        >
          <svg class="nav__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
            />
          </svg>
          <span id="nav__cart-badge" class="nav__cart-badge">3</span>
        </a>
        <div
          class="nav__icon-wrapper nav__profile"
          aria-label="User Profile"
        >
          <svg class="nav__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
            />
          </svg>
          ${await this.getProfileDropDown()}
          
        </div>
      </li>
    `;
    }

    /**
     * Generates the HTML for the user Profile dropdown menu
     * Shows different options based on authentication state
     * @returns {Promise<string>} Profile dropdown HTML
     */
    async getProfileDropDown() {
        return `
            <div class="nav__dropdown" aria-label="User Menu">
                ${state.user.isLoggedIn ? `
                <!-- Logged in state -->
                <div class="nav__dropdown-content nav__dropdown-logged-in">
                    <a href="#/profile" class="nav__dropdown-item" data-link>Profile</a>
                    <a href="#/logout" class="nav__dropdown-item" data-logout>Logout</a>
                </div>
                `:
                `
                <!-- Not logged in state -->
                <div class="nav__dropdown-content nav__dropdown-logged-out">
                    <button class="nav__dropdown-item" data-auth-toggle data-change-auth-active="login">Login</button>
                    <button  class="nav__dropdown-item nav__dropdown-signup" data-auth-toggle data-change-auth-active="signup">Sign Up</button>
                </div>
                `}
            </div>
        `;
    }
    F
}