

import states from "./state/state.js";// The whole state
import getter from "./state/getters.js";
import mutation from "./state/mutations.js";


const state = states.data;

// Getters: Retrieve state data
const getters = getter.functions;

// Mutations: Synchronous functions to modify the state
const mutations = mutation.function;

// Actions: Asynchronous or complex operations
const actions = {
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
    fetchProducts: async () => {
        if (state.products.length == 0) {
            const products = await fetch("../../json/devilfruits.json").then((res) =>
                res.json()
            );
            state.products = products;
            localStorage.setItem("products", JSON.stringify(state.products));
        }
    },
    restoreState: () => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) state.user = JSON.parse(savedUser);
    },
    fetchDevilFruitDetails: async (fruit) => {
        try {
            const response = await fetch(`../../json/devil-fruits/${fruit}`);
            if (!response.ok) {
                throw new Error('Failed to fetch devil fruit details');
            }
            const fruitDetails = await response.json();
            mutations.setDisplay(fruitDetails);
            return fruitDetails;
        } catch (error) {
            console.error('Error fetching devil fruit details:', error);
            return null;
        }
    }, setActiveNavigation(active_id, active_class) {
        const nav = document.getElementById(`app__nav`);
        nav.querySelectorAll(`.${active_class}`).forEach(e => {
            e.classList.remove(active_class);
        });
        const found = nav.querySelector(`#${active_id}`);
        if (found) found.classList.add(active_class);
    }, displayMessage(message, custom = 10) {
        const message_display = document.querySelector('.app__message');
        message_display.classList.remove('fade-out');
        message_display.innerHTML = message;
        setTimeout(() => {
            message_display.classList.add('fade-out');
        }, custom);
    }, async setNotificationMark(){
        const count = await getters.getCartCount();
        const notif =   document.getElementById("nav__cart-badge");
        if(count != 0) {
            notif.innerText = count;
            notif.style.opacity = 1;
        }
        else notif.style.opacity = 0;
    }
};

// Initialize State on Load
actions.restoreState();

export { state, getters, mutations, actions };
