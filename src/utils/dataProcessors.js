/** @typedef {import('../types/product').ProductEntity} ProductEntity */

export const sortProductsByName = (products, config = { direction: 'asc' }) => {
    const sorted = [...products].sort((a, b) => {
        if (a.name < b.name) return config.direction === 'asc' ? -1 : 1;
        if (a.name > b.name) return config.direction === 'asc' ? 1 : -1;
        return 0; 
    });
    return sorted;
};

export const filterProductsByCategory = (products, config = { category: '' }) => {
    if (!config.category) {
        return products; 
    }
    return products.filter(product =>
        product.category.toLowerCase().includes(config.category.toLowerCase())
    );
};

export const filterProductsByMaxPrice = (products, config = { maxPrice: Infinity }) => {
    if (config.maxPrice === Infinity || isNaN(config.maxPrice) || config.maxPrice <= 0) {
        return products;
    }
    return products.filter(product => product.price <= config.maxPrice);
};