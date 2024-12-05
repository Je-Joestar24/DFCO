import AbstractView from './AbstractView.js';

export default class ProductView extends AbstractView {
    topPicks = [];
    fruits = [];
    filteredFruits = [];
    feature = {};
    currentFilter = 'All';
    currentSort = 'sold';

    constructor() {
        super();
    }

    async init() {
        try {
            const response = await fetch('../../json/devilfruits.json');
            this.fruits = await response.json();
            this.filteredFruits = [...this.fruits];
            this.topPicks = this.getTopSoldFruits();
            this.feature = this.topPicks[0];
        } catch (e) {
            console.error('Failed to initialize:', e);
        }
    }

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
                <div id="feature" class="products__featured">
                    ${await this.getFeaturedProduct()}
                </div>
                <!-- Product Grid -->
                
                <div id="products" class="products__grid">
                    ${await this.getAllProducts()}
                </div>
                <div class="products__section-divider"></div>
            </div>
        </section>
        `;
    }

    async getFilter() {
        return `
        <div class="products__filter-bar">
            <div class="products__search">
                <svg class="products__search-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <input type="text" class="products__search-input" placeholder="Search Devil Fruits..." oninput="this.value && this.dispatchEvent(new Event('search'))">
            </div>
            <div class="products__category">
                <button class="products__category-btn products__category-btn--active" data-type="All">All</button>
                <button class="products__category-btn" data-type="Paramecia">Paramecia</button>
                <button class="products__category-btn" data-type="Logia">Logia</button>
                <button class="products__category-btn" data-type="Zoan">Zoan</button>
            </div>
        </div>
        `;
    }

    async getAllProducts() {
        return `
            <!-- Product Card -->
            ${this.filteredFruits.map(fruit => `
            <article class="products__card">
                <div class="products__image-wrapper">
                    <img src="${fruit.image1}" class="products__image products__image-primary">
                    <img src="${fruit.image2}" alt="${fruit.name}" class="products__image products__image-secondary">
                    <span class="products__tag">${fruit.type}</span>
                </div>
                <div class="products__info">
                    <h3 class="products__name">${fruit.name}</h3>
                    <p class="products__price">${fruit.price}</p>
                    <button class="products__add-btn">Add to Cart</button>
                </div>
            </article>`).join('')}
            <!-- Repeat for other products -->
        `;
    }

    async getTopProducts() {
        return `
        <div id="top-products" class="products__top-picks">
            <div class="products__picks-list">
                ${this.topPicks.map(fruit => `
                <div class="products__pick-item" data-fruit-id="${fruit.id}">
                    <div class="products__pick-circle">
                        <img src="${fruit.image1}" alt="${fruit.name}" class="products__pick-image">
                    </div>
                    <span class="products__pick-name">${(fruit.name).split(' no ')[0]}</span>
                </div>`).join("")}
                <!-- Add more pick items as needed -->
            </div>
        </div>
        `;
    }

    async getFeaturedProduct() {
        if (!this.feature) {
            return ''; // Return empty if no feature is set
        }
        return `
            <!-- Featured Product -->
            <img src="${this.feature.image1}" alt="${this.feature.name}" class="products__featured-image">
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
                <button class="products__add-btn">Add to Cart</button>
            </div>
        `;
    }
    
    getTopSoldFruits() {
        const sortedFruits = this.filteredFruits.sort((a, b) => parseInt(b.sold.replace(',', '')) - parseInt(a.sold.replace(',', '')));
        // Select the top 5 fruits
        return sortedFruits.slice(0, 5);
    }
}
