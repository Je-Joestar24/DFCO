import AbstractView from "./AbstractView.js";
import { state } from "../util/state.js";

import Header from "./profile/header.js";
import Actions from "./profile/actions.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('DFCO | Profile');
        this.header = new Header();
        this.actions = new Actions();
    }

    /**
     * Generates the HTML for the profile page.
     * @returns {Promise<string>} The HTML string for the profile section.
     */
    async getHtml() {
        return `
         <section class="profile" role="region" aria-label="User Profile">
          <div id="app-profile" class="profile__container">
            <!-- Profile Header -->
            <div id="app-profile-header" class="profile__header">
                ${await this.header.getHtml()}
            </div>

            <!-- Profile Actions -->
            <div id="app-profile-checkout" class="profile__actions">
                ${await this.actions.getHtml()}
            </div>
          </div>
        </section>
        `;
    }

}