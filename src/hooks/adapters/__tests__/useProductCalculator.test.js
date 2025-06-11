import { renderHook } from '@testing-library/react';
import { adaptProductForCalculation, useProductCalculator } from '../useProductCalculator';

describe('useProductCalculator (Adapter Pattern)', () => {
    const mockRawProducts = [
        {
            productId: "P001",
            productName: "Laptop XYZ",
            productDescription: "Powerful laptop for professionals.",
            itemPrice: 1200.0,
            quantityInStock: 5,
            productCategory: "Electronics",
            lastUpdateDate: "2024-01-15T10:00:00Z"
        },
        {
            productId: "P002",
            productName: "Mouse Wireless",
            productDescription: "Ergonomic wireless mouse.",
            itemPrice: "25.50", // Test string price
            quantityInStock: "10", // Test string quantity
            productCategory: "Accessories",
            lastUpdateDate: "2024-02-20T11:30:00Z"
        },
        {
            productId: "P003",
            productName: "Keyboard Mechanical",
            productDescription: "RGB mechanical keyboard.",
            itemPrice: 75,
            quantityInStock: 0, // Test zero quantity
            productCategory: "Accessories",
            lastUpdateDate: "2024-03-01T09:00:00Z"
        }
    ];

    it('should correctly adapt raw product data to ProductEntity format', () => {
        const { result } = renderHook(() => useProductCalculator(mockRawProducts, adaptProductForCalculation));
        const adaptedProducts = result.current.adaptedProducts;

        expect(adaptedProducts).toHaveLength(mockRawProducts.length);

        // Verify first adapted product
        expect(adaptedProducts[0].id).toBe('P001');
        expect(adaptedProducts[0].name).toBe('Laptop XYZ');
        expect(adaptedProducts[0].description).toBe('Powerful laptop for professionals.');
        expect(adaptedProducts[0].price).toBe(1200.0); // Should be number
        expect(adaptedProducts[0].stock).toBe(5);    // Should be number
        expect(adaptedProducts[0].category).toBe('Electronics');
        // expect(adaptedProducts[0].lastUpdated).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (AM|PM)/); // Check format

        // Verify second adapted product (from string to number)
        expect(adaptedProducts[1].id).toBe('P002');
        expect(adaptedProducts[1].price).toBe(25.50);
        expect(adaptedProducts[1].stock).toBe(10);
    });

    it('should calculate total products and total price correctly based on adapted data', () => {
        const { result } = renderHook(() => useProductCalculator(mockRawProducts, adaptProductForCalculation));

        // Total products: 5 (Laptop) + 10 (Mouse) + 0 (Keyboard) = 15
        expect(result.current.totalProducts).toBe(15);

        // Total price: (1200 * 5) + (25.50 * 10) + (75 * 0) = 6000 + 255 + 0 = 6255
        expect(result.current.totalPrice).toBe(6255.00);
    });

    it('should handle empty product array gracefully', () => {
        const { result } = renderHook(() => useProductCalculator([]));

        expect(result.current.totalProducts).toBe(0);
        expect(result.current.totalPrice).toBe(0);
        expect(result.current.adaptedProducts).toHaveLength(0);
    });

    it('should handle null or undefined input', () => {
        const { result } = renderHook(() => useProductCalculator(null));
        expect(result.current.totalProducts).toBe(0);
        expect(result.current.totalPrice).toBe(0);
        expect(result.current.adaptedProducts).toHaveLength(0);

        const { result: undefinedResult } = renderHook(() => useProductCalculator(undefined));
        expect(undefinedResult.current.totalProducts).toBe(0);
        expect(undefinedResult.current.totalPrice).toBe(0);
        expect(undefinedResult.current.adaptedProducts).toHaveLength(0);
    });
});