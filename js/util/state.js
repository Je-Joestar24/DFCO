const state = {
    user: (JSON.parse(sessionStorage.getItem("user"))) || {
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
        display: {
            "id": -1,
            "name": "NO DATA",
            "alias": "NO DATA",
            "currentUser": "NO DATA",
            "description": "NO DATA",
            "abilities": [
                "NO DATA",
            ],
            "weaknesses": [
                "NO DATA",
            ],
            "type": "NO DATA",
            "specifications": {
                "power": "NO DATA",
                "range": "NO DATA",
                "durability": "NO DATA"
            },
            "img": "./images/devil-fruits/nodata.png",
            "price": "NO DATA"
        },
    },
    users: JSON.parse(localStorage.getItem("users")) || [],
    products: JSON.parse(localStorage.getItem("products")) || [], // Store fetched devil fruits or other data
};

// Getters: Retrieve state data
const getters = {
    getUser: () => state.user,
    getCart: () => {
        const cartItems = state.user.cart; 
        if (cartItems.length > 0) {
            const cart = cartItems.map(item => {
                const product = state.products.find(product => product.id === item.id);

                if (product) {
                    return {
                        ...product, 
                        quantity: item.quantity 
                    };
                }
                return null; 
            }).filter(item => item !== null); 
            return cart;
        } else {
            console.log("No items in the cart.");
            return [];
        }

    },
    getTotalPrice: () =>
        state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    getActiveNav: () => state.navigations.active,
    getDisplay: async () => state.productPage.display
};

// Mutations: Synchronous functions to modify the state
const mutations = {
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
    },
    setLogged(user) {
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

    },
    logout: () => {
        state.user = { isLoggedIn: false, name: "", email: "" };
        sessionStorage.clear();
    },
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
            state.user.cart.push({ id, quantity: 1 });
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
    }
    ,
    removeFromCart: (productId) => {
        state.cart = state.cart.filter((item) => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }, setDisplay(display) {
        state.productPage.display = display;
    }
};

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
            console.log("User added successfully!");
            return;
        }
        console.log("User already exists!");
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
    }, displayMessage(message) {
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
