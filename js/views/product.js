import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    topPicks = [
        {
            name: 'Gura Gura no Mi',
            image: './images/devil-fruits/gura-gura.png'
        }
    ];

    fruits = [
        {
            "id": 1,
            "name": "Gur Gura no Mi",
            "image1": "./images/devil-fruits/gura-gura.png",
            "image2": "./images/characters/whitebeard.jpg",
            "price": "₿ 5,000,000",
            "sold": "1,234",
            "type": "Paramecia"
        },
        {
            "id": 2,
            "name": "Mera Mera no Mi",
            "image1": "./images/devil-fruits/mera-mera.png",
            "image2": "./images/characters/ace.jpg",
            "price": "₿ 5,500,000",
            "sold": "834",
            "type": "Logia"
        },
        {
            "id": 4,
            "name": "Hie Hie no Mi",
            "image1": "./images/devil-fruits/hie-hie.png",
            "image2": "./images/characters/ao-kiji.jpg",
            "price": "₿ 4,500,000",
            "sold": "720",
            "type": "Logia"
        },
        {
            "id": 5,
            "name": "Tori Tori no Mi, Model: Phoenix",
            "image1": "./images/devil-fruits/tori-tori.png",
            "image2": "./images/characters/marco.jpg",
            "price": "₿ 4,900,000",
            "sold": "732",
            "type": "Mythical Zoan"
        },
        {
            "id": 6,
            "name": "Ope Ope no Mi",
            "image1": "./images/devil-fruits/ope-ope.png",
            "image2": "./images/characters/law.jpg",
            "price": "₿ 4,800,000",
            "sold": "734",
            "type": "Paramecia"
        },
        {
            "id": 7,
            "name": "Magu Magu no Mi",
            "image1": "./images/devil-fruits/magu-magu.png",
            "image2": "./images/characters/akainu.jpg",
            "price": "₿ 4,700,000",
            "sold": "734",
            "type": "Logia"
        },
        {
            "id": 8,
            "name": "Yami Yami no Mi",
            "image1": "./images/devil-fruits/yami-yami.png",
            "image2": "./images/characters/blackbeard.jpg",
            "price": "₿ 5,200,000",
            "sold": "800",
            "type": "Logia"
        },
        {
            "id": 9,
            "name": "Goro Goro no Mi",
            "image1": "./images/devil-fruits/goro-goro.png",
            "image2": "./images/characters/eneru.jpg",
            "price": "₿ 4,600,000",
            "sold": "740",
            "type": "Logia"
        },
        {
            "id": 10,
            "name": "Zushi Zushi no Mi",
            "image1": "./images/devil-fruits/zushi-zushi.png",
            "image2": "./images/characters/fujitora.jpg",
            "price": "₿ 4,800,000",
            "sold": "734",
            "type": "Paramecia"
        },
        {
            "id": 11,
            "name": "Pika Pika no Mi",
            "image1": "./images/devil-fruits/pika-pika.png",
            "image2": "./images/characters/kizaru.jpg",
            "price": "₿ 5,100,000",
            "sold": "833",
            "type": "Logia"
        }
    ]

    constructor() {
        super();
        this.setTitle('DFCO | Products');
    }

    async getHtml() {
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

    async getFeaturedProduct() {
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
                        <div class="products__stat-number">5</div>
                        <div class="products__stat-label">In Stock</div>
                    </div>
                </div>
                <button class="products__add-btn">Add to Cart</button>
            </div>
        </div>
        `;
    }

    async getAllProducts() {
        return `
        <div class="products__grid">
            <!-- Product Card -->
            ${this.fruits.map( fruit =>`
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
}
