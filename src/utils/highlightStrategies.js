export const highlightLowStock = (product, { threshold }) => {
    if(!threshold || isNaN(threshold)) {
        return false; 
    }
    return product.stock <= threshold;
};

export const highlightHighPrice = (product, { minPrice }) => {
    if(!minPrice || isNaN(minPrice)) {
        return false; 
    }
    return product.price >= minPrice;
};

export const highlightCategory = (product, { category }) => {
    if(!category || typeof category !== 'string') {
        return false; 
    }
    return product.category.toLowerCase().includes(category.toLowerCase());
};