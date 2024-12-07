import AbstractView from './AbstractView.js';
import { state, actions } from '../util/state.js';
import PHelper from './helpers/products.js';
//import Filter from './helpers/products/filter.js';

/**
 * ProductView class handles the display and management of products.
 * It fetches product data, filters, and sorts them for display.
 */
export default class ProductView extends AbstractView {

    constructor() {
        super();
        state.productPage.currentSort = '';
        this.helper = new PHelper();
        //this.filter = new Filter();
    }

    /**
     * Initializes the product view by fetching the fruit data.
     */
    async init() {
        try {
            await actions.fetchProducts();
            state.productPage.filteredFruits = [...state.products];
            state.productPage.topPicks = this.helper.getTopSoldFruits();
            state.productPage.feature = state.productPage.topPicks[0];
        } catch (e) {
            console.error('Failed to initialize:', e);
        }
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

                state.productPage.currentSort = e.target.value;
                this.sortProducts();
            });
        });
    }

    sortProducts() {
        this.helper.clearActiveTopPicks();
        this.helper.sortProducts();
        // Update display
        this.render();
    }

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
     * Renders the product display by fetching and displaying all products.
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
     * Sets the featured product and updates the display accordingly.
     * @param {Object} feature - The product to set as featured.
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


    /**
     * Generates the HTML for the product view.
     * @returns {string} HTML string for the product view.
     */
    async getHtml() {
        await this.init();
        return `
        <section class="app__products" aria-label="All products display area">
            <div class="app__products-container">
                <!-- Filter Bar -->
                ${await this.getFilter()}
                
                <!-- Top Picks Section -->
                <div class="products__section-header">
                    <h2 class="products__section-title">Top Picks</h2>
                    <span class="products__section-subtitle">Most Popular Devil Fruits</span>
                </div>
                
                <div class="products__section-divider"></div>
                ${await this.getTopProducts()}

                <!-- Featured Product -->
                <div id="feature" class="products__featured" aria-label="Featured Product">
                    ${await this.getFeaturedProduct()}
                </div>
                <!-- Product Grid -->
                    
                ${await this.getSort()}
                
                <div class="products__section-divider"></div>
                <div id="products" class="products__grid" aria-label="All products grid">
                    ${await this.getAllProducts()}
                </div>
                <div class="products__section-divider"></div>
            </div>
        </section>
        `;
    }

    async getSort() {
        return `
        <div class="products__sorting">
            <div class="products__sort-wrapper">
                <select class="products__sort-select" aria-label="Sort by sales">
                    <option value="">Sort by Sales</option>
                    <option value="sold-high">Most Sold</option>
                    <option value="sold-low">Least Sold</option>
                </select>
            </div>
            <div class="products__sort-wrapper">
                <select class="products__sort-select" aria-label="Sort by stock">
                    <option value="">Sort by Stock</option>
                    <option value="stock-high">Highest Stock</option>
                    <option value="stock-low">Lowest Stock</option>
                </select>
            </div>
            <div class="products__sort-wrapper">
                <select class="products__sort-select" aria-label="Sort by name">
                    <option value="">Sort by Name</option>
                    <option value="name-asc">A to Z</option>
                    <option value="name-desc">Z to A</option>
                </select>
            </div>
            <div class="products__sort-wrapper">
                <select class="products__sort-select" aria-label="Sort by price">
                    <option value="">Sort by Price</option>
                    <option value="price-low">Lowest Price</option>
                    <option value="price-high">Highest Price</option>
                </select>
            </div>
        </div>
        `;
    }
    /**
     * Generates the filter section HTML.
     * @returns {string} HTML string for the filter section.
     */
    async getFilter() {
        return `
        <div class="products__filter-bar" aria-label="Product filter options">
            <div class="products__search">
                <svg class="products__search-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <input type="text" class="products__search-input" placeholder="Search Devil Fruits..." oninput="this.value && this.dispatchEvent(new Event('search'))" aria-label="Search input for Devil Fruits">
            </div>
            <div class="products__category" role="group" aria-label="Product categories">
                <button class="products__category-btn products__category-btn--active" data-type="All">All</button>
                <button class="products__category-btn" data-type="Paramecia">Paramecia</button>
                <button class="products__category-btn" data-type="Logia">Logia</button>
                <button class="products__category-btn" data-type="Zoan">Zoan</button>
            </div>
        </div>
        `;
    }
    /**
     * Generates the HTML for top products.
     * @param {boolean} ind - Indicates if it will just call the function without parameter to not set the active class.
     * @returns {string} HTML string for top products.
     */
    async getTopProducts(ind = true) {
        return `
        <section id="top-products" class="products__top-picks" role="region" aria-label="Top picked products">
            <div class="products__picks-list">
                ${state.productPage.topPicks.map(fruit => `
                <article class="products__pick-item ${(fruit.id === 1 && ind) ? 'products__picked-item--active' : ''}" data-fruit-id="${fruit.id}" aria-label="${fruit.name} top pick">
                    <div class="products__pick-circle">
                        <img src="${fruit.image1}" alt="${fruit.name} top pick image" class="products__pick-image" loading="lazy">
                    </div>
                    <h3 class="products__pick-name">${(fruit.name).split(' no ')[0]}</h3>
                </article>`).join("")}
                <!-- Add more pick items as needed -->
            </div>
        </section>
        `;
    }

    /**
     * Generates the HTML for the featured product.
     * @returns {string} HTML string for the featured product.
     */
    async getFeaturedProduct() {
        if (!state.productPage.feature) {
            return ''; // Return empty if no feature is set
        }
        return `
            <!-- Featured Product -->
            <img src="${state.productPage.feature.image1}" alt="${state.productPage.feature.name} featured image" class="products__featured-image">
            <div class="products__featured-content">
                <h2 class="products__featured-title">${state.productPage.feature.name}</h2>
                <div class="products__featured-stats">
                    <div class="products__stat">
                        <div class="products__stat-number">${state.productPage.feature.sold}</div>
                        <div class="products__stat-label">Sold</div>
                    </div>
                    <div class="products__stat">
                        <div class="products__stat-number">${state.productPage.feature.stock}</div>
                        <div class="products__stat-label">In Stock</div>
                    </div>
                </div>
                <button class="products__add-btn" aria-label="Add ${state.productPage.feature.name} to cart">Add to Cart</button>
            </div>
        `;
    }

    /**
     * Generates the HTML for all products.
     * @returns {string} HTML string for all products.
     */
    async getAllProducts() {
        return `
            <!-- Product Card -->
            ${state.productPage.filteredFruits.map(fruit => `
            <article class="products__card" aria-label="${fruit.name} product card">
                <div class="products__image-wrapper">
                    <img src="${fruit.image1}" class="products__image products__image-primary" alt="${fruit.name} primary image">
                    <img src="${fruit.image2}" alt="${fruit.name} secondary image" class="products__image products__image-secondary">
                    <span class="products__tag">${fruit.type}</span>
                </div>
                <div class="products__info">
                    <h3 class="products__name">${fruit.name}</h3>
                    <p class="products__price">${fruit.price}</p>
                    <button class="products__add-btn" aria-label="Add ${fruit.name} to cart">Add to Cart</button>
                </div>
            </article>`).join('')}
            <!-- Repeat for other products -->
        `;
    }

}
