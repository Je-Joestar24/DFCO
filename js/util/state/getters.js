import states from "./state.js";
import Helper from "./helper.js";

const state = states.data;
const helper = new Helper();

/**
 * The getter module provides access to various state properties and computed values
 * related to the user, cart, and checkouts.
 */
const getter = {
    functions: {
        /**
         * Retrieves the current user state.
         * 
         * @returns {Object} The current user object.
         */
        getUser: () => {
            return state.user;
        },

        /**
         * Retrieves the current user's cart items, including product details and quantities.
         * 
         * @returns {Array} An array of cart items with product details.
         */
        getCart: () => {
            const cartItems = state.user.cart;
            if (cartItems.length > 0) {
                return cartItems.map(item => {
                    const product = state.products.find(product => product.id === item.id);
                    if (product) {
                        return {
                            ...product,
                            quantity: item.quantity,
                            checked: item.checked || false // Default checked property to false
                        };
                    }
                    return null;
                }).filter(item => item !== null);
            }
            return [];
        },

        /**
         * Retrieves the user's checkout history with product details and total prices.
         * 
         * @returns {Array} An array of checkout items with product details and total prices.
         */
        getCheckouts: () => {
            const checkouts = JSON.parse(JSON.stringify(state.user.checkouts));
            if (checkouts.length > 0) {
                const res = checkouts.map(checkout => {
                    const product = state.products.find(product => product.id === checkout.id);
                    if (product) {
                        const price = parseFloat(product.price.replace('₿', '').replace(/,/g, '')) || 0;
                        return {
                            ...product,
                            quantity: checkout.quantity,
                            total: helper.formatPrice(price * checkout.quantity)
                        };
                    }
                    return null;
                }).filter(item => item !== null);
                res.reverse();
                return res;
            }
            return [];
        },

        /**
         * Calculates the total count of items in the user's cart.
         * 
         * @returns {string} The total count of items in the cart, or "0" if empty.
         */
        getCartCount: () => {
            if (!state.user.isLoggedIn || !state.user.cart || state.user.cart.length === 0) {
                return "0";
            }
            const totalCount = state.user.cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
            return totalCount > 99 ? "99+" : totalCount.toString();
        },

        /**
         * Calculates the total price of items in the cart.
         * 
         * @returns {number} The total price of items in the cart.
         */
        getTotalPrice: () => {
            return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },

        /**
         * Retrieves the currently active navigation state.
         * 
         * @returns {string} The ID of the active navigation item.
         */
        getActiveNav: () => {
            return state.navigations.active;
        },

        /**
         * Retrieves the current display state for the product page.
         * 
         * @returns {Promise<Object>} The current display state.
         */
        getDisplay: async () => {
            return state.productPage.display;
        },

        /**
         * Summarizes the cart items, including total item count and total price.
         * 
         * @returns {Object} An object containing itemCount and total price.
         */
        getCartSummary: () => {
            const cartItems = getter.functions.getCart();
            if (!cartItems || cartItems.length === 0) {
                return {
                    itemCount: 0,
                    total: helper.formatPrice(0)
                };
            }

            // Only include checked items in calculations
            const checkedItems = cartItems.filter(item => item.checked === true);
            const total = checkedItems.reduce((total, item) => {
                let price = 0;
                if (item.price) {
                    price = parseFloat(item.price.replace('₿', '').replace(/,/g, '')) || 0;
                }
                return total + (price * (item.quantity || 1));
            }, 0);

            return {
                itemCount: checkedItems.reduce((count, item) => count + (item.quantity || 1), 0),
                total: helper.formatPrice(total)
            };
        },

        /**
         * Retrieves the IDs and quantities of checked items in the cart.
         * 
         * @returns {Array} An array of objects containing id and quantity of checked items.
         */
        getCartChecked: () => {
            const cartItems = getter.functions.getCart();
            if (!cartItems || cartItems.length === 0) {
                return [];
            }

            // Filter and return IDs of checked items
            const checkedItems = cartItems.filter(item => item.checked === true);
            return checkedItems.map(item => ({ id: item.id, quantity: item.quantity }));
        },
    }
}

export default getter;