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
    },cart: {
        isBound: false,
        remove: -1
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
                        quantity: item.quantity,
                        checked: item.checked || false // Add checked property with default false
                    };
                }
                return null;
            }).filter(item => item !== null);
            return cart;
        } else {
            return [];
        }
    }, getCheckouts: () => {
        const checkouts = state.user.checkouts;
        if (checkouts.length > 0) {
            return checkouts.map(checkout => {
                const product = state.products.find(product => product.id === checkout.id);
                if (product) {
                    const price = parseFloat(product.price.replace('₿', '').replace(/,/g, '')) || 0;
                    return {
                        ...product,
                        quantity: checkout.quantity,
                        total: formatPrice(price * checkout.quantity)
                    };
                }
                return null;
            }).filter(item => item !== null);
        }
        return [];
    },getTotalPrice: () =>  state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    getActiveNav: () => state.navigations.active,
    getDisplay: async () => state.productPage.display,
    getCartSummary: () => {
        const cartItems = getters.getCart();
        if (!cartItems || cartItems.length === 0) {
            return {
                itemCount: 0,
                total: formatPrice(0)
            };
        }

        // Only include checked items in calculations
        const checkedItems = cartItems.filter(item => item.checked === true);
        
        const total = checkedItems.reduce((total, item) => {
            let price = 0;
            if (item.price) {
                price = parseFloat(item.price.replace('₿', '').replace(/,/g, '')) || 0;
            }
            return total + (price * (item.quantity || 1));
        }, 0);

        return {
            itemCount: checkedItems.reduce((count, item) => count + (item.quantity || 1), 0),
            total: formatPrice(total)
        };
    },getCartChecked: () => {
        const cartItems = getters.getCart();
        if (!cartItems || cartItems.length === 0) {
            return [];
        }
    
        // Filter and return IDs of checked items
        const checkedItems = cartItems.filter(item => item.checked === true);
        return checkedItems.map(item => {return {id: item.id, quantity: item.quantity}});
    },    
};

// Helper function to format prices
function formatPrice(number) {
    return '₿ ' + number.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

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
    }, addToCart: (id) => {
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
    }, setDisplay(display) {
        state.productPage.display = display;
    }, updateCartItem: (id, quantity) => {
        const item = state.user.cart.find(item => item.id === id);
        if (!item) return { success: false, message: "Item not found in cart" };
    
        if (quantity < 1) {
            return;
        }
    
        const product = state.products.find(p => p.id === id);
        if (!product) return { success: false, message: "Product not found" };
        if (quantity > product.stock) {
            return {success: false, message: "Exceeds available stock" };
        }
    
        item.quantity = quantity;
    
        const userCopy = {
            ...state.user,
            cart: state.user.cart.map(cartItem => ({
                ...cartItem,
                checked: false 
            }))
        };
    
        sessionStorage.setItem("user", JSON.stringify(userCopy));
    
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map(user => {
            if (user.email === state.user.email) {
                return { ...user, cart: userCopy.cart };
            }
            return user;
        });
    
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    
        return { success: true };
    }, setChecked(id, checked){
        const cartItem = state.user.cart.find(item => item.id == id);
        cartItem["checked"] = checked;
        return cartItem;
    }, multiCheckout() {
        try {
            const checkouts = getters.getCartChecked();
    
            if (!checkouts || checkouts.length === 0) {
                return { success: false, message: "No items to checkout." };
            }
    
            for (const item of checkouts) {
                const product = state.products.find(p => p.id === item.id);
    
                // Check if the product exists
                if (!product) {
                    return { success: false, message: `Product with ID ${item.id} not found.` };
                }
    
                if (product.stock < (item.quantity || 1)) {
                    return {
                        success: false,
                        message: `Insufficient stock for product: ${product.name}. Available stock: ${product.stock}.`
                    };
                }
    
                product.stock -= (item.quantity || 1);
                product.sold = parseInt(product.sold.replace(/,/g, ""), 10) || 0;
                product.sold += parseInt(item.quantity || 1, 10);
                product.sold = product.sold.toLocaleString();
    
                state.user.checkouts.push({ id: item.id, quantity: item.quantity || 1 });
    
                this.removeFromCart(item.id);
            }

    
            const userCopy = {
                ...state.user,
                checkouts: state.user.checkouts
            };
    
            sessionStorage.setItem("user", JSON.stringify(userCopy));
    
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const updatedUsers = users.map(user => {
                if (user.email === state.user.email) {
                    return { ...user, checkouts: userCopy.checkouts };
                }
                return user;
            });
    
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            localStorage.setItem("products", JSON.stringify(state.products));
            return { success: true, message: "CHECKOUT SUCCESS" };
        } catch (error) {
            return { success: false, message: "Error during checkout" };
        }
    }, singleCheckout(id) {
        try {
            const product = state.products.find(p => p.id === id);
            if (!product) return { success: false, message: "Product not found" };
    
            if (product.stock < 1) {
                return { success: false, message: "Product is out of stock" };
            }
    
            product.stock -= 1;
            product.sold = parseInt(product.sold.replace(/,/g, ""), 10) || 0;
            product.sold += 1;
            product.sold = product.sold.toLocaleString();
            localStorage.setItem("products", JSON.stringify(state.products));
    
            state.user.checkouts.push({ id, quantity: 1 });
    
            const userCopy = {
                ...state.user,
                checkouts: state.user.checkouts
            };
    
            sessionStorage.setItem("user", JSON.stringify(userCopy));
    
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const updatedUsers = users.map(user => {
                if (user.email === state.user.email) {
                    return { ...user, checkouts: userCopy.checkouts };
                }
                return user;
            });
    
            localStorage.setItem("users", JSON.stringify(updatedUsers));
    
            return { success: true, message: "CHECKOUT SUCCESS" };
        } catch (error) {
            console.error("Error during single checkout:", error);
            return { success: false, message: "An error occurred during single checkout." };
        }
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
    }
};

// Initialize State on Load
actions.restoreState();

export { state, getters, mutations, actions };
