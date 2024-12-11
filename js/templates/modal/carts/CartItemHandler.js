import { actions, mutations } from "../../../util/state.js";
import Cart from "../../../views/cart.js";

export default class {
    constructor() {
        this.helper = new Cart();
    }

    async deleteItem(itemId, modal) {
        const deleted = await mutations.removeFromCart(itemId);
        if (deleted) {
            this.helper.fullRerender(); // Refresh cart UI
            modal.toggle(); // Close modal
            modal.id = -1;
            await actions.setNotificationMark(); // Notify user of the update
        }
    }
}
