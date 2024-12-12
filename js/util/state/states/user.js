/**
 * This is a submodule for the state that focuses on the user.
 * The user object indicates the current user and their status.
 * - isLoggedIn: Indicates if the user is logged in (boolean).
 * - name: The name of the user (optional string).
 * - email: The email of the user (string).
 * - cart: An array of products that are added to the cart by the user (array).
 * - checkouts: An array of products that have been checked out by the user (array).
 */
const user = {
    data: JSON.parse(sessionStorage.getItem("user")) || {
        isLoggedIn: false,
        name: "",
        email: "",
        cart: [],
        checkouts: []
    }
};

export default user;