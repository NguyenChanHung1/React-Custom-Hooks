import { useMemo } from 'react';
/** @typedef {import('../../types/product').ProductEntity} ProductEntity*/

export const adaptProductForCalculation = (rawProduct) => {
    return {
        id: rawProduct.productId,
        name: rawProduct.productName, 
        description: rawProduct.productDescription, 
        price: parseFloat(rawProduct.itemPrice), 
        stock: parseInt(rawProduct.quantityInStock, 10), 
        category: rawProduct.productCategory, 
        lastUpdated: new Date(rawProduct.lastUpdateDate).toLocaleString(), 
    };
};

export const useProductCalculator = (products, adapterFunction) => {
    // Sử dụng useMemo để chỉ tính toán lại khi products thay đổi
    const { totalProducts, totalPrice, adaptedProducts } = useMemo(() => {
        let sumProducts = 0;
        let sumPrice = 0;
        const adaptedList = [];

        if (Array.isArray(products)) {
            products.forEach(rawProduct => {
                const adaptedProduct = adapterFunction(rawProduct); 
                adaptedList.push(adaptedProduct); 

                
                sumProducts += adaptedProduct.stock;
                sumPrice += adaptedProduct.price * adaptedProduct.stock;
            });
        }

        return {
            totalProducts: sumProducts,
            totalPrice: sumPrice,
            adaptedProducts: adaptedList, 
        };
    }, [products, adapterFunction]); // tinh lai price va tong san pham khi mang products thay doi

    return { totalProducts, totalPrice, adaptedProducts };
};