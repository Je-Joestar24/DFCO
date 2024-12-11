import states from "../state.js"
import mutation from "../mutations.js";

const state = states.data;
const mutations = mutation.functions;

const product = {
    functions: {
        fetchProducts: async () => {
            if (state.products.length == 0) {
                const products = await fetch("../../json/devilfruits.json").then((res) =>
                    res.json()
                );
                state.products = products;
                localStorage.setItem("products", JSON.stringify(state.products));
            }
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
        },
    }
}

export default product;