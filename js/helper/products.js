import ProductView from "../views/product.js";
import { state, mutations, getters, actions } from '../util/state.js';

export default class ProductHelper extends ProductView {
    constructor() {
        super();
    }

    async bindAll() {
        await this.renderTopProducts('top-products');
        this.bindFilterEvents();
    }

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
    }

    filterFruits(searchTerm = '') {
        this.filteredFruits = state.products.filter(fruit => {
            const matchesType = this.currentFilter === 'All' ||
                (fruit.type === this.currentFilter ||
                    (this.currentFilter === 'Zoan' && (fruit.type === 'Zoan' || fruit.type === 'Mythical Zoan')));
            const matchesSearch = fruit.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesType && matchesSearch;
        });
        this.topPicks = this.getTopSoldFruits();
        this.setFeaturedProduct(null); // Reset the featured product after filtering
        this.render();
    }

    async render() {
        const container = document.getElementById('products');
        if (container) {
            container.innerHTML = await this.getAllProducts();
        }
        await this.renderTopProducts('top-products');
    }

    updateActiveCategory(activeButton) {
        const buttons = document.querySelectorAll('.products__category-btn');
        buttons.forEach(button => {
            button.classList.remove('products__category-btn--active');
        });
        activeButton.classList.add('products__category-btn--active');
    }

    async renderTopProducts(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = await this.getTopProducts();

            // Add event listeners to each pick item
            container.querySelectorAll('.products__pick-item').forEach(item => {
                item.addEventListener('click', (event) => {
                    const fruitId = parseInt(item.getAttribute('data-fruit-id'), 10);
                    this.handlePickClick(fruitId);
                });
            });
        }
    }

    handlePickClick(fruitId) {
        // Find the selected fruit from topPicks
        const selectedFruit = this.topPicks.find(fruit => fruit.id === fruitId);
        if (selectedFruit) {
            // Check if the selected fruit is already the featured product
            if (this.feature && this.feature.id === selectedFruit.id) {
                // If clicked twice, clear the featured product
                this.setFeaturedProduct(null);
            } else {
                // Set the feature data and update the featured product display
                this.setFeaturedProduct(selectedFruit);
            }
        }
    }

    async setFeaturedProduct(feature) {
        this.feature = feature; // Set the featured product
        const featureContainer = document.getElementById('feature');
        if (featureContainer) {
            if (this.feature) {
                featureContainer.style.display = 'grid';
                featureContainer.innerHTML = await this.getFeaturedProduct();
            } else{
                featureContainer.style.display = 'none';
            }
        }
    }

}