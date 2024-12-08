import AbstractView from '../AbstractView.js';
import { state, actions } from '../../util/state.js';
import fruitsmodal from '../../templates/modal/fruitsmodal.js';

/**
 * ProductView class handles displaying products in an accessible and semantic way.
 * Renders product listings with:
 * - Semantic HTML structure using sections, articles, headings
 * - ARIA labels and roles for accessibility 
 * - Responsive images with alt text
 * - Interactive elements like filters and sort controls
 */
export default class extends AbstractView {

    constructor() {
        super();
        state.productPage.currentSort = '';
        //this.filter = new Filter();
    }

    /**
     * Initializes product data and sets up initial display state
     */
    async init() {
        try {
            await actions.fetchProducts();
            state.productPage.filteredFruits = [...state.products];
            state.productPage.topPicks = this.getTopSoldFruits();
            state.productPage.feature = state.productPage.topPicks[0];
        } catch (e) {
            console.error('Failed to initialize:', e);
        }
    }


    /**
     * Gets top 5 products by sales for featured display
     */
    getTopSoldFruits() {
        const sortedFruits = state.productPage.filteredFruits.sort((a, b) => parseInt(b.sold.replace(',', '')) - parseInt(a.sold.replace(',', '')));
        return sortedFruits.slice(0, 5);
    }

    /**
     * Renders main product view with semantic sections:
     * - Filter bar for search and categories
     * - Top picks carousel
     * - Featured product highlight
     * - Sortable product grid
     */
    async getHtml() {
        await this.init();
        return `
        <section class="app__products" aria-label="All products display area">
            <div class="app__products-container">
                <!-- Accessible filter controls -->
                ${await this.getFilter()}
                
                <!-- Top picks section with heading hierarchy -->
                <div class="products__section-header">
                    <h2 class="products__section-title">Top Picks</h2>
                    <span class="products__section-subtitle">Most Popular Devil Fruits</span>
                </div>
                
                <div class="products__section-divider" role="separator"></div>
                ${await this.getTopProducts()}

                <!-- Featured product showcase -->
                <article id="feature" class="products__featured" aria-label="Featured Product">
                    ${await this.getFeaturedProduct()}
                </article>
                    
                <!-- Sort controls -->
                ${await this.getSort()}
                
                <div class="products__section-divider" role="separator"></div>
                
                <!-- Main product grid -->
                <div id="products" class="products__grid" aria-label="All products grid">
                    ${await this.getAllProducts()}
                </div>
                
                <div class="products__section-divider" role="separator"></div>
            </div>
        </section>
        `;
    }

    /**
     * Renders sort dropdown controls with clear labels
     */
    async getSort() {
        return `
        <div class="products__sorting" role="group" aria-label="Product sorting options">
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
     * Renders search and category filter controls
     */
    async getFilter() {
        return `
        <div class="products__filter-bar" aria-label="Product filter options">
            <div class="products__search" role="search">
                <svg class="products__search-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <input type="text" 
                       class="products__search-input" 
                       placeholder="Search Devil Fruits..."
                       oninput="this.value && this.dispatchEvent(new Event('search'))" 
                       aria-label="Search Devil Fruits">
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
     * Renders top products carousel with proper headings and labels
     */
    async getTopProducts(ind = true) {
        return `
        <section id="top-products" class="products__top-picks" role="region" aria-label="Top picked products">
            <div class="products__picks-list">
                ${state.productPage.topPicks.map(fruit => `
                <article class="products__pick-item ${(fruit.id === 1 && ind) ? 'products__picked-item--active' : ''}" 
                         data-fruit-id="${fruit.id}" 
                         aria-label="${fruit.name} top pick"
                         role="button">
                    <div class="products__pick-circle">
                        <img src="${fruit.image1}" 
                             alt="${fruit.name} product image" 
                             class="products__pick-image" 
                             loading="lazy">
                    </div>
                    <h3 class="products__pick-name">${(fruit.name).split(' no ')[0]}</h3>
                </article>`).join("")}
            </div>
        </section>
        `;
    }

    /**
     * Renders featured product section with stats and details
     */
    async getFeaturedProduct() {
        if (!state.productPage.feature) {
            return '';
        }
        return `
        <img src="${state.productPage.feature.image1}" 
                alt="${state.productPage.feature.name} featured image" 
                class="products__featured-image">
        <div class="products__featured-content">
            <h2 class="products__featured-title">${state.productPage.feature.name}</h2>
            <div class="products__featured-stats" role="group" aria-label="Product statistics">
                <div class="products__stat">
                    <div class="products__stat-number">${state.productPage.feature.sold}</div>
                    <div class="products__stat-label">Sold</div>
                </div>
                <div class="products__stat">
                    <div class="products__stat-number">${state.productPage.feature.stock}</div>
                    <div class="products__stat-label">In Stock</div>
                </div>
            </div>
            <button class="products__btn products__add-btn" aria-label="Add ${state.productPage.feature.name} to cart">
                <svg class="products__btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/>
                </svg>    
                Add to Cart
            </button>
        </div>
        `;
    }

    /**
     * Renders main product grid with cards for each item
     */
    async getAllProducts() {
        return `
            ${state.productPage.filteredFruits.map(fruit => `
            <article class="products__card" aria-label="${fruit.name} product card">
                <div class="products__image-wrapper">
                    <img src="${fruit.image1}" 
                         class="products__image products__image-primary" 
                         alt="${fruit.name} main view"
                         loading="lazy">
                    <img src="${fruit.image2}" 
                         alt="${fruit.name} alternate view" 
                         class="products__image products__image-secondary"
                         loading="lazy">
                    <span class="products__tag" role="text">${fruit.type}</span>
                </div>
                <div class="products__info">
                    <h3 class="products__name">${fruit.name}</h3>
                    <p class="products__price" aria-label="Price: ${fruit.price}">${fruit.price}</p>
                    <div class="products__actions">
                        <button class="products__btn products__view-btn" data-fruit-toggle aria-label="View details">
                            <svg class="products__btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                            </svg>
                            VIEW
                        </button>
                        <button class="products__btn products__add-btn" aria-label="Add ${fruit.name} to cart">
                            <svg class="products__btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/>
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </article>`).join('')}
        `;
    }

}
