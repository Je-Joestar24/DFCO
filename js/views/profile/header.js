import { state } from "../../util/state.js";

export default class {

    /**
     * Retrieves the user's profile header information.
     * @returns {Promise<string>} The HTML string for the profile header.
     */
    async getHtml() {
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

}