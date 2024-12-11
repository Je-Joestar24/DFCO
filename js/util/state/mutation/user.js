import states from "../state.js"

const state = states.data;

const user = {
    functions: {
        addUser: async (user) => {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userExists = users.some(existingUser => existingUser.email === user.email);

            if (userExists) {
                return false;
            }

            const setUp = {
                email: user.email,
                name: "",
                password: user.password,
                contact: "",
                cart: [],
                checkouts: []
            };
            // Add the new user to the list
            users.push(setUp);

            // Save the updated list back to local storage
            localStorage.setItem("users", JSON.stringify(users));
            state.users = users;

            return true; // Return true to indicate successful addition
        }, setLogged(user) {
            // Update the state
            this.user = {
                isLoggedIn: true,
                name: "",
                email: user.email,
                cart: user.cart || [],
                checkouts: user.checkouts || []
            };
            // Save the updated user state in sessionStorage
            sessionStorage.setItem("user", JSON.stringify(this.user));

            const logged = JSON.parse(sessionStorage.getItem("user"));

        }, logout: () => {
            state.user = { isLoggedIn: false, name: "", email: "" };
            sessionStorage.clear();
        }
    }
}

export default user;