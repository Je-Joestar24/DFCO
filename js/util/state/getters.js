import states from "./state.js";
import Helper from "./helper.js";

const state = states.data;
const helper = new Helper();


const getter = {
    functions: {
        getUser: () => {
            return state.user
        },
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
        },
        getCheckouts: () => {
            const checkouts = JSON.parse(JSON.stringify(state.user.checkouts));
            if (checkouts.length > 0) {
                const res = checkouts.map(checkout => {
                    const product = state.products.find(product => product.id === checkout.id);
                    if (product) {
                        const price = parseFloat(product.price.replace('₿', '').replace(/,/g, '')) || 0;
                        return {
                            ...product,
                            quantity: checkout.quantity,
                            total: helper.formatPrice(price * checkout.quantity)
                        };
                    }
                    return null;
                }).filter(item => item !== null);
                res.reverse();
                return res;
            }
            return [];
        },
        getCartCount: () => {
            if (!state.user.isLoggedIn || !state.user.cart || state.user.cart.length === 0) {
                return "0";
            }

            const totalCount = state.user.cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
            return totalCount > 99 ? "99+" : totalCount.toString();
        },
        getTotalPrice: () => {
            return state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
        },
        getActiveNav: () => {
            return state.navigations.active
        },
        getDisplay: async () => {
            return state.productPage.display
        },
        getCartSummary: () => {
            const cartItems = getter.functions.getCart();
            if (!cartItems || cartItems.length === 0) {
                return {
                    itemCount: 0,
                    total: helper.formatPrice(0)
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
                total: helper.formatPrice(total)
            };
        },
        getCartChecked: () => {
            const cartItems = getter.functions.getCart();
            if (!cartItems || cartItems.length === 0) {
                return [];
            }

            // Filter and return IDs of checked items
            const checkedItems = cartItems.filter(item => item.checked === true);
            return checkedItems.map(item => { return { id: item.id, quantity: item.quantity } });
        },
    }
}

export default getter;