import { actions, mutations } from "../../../util/state.js";

export default class {
    constructor() {
    }

    /**
     * Process checkout for single item or multiple cart items
     * Handles success/failure cases and displays appropriate messages
     */
    checkoutNow(modal) {
        try {
            if (modal.id === "multi") {
                // Handle the case when id is "multi"
                const response = mutations.multiCheckout();
                if (response.success) {
                    modal.toggle();
                }
                actions.displayMessage(response.message, 500);
                actions.setNotificationMark();
                setTimeout(() => {
                    window.location.href = window.location.origin + '#/profile/checkouts';
                    location.reload();
                }, 500);
            } else if (typeof modal.id == 'string') {
                const response = mutations.singleCheckout(parseInt(modal.id));
                if (response.success) {
                    modal.toggle();
                }
                actions.displayMessage(response.message, 500);
                actions.setNotificationMark();
                setTimeout(() => {
                    window.location.href = window.location.origin + '#/profile/checkouts';
                    location.reload();
                }, 500);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
}
