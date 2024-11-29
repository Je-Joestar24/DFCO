/**
 * Abstract View Class
 * Base class for all views in the application
 * Provides common functionality for setting page title and rendering HTML
 */
export default class {
    constructor() {
        // Initialize any common view properties
        this.isInitialized = false;
    }

    /**
     * Sets the document title for the current view
     * @param {string} title - The title to set for the page
     */
    setTitle(title) {
        document.title = title;
    }

    /**
     * Renders the HTML content for the view
     * Must be implemented by child classes
     * @returns {Promise<string>} The HTML content as a string
     */
    async getHtml() {
        return '';
    }

    /**
     * Lifecycle method called after view is mounted
     * Can be overridden by child classes
     */
    async afterMount() {
        this.isInitialized = true;
    }
}