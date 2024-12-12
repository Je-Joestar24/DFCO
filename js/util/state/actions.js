import getter from "./getters.js";
import states from "./state.js";
import mutation from "./mutations.js";

import user from "./actions/users.js";
import product from "./actions/products.js";
import display from "./actions/displays.js";

// The action module handles asynchronous operations and state restoration for the application.
// It imports necessary modules for state management, including getters, mutations, and specific actions.

const state = states.data; // Accessing the main application state
const getters = getter.functions; // Accessing getter functions for state retrieval
const mutations = mutation.functions; // Accessing mutation functions for state updates

const action = {
    // Corrected the typo from 'funciton' to 'functions'
    functions: {
        /**
         * Restores the user state from local storage.
         * If a saved user exists, it parses the JSON string and updates the state.
         */
        restoreState: () => {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                state.user = JSON.parse(savedUser);
            }
        },
        ...user.functions, // Spreading user action functions
        ...product.functions, // Spreading product action functions
        ...display.functions // Spreading display action functions
    }
};

export default action; 