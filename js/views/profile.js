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
        <a href="#/profile/account-settings" class="profile__info-settings" data-link>
            <svg class="profile__info-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 8a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2m-2 12c-.25 0-.46-.18-.5-.42l-.37-2.65c-.63-.25-1.17-.59-1.69-.99l-2.49 1.01c-.22.08-.49 0-.61-.22l-2-3.46a.493.493 0 0 1 .12-.64l2.11-1.66L4.5 12l.07-1-2.11-1.63a.493.493 0 0 1-.12-.64l2-3.46c.12-.22.39-.31.61-.22l2.49 1c.52-.39 1.06-.73 1.69-.98l.37-2.65c.04-.24.25-.42.5-.42h4c.25 0 .46.18.5.42l.37 2.65c.63.25 1.17.59 1.69.98l2.49-1c.22-.09.49 0 .61.22l2 3.46c.13.22.07.49-.12.64L19.43 11l.07 1-.07 1 2.11 1.63c.19.15.25.42.12.64l-2 3.46c-.12.22-.39.31-.61.22l-2.49-1c-.52.39-1.06.73-1.69.98l-.37 2.65c-.04.24-.25.42-.5.42h-4z"/>
            </svg>
            Account Settings
        </a>
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