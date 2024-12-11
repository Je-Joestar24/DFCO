import user from "./states/user.js";
import products from "./states/products.js";
import cart from "./states/cart.js";

const states = {
    data: {
        user: user.data,
        productPage: products.data,
        cart: cart.data,
        users: JSON.parse(localStorage.getItem("users")) || [],
        products: JSON.parse(localStorage.getItem("products")) || []
    }
};

export default states;
