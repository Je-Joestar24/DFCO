import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('DFCO | Products');
    }

    async getHtml(){
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
                ${await this.getFeaturedProduct()}

                <div class="products__section-divider"></div>
                <!-- Product Grid -->
                ${await this.getAllProducts()}
                <div class="products__section-divider"></div>
            </div>
        </section>
        `;
    }

    async getFilter(){
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

    async getTopProducts(){
        return `
        <div class="products__top-picks">
            <div class="products__picks-list">
                <div class="products__pick-item">
                    <div class="products__pick-circle">
                        <img src="./images/devil-fruits/gura-gura.png" alt="Gura Gura no Mi" class="products__pick-image">
                    </div>
                    <span class="products__pick-name">Gura Gura</span>
                </div>
                <!-- Add more pick items as needed -->
            </div>
        </div>
        `;
    }

    async getFeaturedProduct(){
        return `
        <!-- Featured Product -->
        <div class="products__featured">
            <img src="./images/devil-fruits/gura-gura.png" alt="Gura Gura no Mi" class="products__featured-image">
            <div class="products__featured-content">
                <h2 class="products__featured-title">Gura Gura no Mi</h2>
                <div class="products__featured-stats">
                    <div class="products__stat">
                        <div class="products__stat-number">1,234</div>
                        <div class="products__stat-label">Sold</div>
                    </div>
                    <div class="products__stat">
                        <div class="products__stat-number">89%</div>
                        <div class="products__stat-label">Mastery Rate</div>
                    </div>
                    <div class="products__stat">
                        <div class="products__stat-number">5</div>
                        <div class="products__stat-label">In Stock</div>
                    </div>
                </div>
                <button class="products__add-btn">Add to Cart</button>
            </div>
        </div>
        `;
    }

    async getAllProducts(){
        return `
        <div class="products__grid">
            <!-- Product Card -->
            <article class="products__card">
                <div class="products__image-wrapper">
                    <img src="./images/devil-fruits/gura-gura.png" alt="Gura Gura no Mi" class="products__image products__image-primary">
                    <img src="./images/characters/whitebeard.jpg" alt="Gura Gura no Mi" class="products__image products__image-secondary">
                    <span class="products__tag">Paramecia</span>
                </div>
                <div class="products__info">
                    <h3 class="products__name">Gura Gura no Mi</h3>
                    <p class="products__price">₿ 5,000,000</p>
                    <button class="products__add-btn">Add to Cart</button>
                </div>
            </article>
            <!-- Repeat for other products -->
        </div>
        `;
    }
}
