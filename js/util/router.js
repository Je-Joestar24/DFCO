/**
 * Router Class
 * Handles client-side routing and view management for single page application.
 * Manages navigation between different views without full page reloads.
 */
import Home from '../views/home.js';

export class Router {


    constructor() {
        // Define available routes and their corresponding views
        
        this.routes =[
            { path: '/', view: Home },
            { path: '/products', view: () => console.log('Viewing Products') },
            { path: '/about', view: () => console.log('Viewing About') },
        ];
    }

    /**
     * Navigates to a new URL and updates the view
     * Uses HTML5 History API to update URL without page refresh
     * 
     * @param {string} url - The URL to navigate to
     * @example
     * router.navigateTo('/products');
     */
    navigateTo(url) {
        history.pushState(null, null, url);
        this.route();
    }

    /**
     * Routes to the appropriate view based on current URL.
     * Matches URL pathname against defined routes and renders corresponding view.
     * If no match is found, defaults to home view.
     * 
     * @async
     * @returns {Promise<void>}
     * @example
     * await router.route();
     */
    async route() {
        // Find potential route matches by comparing current pathname
        const potentialMatches = this.routes.map(route => {
            return {
                route: route,
                isMatch: location.pathname === route.path,
            }
        });

        // Get first matching route or default to home route if no match
        let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

        if (!match) {
            match = {
                route: this.routes[0], // Default to home route
                isMatch: true,
            };
        }

        // Initialize view instance and render its HTML content
        const view = new match.route.view();
        document.querySelector('#app__display').innerHTML = await view.getHtml();
    };
}
