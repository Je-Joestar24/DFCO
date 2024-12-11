import states from "../state.js"
import mutation from "../mutations.js";

const state = states.data;
const mutations = mutation.functions;

const user = {
    functions: {
        login: async (user) => {
            // Simulate checking if the user exists in state.users
            const foundUser = state.users.find(
                u => u.email === user.email && u.password === user.password
            );

            if (foundUser) {
                mutations.setLogged(foundUser);
                return { success: true, message: "Login successful", user: foundUser };
            }

            return { success: false, message: "Invalid email or password" };
        },
        logout: () => {
            sessionStorage.clear();
            window.location.href = window.location.origin + '#/';
            location.reload();
        },
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