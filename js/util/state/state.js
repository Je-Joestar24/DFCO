// Importing user, products, and cart state modules to manage application state
import user from "./states/user.js";
import products from "./states/products.js";
import cart from "./states/cart.js";

// Defining the main state object that holds all application state data
const states = {
    data: {
        // User state data
        user: user.data,
        // Product page state data
        productPage: products.data,
        // Cart state data
        cart: cart.data,
        // Users data retrieved from local storage, defaulting to an empty array if not found
        users: JSON.parse(localStorage.getItem("users")) || [],
        // Products data retrieved from local storage, defaulting to an empty array if not found
        products: JSON.parse(localStorage.getItem("products")) || []
    }
};

// Exporting the states object for use in other modules
export default states;
