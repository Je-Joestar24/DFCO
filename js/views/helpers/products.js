import { state } from "../../util/state.js";

/**
 * Helper class for product-related functionality
 * Handles:
 * - Product sorting by various criteria (price, name, stock, etc)
 * - Product filtering by type and search term
 * - Category button state management
 * - Top picks selection and display
 * - Retrieving top sold products
 */
export default class {
    
    /**
     * Sorts the filtered fruits based on the current sort state.
     * Supports sorting by:
     * - Sold count (high/low)
     * - Stock level (high/low) 
     * - Price (high/low)
     * - Name (ascending/descending)
     */
    sortProducts() {
        if (!state.productPage.currentSort) return;
        const sortBySold = (a, b) => parseInt(b.sold.replace(',', '')) - parseInt(a.sold.replace(',', ''));
        const sortByStock = (a, b) => parseInt(b.stock) - parseInt(a.stock);
        const sortByPriceHigh = (a, b) => parseFloat(b.price.replace(/[^0-9.-]+/g, "")) - parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
        const sortByPriceLow = (a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
        const sortByNameAsc = (a, b) => a.name.localeCompare(b.name);
        const sortByNameDesc = (a, b) => b.name.localeCompare(a.name);

        const sortFunctions = {
            'sold-high': sortBySold,
            'sold-low': (a, b) => sortBySold(b, a),
            'stock-high': sortByStock,
            'stock-low': (a, b) => sortByStock(b, a),
            'price-high': sortByPriceHigh,
            'price-low': sortByPriceLow,
            'name-asc': sortByNameAsc,
            'name-desc': sortByNameDesc,
        };

        if (state.productPage.currentSort in sortFunctions) {
            state.productPage.filteredFruits.sort(sortFunctions[state.productPage.currentSort]);
        }
    }

    /**
     * Filters the fruits based on the current filter and search term.
     * Updates the filtered fruits array and re-renders the product display.
     * Handles special case for Zoan type which includes both regular and Mythical Zoan.
     * @param {string} searchTerm - The term to filter products by name.
     */
    filterProducts(searchTerm = '') {
        state.productPage.filteredFruits = state.products.filter(fruit => {
            const matchesType = state.productPage.currentFilter === 'All' ||
                (fruit.type === state.productPage.currentFilter ||
                    (state.productPage.currentFilter === 'Zoan' && (fruit.type === 'Zoan' || fruit.type === 'Mythical Zoan')));
            const matchesSearch = fruit.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesType && matchesSearch;
        });
    }

    /**
     * Updates the active category button's appearance.
     * Removes active class from all buttons and adds it to the selected one.
     * @param {HTMLElement} activeButton - The button that is currently active.
     */
    updateActiveCategory(activeButton) {
        const buttons = document.querySelectorAll('.products__category-btn');
        buttons.forEach(button => {
            button.classList.remove('products__category-btn--active');
        });
        activeButton.classList.add('products__category-btn--active');
    }

    /**
     * Clears the active class from all top pick items.
     * Used when resetting the featured product display.
     */
    clearActiveTopPicks() {
        const click_handlers = document.querySelectorAll('.products__pick-item');
        click_handlers.forEach(item => {
            item.classList.remove('products__picked-item--active');
        });
    }

    /**
     * Retrieves the top sold fruits based on the sold count.
     * Sorts fruits by sold count in descending order and returns top 5.
     * @returns {Array} Array of top 5 sold fruits.
     */
    getTopSoldFruits() {
        const sortedFruits = state.productPage.filteredFruits.sort((a, b) => parseInt(b.sold.replace(',', '')) - parseInt(a.sold.replace(',', '')));
        // Select the top 5 fruits
        return sortedFruits.slice(0, 5);
    }
}