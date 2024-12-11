import states from "../state.js"

const state = states.data;

const carts = {
    functions: {
        addToCart: (id) => {
            // Find the product in state.products
            const product = state.products.find(p => p.id === id);
            if (!product) return; // Product not found

            const item = state.user.cart.find((item) => item.id === id);

            // Check if adding would exceed the product limit
            if (item && item.quantity >= product.stock) {
                return; // Already at limit
            }

            if (item) {
                item.quantity++;
            } else {
                state.user.cart.push({ id, quantity: 1, checked: false }); // Added checked field defaulting to false
            }

            sessionStorage.setItem("user", JSON.stringify(state.user));

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const updatedUsers = users.map((existingUser) => {
                if (existingUser.email === state.user.email) {
                    return { ...existingUser, cart: state.user.cart };
                }
                return existingUser;
            });

            localStorage.setItem("users", JSON.stringify(updatedUsers));
            state.users = updatedUsers; // Update state.users with the new user data
        }, removeFromCart: (id) => {
            state.user.cart = state.user.cart.filter(item => Number(item.id) !== Number(id));
            sessionStorage.setItem("user", JSON.stringify(state.user));

            // Update localStorage
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const updatedUsers = users.map(user => {
                if (user.email === state.user.email) {
                    return { ...user, cart: state.user.cart };
                }
                return user;
            });

            localStorage.setItem("users", JSON.stringify(updatedUsers));
            return true;
        },
    }
}

export default carts;