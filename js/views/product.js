import Product from './product/product.js';
import { state } from '../util/state.js';
import PHelper from './helpers/products.js';

/**
 * ProductView class extends Product to handle product display and management.
 * Responsible for:
 * - Initializing product data and state
 * - Binding event handlers for filtering and sorting
 * - Rendering product displays including featured items
 * - Managing product selection and filtering
 */
export default class extends Product {

    /**
     * Initializes the ProductView with default state and helper
     */
    constructor() {
        super();
        state.productPage.currentSort = '';
        this.helper = new PHelper();
        //this.filter = new Filter();
    }

    /**
     * Initializes event bindings and renders initial product display
     */
    async bindAll() {
        await this.renderTopProducts('top-products');
        this.bindFilterEvents();
        this.bindSortEvents(); // Add sort binding
    }

    /**
     * Sets up event handlers for product filtering:
     * - Category button clicks
     * - Search input changes 
     * - Sort select changes
     */
    bindFilterEvents() {
        const filterButtons = document.querySelectorAll('.products__category-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                state.productPage.currentFilter = event.target.getAttribute('data-type');
                this.helper.updateActiveCategory(button);
                this.filterProducts();
            });
        });

        const searchInput = document.querySelector('.products__search-input');
        searchInput.addEventListener('input', () => {
            this.filterProducts(searchInput.value);
        });

        // Add sort handlers
        const sortSelects = document.querySelectorAll('.products__sort-select');
        sortSelects.forEach(select => {
            select.addEventListener('change', () => {
                state.productPage.currentSort = select.value;
                this.sortProducts();
            });
        });
    }

    /**
     * Sets up event handlers for product sorting:
     * - Handles sort select changes
     * - Resets other sort selects when one changes
     * - Updates sort state and triggers re-render
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

                state.productPage.currentSort = e.target.value;
                this.sortProducts();
            });
        });
    }

    /**
     * Triggers product sorting and display update
     */
    sortProducts() {
        this.helper.clearActiveTopPicks();
        this.helper.sortProducts();
        // Update display
        this.render();
    }

    /**
     * Filters and updates product display based on search term
     * Maintains sort order and updates featured products
     */
    filterProducts(searchTerm = '') {
        this.helper.filterProducts(searchTerm);
        this.helper.clearActiveTopPicks();
        // Maintain current sort after filtering
        this.sortProducts();
        this.setFeaturedProduct(null);
        state.productPage.topPicks = this.helper.getTopSoldFruits();
        this.render();
    }

    /**
     * Re-renders the full product display
     */
    async render() {
        const container = document.getElementById('products');
        if (container) {
            container.innerHTML = await this.getAllProducts();
        }
        await this.renderTopProducts('top-products');
        this.helper.clearActiveTopPicks();
    }

    /**
     * Renders top product section and binds click handlers
     * @param {string} containerId - Container element ID
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
     * Handles clicks on top pick items:
     * - Toggles active state
     * - Updates featured product display
     * @param {number} fruitId - ID of clicked product
     * @param {HTMLElement} clickedItem - Clicked DOM element
     * @param {NodeList} click_handlers - All pick item elements
     */
    handlePickClick(fruitId, clickedItem, click_handlers) {
        click_handlers.forEach(item => {
            item.classList.remove('products__picked-item--active');
        });
        // Find the selected fruit from topPicks
        const selectedFruit = state.productPage.topPicks.find(fruit => fruit.id === fruitId);
        if (selectedFruit) {
            // Check if the selected fruit is already the featured product
            if (state.productPage.feature && state.productPage.feature.id === selectedFruit.id) {
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
     * Updates featured product display
     * @param {Object} feature - Product object to feature, or null to clear
     */
    async setFeaturedProduct(feature) {
        state.productPage.feature = feature; // Set the featured product
        const featureContainer = document.getElementById('feature');
        if (featureContainer) {
            if (state.productPage.feature) {
                featureContainer.style.display = 'grid';
                featureContainer.innerHTML = await this.getFeaturedProduct();
            } else {
                featureContainer.style.display = 'none';
            }
        }
    }

}
