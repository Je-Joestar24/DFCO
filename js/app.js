import { Router } from './util/router.js';

const router = new Router();
// Add event listeners for navigation
window.addEventListener('popstate', router.route);

// Add event listener for data-link clicks
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            router.navigateTo(e.target.href);
        }
    });

    // Initial route
    router.route();
});
