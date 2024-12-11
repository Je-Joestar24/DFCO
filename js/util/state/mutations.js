import states from "./state.js";

import user from "./mutation/user.js";
import carts from "./mutation/cart.js";
import checkout from "./mutation/checkouts.js";


const state = states.data;

const mutation = {
    functions: {
        ...user.functions,
        ...carts.functions,
        setDisplay(display) {
            state.productPage.display = display;
        },
        ...checkout.functions
    }
}

export default mutation;