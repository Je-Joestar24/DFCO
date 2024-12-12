/**
 * The user module handles user authentication actions such as login, logout, and signup.
 * It connects to the mutations defined in @mutations.js for state management.
 */
import states from "../state.js";
import mutation from "../mutations.js";

const state = states.data;
const mutations = mutation.functions;

const user = {
    functions: {
        /**
         * Logs in a user by checking their credentials against the stored users.
         * 
         * @param {Object} user - The user object containing email and password.
         * @returns {Object} - An object indicating success or failure of the login attempt.
         */
        login: async (user) => {
            const foundUser = state.users.find(
                u => u.email === user.email && u.password === user.password
            );

            if (foundUser) {
                mutations.setLogged(foundUser);
                return { success: true, message: "Login successful", user: foundUser };
            }

            return { success: false, message: "Invalid email or password" };
        },

        /**
         * Logs out the current user by clearing session storage and reloading the page.
         */
        logout: () => {
            sessionStorage.clear();
            window.location.href = window.location.origin + '#/';
            location.reload();
        },

        /**
         * Signs up a new user by adding them to the local storage.
         * 
         * @param {Object} user - The user object containing user details.
         * @returns {Promise<void>} - Resolves when the signup process is complete.
         */
        signup: async (user) => {
            const form = await mutations.addUser(user);
            if (form) {
                return;
            }
            return;
        },
    }
}

export default user;