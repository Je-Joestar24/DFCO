

import states from "./state/state.js";// The whole state
import getter from "./state/getters.js";
import mutation from "./state/mutations.js";
import action from "./state/actions.js";


const state = states.data;

// Getters: Retrieve state data
const getters = getter.functions;

// Mutations: Synchronous functions to modify the state
const mutations = mutation.functions;

// Actions: Asynchronous or complex operations
const actions = action.funciton;

// Initialize State on Load
actions.restoreState();

export { state, getters, mutations, actions };
