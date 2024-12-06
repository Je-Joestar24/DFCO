import ProductView from "./product/product.js";
import { state, mutations, getters, actions } from '../util/state.js';

/**
 * ProductHelper class extends ProductView to manage product-related functionalities.
 * It handles sorting, filtering, and rendering of products.
 */
export default class ProductHelper extends ProductView {
    /**
     * Initializes the ProductHelper instance and sets the current sort state.
     */
    constructor() {
        super();
        this.currentSort = ''; // Track current sort state
    }

    /**
     * Binds all necessary events for filtering and sorting products.
     * It also renders the top products initially.
     */
    async bindAll() {
        await this.renderTopProducts('top-products');
        this.bindFilterEvents();
        this.bindSortEvents(); // Add sort binding
    }

    /**
     * Binds filter events to the filter buttons and search input.
     * Updates the current filter and triggers the filtering of products.
     */
    bindFilterEvents() {
        const filterButtons = document.querySelectorAll('.products__category-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                this.currentFilter = event.target.getAttribute('data-type');
                this.updateActiveCategory(button);
                this.filterFruits();
            });
        });

        const searchInput = document.querySelector('.products__search-input');
        searchInput.addEventListener('input', () => {
            this.filterFruits(searchInput.value);
        });

        // Add sort handlers
        const sortSelects = document.querySelectorAll('.products__sort-select');
        sortSelects.forEach(select => {
            select.addEventListener('change', () => {
                this.sortFruits(select.value);
            });
        });
    }

    /**
     * Binds sorting events to the sort select elements.
     * Resets other selects when one is changed and triggers sorting.
     */
    bindSortEvents() {
        const sortSelects = document.querySelectorAll('.products__sort-select');
        sortSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                // Reset other select if it has a value
                sortSelects.forEach(otherSelect => {
                    if (otherSelect !== e.target && otherSelect.value) {
                        otherSelect.value = '';
                    }
                });
                
                this.currentSort = e.target.value;
                this.sortProducts();
            });
        });
    }

    /**
     * Filters the fruits based on the current filter and search term.
     * Updates the filtered fruits array and re-renders the product display.
     * @param {string} searchTerm - The term to filter products by name.
     */
    filterFruits(searchTerm = '') {
        this.filteredFruits = state.products.filter(fruit => {
            const matchesType = this.currentFilter === 'All' ||
                (fruit.type === this.currentFilter ||
                    (this.currentFilter === 'Zoan' && (fruit.type === 'Zoan' || fruit.type === 'Mythical Zoan')));
            const matchesSearch = fruit.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesType && matchesSearch;
        });

        // Clear active classes from top picks
        this.clearActiveTopPicks();

        // Maintain current sort after filtering
        if (this.currentSort) {
            this.sortProducts();
        } else {
            this.topPicks = this.getTopSoldFruits();
            this.setFeaturedProduct(null);
            this.render();
        }
    }

    /**
     * Clears the active class from all top pick items.
     */
    clearActiveTopPicks() {
        const click_handlers = document.querySelectorAll('.products__pick-item');
        click_handlers.forEach(item => {
            item.classList.remove('products__picked-item--active');
        });
    }

    /**
     * Renders the product display by fetching and displaying all products.
     */
    async render() {
        const container = document.getElementById('products');
        if (container) {
            container.innerHTML = await this.getAllProducts();
        }
        await this.renderTopProducts('top-products');
        this.clearActiveTopPicks();
    }

    /**
     * Updates the active category button's appearance.
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
     * Renders the top products in the specified container.
     * @param {string} containerId - The ID of the container to render top products in.
     */
    async renderTopProducts(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = await this.getTopProducts(true);

            // Add event listeners to each pick item
            const click_handlers = container.querySelectorAll('.products__pick-item');
            click_handlers.forEach(item => {
                item.addEventListener('click', (event) => {
                    const fruitId = parseInt(item.getAttribute('data-fruit-id'), 10);
                    this.handlePickClick(fruitId, item, click_handlers); // Pass the item to handlePickClick
                });
            });
        }
    }

    /**
     * Handles the click event on a pick item.
     * Updates the featured product and manages active classes.
     * @param {number} fruitId - The ID of the clicked fruit.
     * @param {HTMLElement} clickedItem - The item that was clicked.
     * @param {NodeList} click_handlers - All pick items.
     */
    handlePickClick(fruitId, clickedItem, click_handlers) {
        click_handlers.forEach(item => {
            item.classList.remove('products__picked-item--active');
        });
        // Find the selected fruit from topPicks
        const selectedFruit = this.topPicks.find(fruit => fruit.id === fruitId);
        if (selectedFruit) {
            // Check if the selected fruit is already the featured product
            if (this.feature && this.feature.id === selectedFruit.id) {
                // If clicked twice, clear the featured product
                this.setFeaturedProduct(null);
                clickedItem.classList.remove('products__picked-item--active'); // Remove active class
            } else {
                // Set the feature data and update the featured product display
                this.setFeaturedProduct(selectedFruit);
                // Add active class to the clicked item
                clickedItem.classList.add('products__picked-item--active');
            }
        }
    }

    /**
     * Sets the featured product and updates the display accordingly.
     * @param {Object} feature - The product to set as featured.
     */
    async setFeaturedProduct(feature) {
        this.feature = feature; // Set the featured product
        const featureContainer = document.getElementById('feature');
        if (featureContainer) {
            if (this.feature) {
                featureContainer.style.display = 'grid';
                featureContainer.innerHTML = await this.getFeaturedProduct();
            } else {
                featureContainer.style.display = 'none';
            }
        }
    }

    /**
     * Sorts the filtered fruits based on the specified sort value.
     * @param {string} sortValue - The value to sort the fruits by.
     */
    sortFruits(sortValue) {
        if (!sortValue) return;

        this.filteredFruits.sort((a, b) => {
            switch(sortValue) {
                case 'sold-high':
                    return parseInt(b.sold.replace(',', '')) - parseInt(a.sold.replace(',', ''));
                case 'sold-low':
                    return parseInt(a.sold.replace(',', '')) - parseInt(b.sold.replace(',', ''));
                case 'stock-high':
                    return b.stock - a.stock;
                case 'stock-low':
                    return a.stock - b.stock;
                default:
                    return 0;
            }
        });

        // Clear active classes from top picks

        this.render();
    }

    /**
     * Sorts the filtered fruits based on the current sort state.
     */
    sortProducts() {
        if (!this.currentSort) return;
        const sortBySold = (a, b) => parseInt(b.sold.replace(',', '')) - parseInt(a.sold.replace(',', ''));
        const sortByStock = (a, b) => parseInt(b.stock) - parseInt(a.stock);
        const sortByPriceHigh = (a, b) => parseFloat(b.price.replace(/[^0-9.-]+/g,"")) - parseFloat(a.price.replace(/[^0-9.-]+/g,""));
        const sortByPriceLow = (a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g,"")) - parseFloat(b.price.replace(/[^0-9.-]+/g,""));
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

        if (this.currentSort in sortFunctions) {
            this.filteredFruits.sort(sortFunctions[this.currentSort]);
        }

        // Clear active classes from top picks

        // Update display
        this.render();
    }
}