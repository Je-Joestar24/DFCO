const state = {
    user: {
        isLoggedIn: false,
        name: "",
        email: "",
        cart: [],
        checkouts: []
    },
    productPage: {
        topPicks: [], // Array to hold top picked fruits
        filteredFruits: [], // Array to hold filtered fruits based on user input
        feature: {}, // Object to hold the featured product
        currentFilter: 'All', // Current filter applied to the products
        currentSort: 'sold', //Current Sorting method
        display: {},
    },
    cart: [],
    products: [], // Store fetched devil fruits or other data
};

// Getters: Retrieve state data
const getters = {
    getUser: () => state.user,
    getCart: () => state.cart,
    getTotalPrice: () =>
        state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    getActiveNav: () => state.navigations.active,
    getDisplay: async () => state.productPage.display
};

// Mutations: Synchronous functions to modify the state
const mutations = {
    setUser: (user) => {
        state.user = { ...user, isLoggedIn: true };
        localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: () => {
        state.user = { isLoggedIn: false, name: "", email: "" };
        sessionStorage.clear();
    },
    addToCart: (product) => {
        const item = state.cart.find((item) => item.id === product.id);
        if (item) {
            item.quantity += product.quantity;
        } else {
            state.cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (productId) => {
        state.cart = state.cart.filter((item) => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(state.cart));
    },setDisplay(display){
        state.productPage.display = display;
    }
};

// Actions: Asynchronous or complex operations
const actions = {
    login: async (email, password) => {
        // Simulated API call
        const user = { name: "John Doe", email: email }; // Mocked data
        mutations.setUser(user);
        return user;
    },
    fetchProducts: async () => {
        const products = await fetch("../../json/devilfruits.json").then((res) =>
            res.json()
        );
        state.products = products;
    },
    restoreState: () => {
        const savedUser = localStorage.getItem("user");
        const savedCart = localStorage.getItem("cart");
        if (savedUser) state.user = JSON.parse(savedUser);
        if (savedCart) state.cart = JSON.parse(savedCart);
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
    }, setActiveNavigation(active_id, active_class){
        const nav = document.getElementById(`app__nav`);
        nav.querySelectorAll(`.${active_class}`).forEach(e => {
            e.classList.remove(active_class);
        });
        const found = nav.querySelector(`#${active_id}`);
        if(found)found.classList.add(active_class);
    }, displayMessage(message){
        const message_display = document.querySelector('.app__message');
        message_display.classList.remove('fade-out');
        message_display.innerHTML = message;
        setTimeout(() => {
            message_display.classList.add('fade-out');
        }, 10);
    }
};

// Initialize State on Load
actions.restoreState();

export { state, getters, mutations, actions };
