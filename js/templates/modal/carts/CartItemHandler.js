import { actions, mutations } from "../../../util/state.js";
import Cart from "../../../views/cart.js";

/**
 * CartItemHandler Class
 * Handles cart item operations and updates
 */
export default class {
    /**
     * Initialize with cart helper
     * @constructor
     */
    constructor() {
        this.helper = new Cart();
    }

    /**
     * Delete an item from the cart
     * @async
     * @param {number} itemId - ID of the item to delete
     * @param {Object} modal - Modal instance for handling UI updates
     */
    async deleteItem(itemId, modal) {
        // Attempt to remove item from cart
        const deleted = await mutations.removeFromCart(itemId);
        
        if (deleted) {
            this.helper.fullRerender(); // Refresh cart UI
            modal.toggle(); // Close modal
            modal.id = -1; // Reset item ID
            await actions.setNotificationMark(); // Update cart notification
        }
    }
}
