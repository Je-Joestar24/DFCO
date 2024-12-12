import states from "../state.js";
import mutation from "../mutations.js";

const state = states.data;
const mutations = mutation.functions;

const product = {
    functions: {
        /**
         * Fetches all available products from a JSON file.
         * This action checks if the products are already loaded in the state,
         * and if not, it retrieves them from the specified JSON file.
         * The fetched products are then stored in the local storage for persistence.
         * 
         * @returns {Promise<void>}
         */
        fetchProducts: async () => {
            if (state.products.length === 0) {
                const products = await fetch("../../json/devilfruits.json").then((res) =>
                    res.json()
                );
                state.products = products;
                localStorage.setItem("products", JSON.stringify(state.products));
            }
        },

        /**
         * Fetches the details of a specific devil fruit for display in a modal.
         * The fruit parameter corresponds to the JSON file name for the fruit details.
         * 
         * @param {string} fruit - The json file name to fetch details for.
         * @returns {Promise<Object|null>} - Returns the fruit details or null if an error occurs.
         */
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
        },
    }
}

export default product;