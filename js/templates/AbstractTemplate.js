/**
 * Abstract Template Class
 * Base class for all templates and components in the application
 * Provides common functionality for rendering reusable HTML components
 * Child classes must implement getHtml() method to define their specific markup
 * 
 * @abstract
 * @class
 */
export default class {
    /**
     * Creates an instance of the abstract template
     * No initialization needed in base class
     */
    constructor() {
    }

    /**
     * Renders the HTML content for the template/component
     * Must be implemented by child classes to define their specific markup
     * Uses async/await to support potential data fetching in child implementations
     * 
     * @abstract
     * @async
     * @returns {Promise<string>} The HTML content as a string
     * @throws {Error} Should throw error if not implemented by child class
     */
    async getHtml() {
        return '';
    }

}