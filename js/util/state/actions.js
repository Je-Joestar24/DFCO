import getter from "./getters.js";
import states from "./state.js";
import mutation from "./mutations.js";

import user from "./actions/users.js";
import product from "./actions/products.js";
import display from "./actions/displays.js";


const state = states.data;
const getters = getter.functions;
const mutations = mutation.functions;

const action = {
    funciton: {
        restoreState: () => {
            const savedUser = localStorage.getItem("user");
            if (savedUser) state.user = JSON.parse(savedUser);
        },
        ...user.functions,
        ...product.functions,
        ...display.functions
    }
};

export default action;