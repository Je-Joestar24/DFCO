import states from "./state.js";

import user from "./mutation/user.js";
import carts from "./mutation/cart.js";
import checkout from "./mutation/checkouts.js";

// Accessing the main application state
const state = states.data;

// The mutation module handles synchronous state updates for the application.
// It imports necessary modules for user, cart, and checkout mutations.

const mutation = {
    functions: {
        ...user.functions, // Spreading user mutation functions
        ...carts.functions, // Spreading cart mutation functions
        
        /**
         * Updates the display property of the product page state.
         * 
         * @param {string} display - The new display value to set for the product page.
         */
        setDisplay(display) {
            state.productPage.display = display; // Setting the display value
        },
        
        ...checkout.functions // Spreading checkout mutation functions
    }
}

export default mutation;