import AbstractView from './../AbstractView.js';
import { state, actions } from '../../util/state.js';

/**
 * ProductView class handles the display and management of products.
 * It fetches product data, filters, and sorts them for display.
 */
export default class ProductView extends AbstractView {
    topPicks = []; // Array to hold top picked fruits
    filteredFruits = []; // Array to hold filtered fruits based on user input
    feature = {}; // Object to hold the featured product
    currentFilter = 'All'; // Current filter applied to the products
    currentSort = 'sold'; // Current sorting method

    constructor() {
        super();
    }

    /**
     * Initializes the product view by fetching the fruit data.
     */
    async init() {
        try {
            await actions.fetchProducts();
            this.filteredFruits = [...state.products];
            this.topPicks = this.getTopSoldFruits();
            this.feature = this.topPicks[0];
        } catch (e) {
            console.error('Failed to initialize:', e);
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
    
    async getSort(){
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
                ${this.topPicks.map(fruit => `
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
        if (!this.feature) {
            return ''; // Return empty if no feature is set
        }
        return `
            <!-- Featured Product -->
            <img src="${this.feature.image1}" alt="${this.feature.name} featured image" class="products__featured-image">
            <div class="products__featured-content">
                <h2 class="products__featured-title">${this.feature.name}</h2>
                <div class="products__featured-stats">
                    <div class="products__stat">
                        <div class="products__stat-number">${this.feature.sold}</div>
                        <div class="products__stat-label">Sold</div>
                    </div>
                    <div class="products__stat">
                        <div class="products__stat-number">${this.feature.stock}</div>
                        <div class="products__stat-label">In Stock</div>
                    </div>
                </div>
                <button class="products__add-btn" aria-label="Add ${this.feature.name} to cart">Add to Cart</button>
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
            ${this.filteredFruits.map(fruit => `
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

    /**
     * Retrieves the top sold fruits based on the sold count.
     * @returns {Array} Array of top sold fruits.
     */
    getTopSoldFruits() {
        const sortedFruits = this.filteredFruits.sort((a, b) => parseInt(b.sold.replace(',', '')) - parseInt(a.sold.replace(',', '')));
        // Select the top 5 fruits
        return sortedFruits.slice(0, 5);
    }
}
