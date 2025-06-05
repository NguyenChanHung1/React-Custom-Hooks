import { useMemo } from 'react';
/** @typedef {import('../../types/product').ProductEntity} ProductEntity*/

const adaptProductForCalculation = (rawProduct) => {
    return {
        id: rawProduct.productId, // Đổi tên `productId` thành `id`
        name: rawProduct.productName, // Đổi tên `productName` thành `name`
        description: rawProduct.productDescription, // Đổi tên `productDescription` thành `description`
        price: parseFloat(rawProduct.itemPrice), // Chuyển đổi sang số thực
        stock: parseInt(rawProduct.quantityInStock, 10), // Chuyển đổi sang số nguyên
        category: rawProduct.productCategory, // Đổi tên `productCategory` thành `category`
        lastUpdated: new Date(rawProduct.lastUpdateDate).toLocaleString(), // Đổi tên và format
    };
};

export const useProductCalculator = (products) => {
    // Sử dụng useMemo để chỉ tính toán lại khi products thay đổi
    const { totalProducts, totalPrice, adaptedProducts } = useMemo(() => {
        let sumProducts = 0;
        let sumPrice = 0;
        const adaptedList = [];

        if (Array.isArray(products)) {
            products.forEach(rawProduct => {
                const adaptedProduct = adaptProductForCalculation(rawProduct); // Áp dụng adapter
                adaptedList.push(adaptedProduct); // Lưu sản phẩm đã được adapted

                // Thực hiện tính toán trên dữ liệu đã được adapted
                sumProducts += adaptedProduct.stock;
                sumPrice += adaptedProduct.price * adaptedProduct.stock;
            });
        }

        return {
            totalProducts: sumProducts,
            totalPrice: sumPrice,
            adaptedProducts: adaptedList, // Trả về danh sách đã được adapted
        };
    }, [products]); // tinh lai price va tong san pham khi mang products thay doi

    return { totalProducts, totalPrice, adaptedProducts };
};