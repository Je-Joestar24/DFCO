import getter from "./getters.js";
import states from "./state.js";
import user from "./mutation/user.js";
import carts from "./mutation/cart.js";
import checkout from "./mutation/checkouts.js";

const users = user.functions;
const cart = carts.functions;
const checkouts = checkout.functions;

const state = states.data;
const getters = getter.functions;

const mutation = {
    function: {
        ...users,
        ...cart,
        setDisplay(display) {
            state.productPage.display = display;
        },
        ...checkouts
    }
}

export default mutation;