/**
 * This is the state for the product page. 
 * It includes:
 * - topPicks: An array of top-picked products.
 * - filteredFruits: An array that manages the display of the products based on filters.
 * - feature: An object that displays details when a top pick is clicked.
 * - currentFilter: The current filter applied to the products, defaulting to 'All'.
 * - currentSort: The current sorting method, defaulting to 'sold'.
 * - display: The default value that handles the modal display of the products, initialized with placeholder data.
 */
const products = {
    data: {
        topPicks: [],
        filteredFruits: [],
        feature: {},
        currentFilter: 'All',
        currentSort: 'sold',
        display: {
            id: -1,
            name: "NO DATA",
            alias: "NO DATA",
            currentUser: "NO DATA",
            description: "NO DATA",
            abilities: ["NO DATA"],
            weaknesses: ["NO DATA"],
            type: "NO DATA",
            specifications: {
                power: "NO DATA",
                range: "NO DATA",
                durability: "NO DATA"
            },
            img: "./images/devil-fruits/nodata.png",
            price: "NO DATA"
        }
    }
};

export default products;