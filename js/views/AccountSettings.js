import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle("DFCO | Account");
    }

    async getHtml() {
        return `
        <section
          id="account-page"
          class="app__display-account"
          aria-label="Account Settings"
        >
          <div class="account__contents">
            <header class="account__header">
              <h2>Account Settings</h2>
              <p>Manage your personal information and preferences</p>
            </header>

            <!-- Main container for both forms -->
            <div class="account__forms">
              <!-- Personal Information Section -->
              ${await this.getPersonalForm()}

              <!-- Account Information Section -->
              ${await this.getAccountForm()}
            </div>
          </div>
        </section>
        `;
    }

    async getPersonalForm(){
      return `
      <form
        class="account__section account__form"
        aria-label="Personal Information"
      >
        <h3>Personal Information</h3>
        <div class="form__group">
          <label for="personal-info-fullname">Full Name</label>
          <div class="input-container fullname">
            <input
              type="text"
              id="personal-info-fullname"
              name="fullname"
              aria-label="Enter your full name"
            />
          </div>
        </div>
        <div class="form__group">
          <label for="personal-info-mobile">Mobile Number</label>
          <div class="input-container mobile">
            <input
              type="tel"
              id="personal-info-mobile"
              name="mobile"
              aria-label="Enter your mobile number"
            />
          </div>
        </div>
        <button
          type="submit"
          class="save-btn personal-info-save"
          aria-label="Save personal information"
        >
          Save Changes
        </button>
      </form>
      `;
    }

    async getAccountForm(){
      return `
      <form
        class="account__section account__form"
        aria-label="Account Information"
      >
        <h3>Account Information</h3>
        <div class="form__group">
          <label for="account-info-email">Email Address</label>
          <div class="input-container email">
            <input
              type="email"
              id="account-info-email"
              name="email"
              aria-label="Enter your email address"
            />
          </div>
        </div>
        <div class="form__group">
          <label for="account-info-password">Password</label>
          <div class="input-container password">
            <input
              type="password"
              id="account-info-password"
              name="password"
              aria-label="Enter your password"
            />
          </div>
        </div>
        <button
          type="submit"
          class="save-btn account-info-save"
          aria-label="Save account information"
        >
          Save Changes
        </button>
      </form>
      `;
    }
}