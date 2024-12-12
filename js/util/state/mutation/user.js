import states from "../state.js"

const state = states.data;

/**
 * The user mutation module handles user-related actions such as signing up, 
 * setting the current logged-in user, and logging out.
 */
const user = {
    functions: {
        /**
         * Adds a new user to the local storage.
         * This function checks if the user already exists based on their email.
         * If the user does not exist, it creates a new user object and saves it.
         * 
         * @param {Object} user - The user object containing user details.
         * @returns {boolean} - Returns true if the user was successfully added, false if the user already exists.
         */
        addUser: async (user) => {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userExists = users.some(existingUser => existingUser.email === user.email);

            if (userExists) {
                return false; // User already exists
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
        },

        /**
         * Sets the current user as logged in and updates the session storage.
         * 
         * @param {Object} user - The user object containing user details.
         */
        setLogged(user) {
            // Update the state with the logged-in user's information
            this.user = {
                isLoggedIn: true,
                name: "",
                email: user.email,
                cart: user.cart || [],
                checkouts: user.checkouts || []
            };
            // Save the updated user state in sessionStorage
            sessionStorage.setItem("user", JSON.stringify(this.user));
        },

        /**
         * Logs out the current user by clearing the user state and session storage.
         */
        logout: () => {
            state.user = { isLoggedIn: false, name: "", email: "" };
            sessionStorage.clear();
        }
    }
}

export default user;