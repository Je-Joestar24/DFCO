/**
 * AbstractModal class to manage modal basic behavior.
 * This class handles the basic opening and closing of a modal,
 * as well as basic binding event listeners for user interactions.
 */
export default class AbstractModal {
    /**
     * Creates an instance of AbstractModal.
     * @param {Object} config - Configuration object for the modal.
     * @param {string} config.modal - The ID of the modal element.
     * @param {string} config.toggledata - The attribute used to toggle the modal.
     * @param {string} config.activeclass - The class that indicates the modal is active.
     */
    constructor(config = { modal, toggledata, activeclass }) {
        const { modal, toggledata, activeclass } = config;
        this.toggleAttr = toggledata;
        this.activeclass = activeclass;
        this.modal = document.getElementById(modal);
    }

    /**
     * Binds click and keydown events to handle modal toggling.
     * Clicks on elements with the toggle attribute will open/close the modal.
     * The Escape key will close the modal if it is open.
     */
    bindButtons() {
        document.body.addEventListener('click', (e) => {
            if (e.target.matches(`[${this.toggleAttr}]`)) {
                e.preventDefault();
                this.toggle();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' || event.key === 'Esc') { 
                this.close();
            }
        });
    }

    /**
     * Toggles the modal's visibility.
     * If the modal is currently active, it will be closed.
     * Otherwise, it will be opened.
     */
    toggle() {
        if (this.modal.classList.contains(this.activeclass)) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Closes the modal.
     */
    close() {
        this.modal.classList.remove(this.activeclass);
        document.body.classList.remove("no-scroll");
    }

    /**
     * Opens the modal.
     */
    open() {
        this.modal.classList.add(this.activeclass);
        document.body.classList.add("no-scroll");
    }
}