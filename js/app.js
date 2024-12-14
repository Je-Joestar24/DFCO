import { Router } from './util/router.js';
import Main from './templates/main.js';

// Add event listener for data-link clicks
document.addEventListener('DOMContentLoaded', async () => {
    new Main();
    const router = new Router('#app__display');

    // Add event listeners for navigation and page reload
    window.addEventListener('popstate', () => router.route());
    window.addEventListener('load', () => router.route());

    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            router.navigateTo(e.target.href);
        }
    });
    // Initial route
    router.route();
});
