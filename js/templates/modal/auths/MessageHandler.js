/**
 * MessageHandler Class
 * Manages authentication message display and hiding
 */
export default class {
    /**
     * Initialize with modal reference
     * @constructor
     * @param {HTMLElement} modal - The modal container element
     */
    constructor(modal) {
        this.modal = modal;
    }

    /**
     * Hides the current message and resets its state
     * Removes all status classes and hides the element
     */
    hide() {
        const message = this.modal.querySelector("#auth-modal__signup-message");
        message.classList.remove("error", "success");
        message.style.display = "none";
    }
}
