/**
 * This is the state for the cart page.
 * - isBound: Indicates if the bindAll function has already been executed to prevent multiple binding errors.
 * - remove: The index of the item to be removed from the cart, defaulting to -1 (no item selected).
 */
const cart = {
    data: {
        isBound: false,
        remove: -1
    }
}

export default cart;