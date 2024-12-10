import AbstractView from "./AbstractView.js";
import { state } from "../util/state.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('DFCO | Profile');
    }

    async getHtml() {
        return `
         <section class="profile" role="region" aria-label="User Profile">
          <div id="app-profile" class="profile__container">
            <!-- Profile Header -->
            <div id="app-profile-header" class="profile__header">
                ${await this.getProfileHeader()}
            </div>

            <!-- Profile Actions -->
            <div id="app-profile-checkout" class="profile__actions">
                ${await this.getProfileAction()}
            </div>
          </div>
        </section>
        `;
    }

    async getProfileHeader(){
        const userName = state.user.name || state.user.email.split('@')[0];
        const userEmail = state.user.email;

        return `
        <div class="profile__avatar" role="img" aria-label="Default user avatar">
        <svg class="profile__avatar-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"/>
        </svg>
        </div>
        <div class="profile__info">
        <h1 class="profile__info-name">${userName}</h1>
        <p class="profile__info-email">${userEmail}</p>
        </div>
        `;
    }

    async getProfileAction(){
        return `
        <a href="#/profile/checkouts" class="profile__action-link" data-link>
            <div class="profile__action-item">
                <svg class="profile__action-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2m-9-1a2 2 0 0 1 4 0v1h-4V6m10 14H4V8h16v12z"/>
                </svg>
                <span class="profile__action-text">My Checkouts</span>
            </div>
        </a>
        `;
    }

}