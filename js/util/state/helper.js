
// Helper function to format prices
export default class {
    formatPrice(number) {
        return '₿ ' + number.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    }
}