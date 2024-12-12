import states from "../state.js"

const state = states.data;

const carts = {
    functions: {
        /**
         * Handles adding a product to the cart.
         * This function checks for the product's existence, 
         * ensures the quantity does not exceed available stock, 
         * and updates the user's cart accordingly.
         * 
         * @param {number} id - The ID of the product to add to the cart.
         * @returns {void}
         */
        addToCart: (id) => {
            // Find the product in state.products
            const product = state.products.find(p => p.id === id);
            if (!product) return; // Product not found

            const item = state.user.cart.find((item) => item.id === id);

            // Check if adding would exceed the product limit
            if (item && item.quantity >= product.stock) {
                return; // Already at limit
            }

            if (item) {
                item.quantity++;
            } else {
                state.user.cart.push({ id, quantity: 1, checked: false }); // Added checked field defaulting to false
            }

            sessionStorage.setItem("user", JSON.stringify(state.user));

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const updatedUsers = users.map((existingUser) => {
                if (existingUser.email === state.user.email) {
                    return { ...existingUser, cart: state.user.cart };
                }
                return existingUser;
            });

            localStorage.setItem("users", JSON.stringify(updatedUsers));
            state.users = updatedUsers; // Update state.users with the new user data
        },

        /**
         * Handles removing a product from the cart.
         * This function filters out the specified product from the user's cart
         * and updates the session and local storage accordingly.
         * 
         * @param {number} id - The ID of the product to remove from the cart.
         * @returns {boolean} - Returns true if the product was successfully removed.
         */
        removeFromCart: (id) => {
            state.user.cart = state.user.cart.filter(item => Number(item.id) !== Number(id));
            sessionStorage.setItem("user", JSON.stringify(state.user));

            // Update localStorage
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const updatedUsers = users.map(user => {
                if (user.email === state.user.email) {
                    return { ...user, cart: state.user.cart };
                }
                return user;
            });

            localStorage.setItem("users", JSON.stringify(updatedUsers));
            return true;
        },
    }
}

export default carts;