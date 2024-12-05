import ProductView from "../views/product.js";
import { state, mutations, getters, actions } from '../util/state.js';

export default class ProductHelper extends ProductView {
    constructor() {
        super();
        this.currentSort = ''; // Track current sort state
    }

    async bindAll() {
        await this.renderTopProducts('top-products');
        this.bindFilterEvents();
        this.bindSortEvents(); // Add sort binding
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

        // Add sort handlers
        const sortSelects = document.querySelectorAll('.products__sort-select');
        sortSelects.forEach(select => {
            select.addEventListener('change', () => {
                this.sortFruits(select.value);
            });
        });
    }

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

    clearActiveTopPicks() {
        const click_handlers = document.querySelectorAll('.products__pick-item');
        click_handlers.forEach(item => {
            item.classList.remove('products__picked-item--active');
        });
    }

    async render() {
        const container = document.getElementById('products');
        if (container) {
            container.innerHTML = await this.getAllProducts();
        }
        await this.renderTopProducts('top-products');
        this.clearActiveTopPicks();
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

    sortProducts() {
        if (!this.currentSort) return;

        this.filteredFruits.sort((a, b) => {
            switch(this.currentSort) {
                case 'sold-high':
                    return parseInt(b.sold.replace(',', '')) - parseInt(a.sold.replace(',', ''));
                case 'sold-low':
                    return parseInt(a.sold.replace(',', '')) - parseInt(b.sold.replace(',', ''));
                case 'stock-high':
                    return parseInt(b.stock) - parseInt(a.stock);
                case 'stock-low':
                    return parseInt(a.stock) - parseInt(b.stock);
                default:
                    return 0;
            }
        });

        // Clear active classes from top picks

        // Update display
        this.render();
    }

}