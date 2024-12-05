const state = {
    user: {
        isLoggedIn: false,
        name: "",
        email: "",
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
    },
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
    fetchDevilFruitDetails: async (fruitId) => {
        try {
            const fruit = state.products.find(item => item.id === fruitId);
            if (!fruit) {
                throw new Error('Fruit not found');
            }
            const response = await fetch(`../../json/devil-fruits/${fruit.json}`);
            if (!response.ok) {
                throw new Error('Failed to fetch devil fruit details');
            }
            const fruitDetails = await response.json();
            return fruitDetails;
        } catch (error) {
            console.error('Error fetching devil fruit details:', error);
            return null;
        }
    }
};

// Initialize State on Load
actions.restoreState();

export { state, getters, mutations, actions };
