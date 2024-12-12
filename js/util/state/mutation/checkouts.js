import states from "../state.js";
import getter from "../getters.js";

const state = states.data;
const getters = getter.functions;

/**
 * The checkout module handles all checkout operations, including updating cart items,
 * managing the checkout process for multiple items from the cart, and single item checkouts
 * from the product page. It also manages the state of checkboxes for cart items.
 */
const checkout = {
    functions: {
        /**
         * Updates the quantity of a specific item in the user's cart.
         * 
         * @param {number} id - The ID of the item to update.
         * @param {number} quantity - The new quantity for the item.
         * @returns {Object} - An object indicating success or failure of the operation.
         */
        updateCartItem: (id, quantity) => {
            const item = state.user.cart.find(item => item.id === id);
            if (!item) return { success: false, message: "Item not found in cart" };

            if (quantity < 1) {
                return;
            }

            const product = state.products.find(p => p.id === id);
            if (!product) return { success: false, message: "Product not found" };
            if (quantity > product.stock) {
                return { success: false, message: "Exceeds available stock" };
            }

            item.quantity = quantity;

            const userCopy = {
                ...state.user,
                cart: state.user.cart.map(cartItem => ({
                    ...cartItem,
                    checked: false
                }))
            };

            sessionStorage.setItem("user", JSON.stringify(userCopy));

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const updatedUsers = users.map(user => {
                if (user.email === state.user.email) {
                    return { ...user, cart: userCopy.cart };
                }
                return user;
            });

            localStorage.setItem("users", JSON.stringify(updatedUsers));

            return { success: true };
        },

        /**
         * Sets the checked state of a specific cart item.
         * 
         * @param {number} id - The ID of the item to check or uncheck.
         * @param {boolean} checked - The new checked state for the item.
         * @returns {Object} - The updated cart item.
         */
        setChecked(id, checked) {
            const cartItem = state.user.cart.find(item => item.id == id);
            cartItem["checked"] = checked;
            return cartItem;
        },

        /**
         * Handles the checkout process for multiple items selected in the cart.
         * 
         * @returns {Object} - An object indicating success or failure of the multi-checkout operation.
         */
        multiCheckout() {
            try {
                const checkouts = getters.getCartChecked();

                if (!checkouts || checkouts.length === 0) {
                    return { success: false, message: "No items to checkout." };
                }

                for (const item of checkouts) {
                    const product = state.products.find(p => p.id === item.id);

                    // Check if the product exists
                    if (!product) {
                        return { success: false, message: `Product with ID ${item.id} not found.` };
                    }

                    if (product.stock < (item.quantity || 1)) {
                        return {
                            success: false,
                            message: `Insufficient stock for product: ${product.name}. Available stock: ${product.stock}.`
                        };
                    }

                    product.stock -= (item.quantity || 1);
                    product.sold = parseInt(product.sold.replace(/,/g, ""), 10) || 0;
                    product.sold += parseInt(item.quantity || 1, 10);
                    product.sold = product.sold.toLocaleString();

                    state.user.checkouts.push({ id: item.id, quantity: item.quantity || 1 });

                    this.removeFromCart(item.id);
                }

                const userCopy = {
                    ...state.user,
                    checkouts: state.user.checkouts
                };

                sessionStorage.setItem("user", JSON.stringify(userCopy));

                const users = JSON.parse(localStorage.getItem("users")) || [];
                const updatedUsers = users.map(user => {
                    if (user.email === state.user.email) {
                        return { ...user, checkouts: userCopy.checkouts };
                    }
                    return user;
                });

                localStorage.setItem("users", JSON.stringify(updatedUsers));
                localStorage.setItem("products", JSON.stringify(state.products));
                return { success: true, message: "CHECKOUT SUCCESS" };
            } catch (error) {
                return { success: false, message: "Error during checkout" };
            }
        },

        /**
         * Handles the checkout process for a single item from the product page.
         * 
         * @param {number} id - The ID of the product to checkout.
         * @returns {Object} - An object indicating success or failure of the single checkout operation.
         */
        singleCheckout(id) {
            try {
                const product = state.products.find(p => p.id === id);
                if (!product) return { success: false, message: "Product not found" };

                if (product.stock < 1) {
                    return { success: false, message: "Product is out of stock" };
                }

                product.stock -= 1;
                product.sold = parseInt(product.sold.replace(/,/g, ""), 10) || 0;
                product.sold += 1;
                product.sold = product.sold.toLocaleString();
                localStorage.setItem("products", JSON.stringify(state.products));

                state.user.checkouts.push({ id, quantity: 1 });

                const userCopy = {
                    ...state.user,
                    checkouts: state.user.checkouts
                };

                sessionStorage.setItem("user", JSON.stringify(userCopy));

                const users = JSON.parse(localStorage.getItem("users")) || [];
                const updatedUsers = users.map(user => {
                    if (user.email === state.user.email) {
                        return { ...user, checkouts: userCopy.checkouts };
                    }
                    return user;
                });

                localStorage.setItem("users", JSON.stringify(updatedUsers));

                return { success: true, message: "CHECKOUT SUCCESS" };
            } catch (error) {
                console.error("Error during single checkout:", error);
                return { success: false, message: "An error occurred during single checkout." };
            }
        }
    }
}

export default checkout;