import { Router } from './util/router.js';
import { actions } from './util/state.js';
import AuthModal from './views/componenets/authsmodal.js';

const router = new Router('#app__display');

// Add event listeners for navigation and page reload
window.addEventListener('popstate', () => router.route());
window.addEventListener('load', () => router.route());

// Add event listener for data-link clicks
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            router.navigateTo(e.target.href);
        }
    });

    new AuthModal();
    // Initial route
    router.route();
});
