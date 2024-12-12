export default class {
    /**
     * Generates the profile action links for the user.
     * @returns {Promise<string>} The HTML string for the profile action links.
     */
    async getHtml() {
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