import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    topPicks = [];
    fruits = [];
    feature = {};

    constructor() {
        super();
    }

    async init(){
        try{
            const response= await fetch('../../json/devilfruits.json');
            this.fruits = await response.json();
            this.topPicks = await this.getTopSoldFruits();
            this.feature = this.topPicks[0];
        }catch(e){
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

                <div class="products__section-divider"></div>
                <!-- Featured Product -->
                <div class="products__featured">
                    ${await this.getFeaturedProduct()}
                </div>
                <div id="feature" class="products__section-divider"></div>
                <!-- Product Grid -->
                ${await this.getAllProducts()}
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
                <input type="text" class="products__search-input" placeholder="Search Devil Fruits...">
            </div>
            <div class="products__category">
                <button class="products__category-btn products__category-btn--active">All</button>
                <button class="products__category-btn">Paramecia</button>
                <button class="products__category-btn">Logia</button>
                <button class="products__category-btn">Zoan</button>
            </div>
        </div>
        `;
    }

    async getTopProducts() {
        return `
        <div class="products__top-picks">
            <div class="products__picks-list">
                ${this.topPicks.map( fruit => `
                <div class="products__pick-item">
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
        return `
        <!-- Featured Product -->
            <img src="./images/devil-fruits/gura-gura.png" alt="${this.feature.name}" class="products__featured-image">
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

    async getAllProducts() {
        return `
        <div class="products__grid">
            <!-- Product Card -->
            ${this.fruits.map(fruit => `
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
        </div>
        `;
    }

    /**
     * 
     */
    getTopSoldFruits() {
        const sortedFruits = this.fruits.sort((a, b) => parseInt(b.sold.replace(',', '')) - parseInt(a.sold.replace(',', '')));
        // Select the top 5 fruits
        return sortedFruits.slice(0, 5);
    }
}
