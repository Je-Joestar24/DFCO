/**
 * This module manages the application state by importing state, getters, mutations, and actions.
 * It initializes the state on load and exports the state, getters, mutations, and actions for use in other modules.
 */

import states from "./state/state.js"; // The whole state
import getter from "./state/getters.js"; // Module for retrieving state data
import mutation from "./state/mutations.js"; // Module for synchronous state modifications
import action from "./state/actions.js"; // Module for asynchronous or complex operations

const state = states.data; // Accessing the main application state

// Getters: Retrieve state data
const getters = getter.functions;

// Mutations: Synchronous functions to modify the state
const mutations = mutation.functions;

// Actions: Asynchronous or complex operations
const actions = action.functions; // Corrected the typo from 'funciton' to 'functions'

// Initialize State on Load
actions.restoreState(); // Restores the user state from local storage

export { state, getters, mutations, actions }; // Exporting state management functions
