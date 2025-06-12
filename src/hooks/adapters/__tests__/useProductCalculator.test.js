import { renderHook } from '@testing-library/react-hooks';
import { useProductCalculator } from '../useProductCalculator';

describe('useProductCalculator', () => {
    const mockAdapterFunction = jest.fn();

    const mockProducts = [
        {
            productId: '1',
            productName: 'Product A',
            productDescription: 'Description A',
            itemPrice: '10.00',
            quantityInStock: '5',
            productCategory: 'Category A',
            lastUpdateDate: '2023-06-01T12:00:00Z',
        },
        {
            productId: '2',
            productName: 'Product B',
            productDescription: 'Description B',
            itemPrice: '20.00',
            quantityInStock: '3',
            productCategory: 'Category B',
            lastUpdateDate: '2023-06-02T12:00:00Z',
        },
    ];

    const adaptedProducts = [
        {
            id: '1',
            name: 'Product A',
            description: 'Description A',
            price: 10.0,
            stock: 5,
            category: 'Category A',
            lastUpdated: '6/1/2023, 12:00:00 PM',
        },
        {
            id: '2',
            name: 'Product B',
            description: 'Description B',
            price: 20.0,
            stock: 3,
            category: 'Category B',
            lastUpdated: '6/2/2023, 12:00:00 PM',
        },
    ];

    beforeEach(() => {
        mockAdapterFunction.mockImplementation((rawProduct) => {
            return {
                id: rawProduct.productId,
                name: rawProduct.productName,
                description: rawProduct.productDescription,
                price: parseFloat(rawProduct.itemPrice),
                stock: parseInt(rawProduct.quantityInStock, 10),
                category: rawProduct.productCategory,
                lastUpdated: new Date(rawProduct.lastUpdateDate).toLocaleString('en-US', {
                    hour12: true,
                    timeZone: 'UTC' 
                }),
            };
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should calculate total products, total price, and adapt products correctly', () => {
        const { result } = renderHook(() =>
            useProductCalculator(mockProducts, mockAdapterFunction)
        );

        expect(result.current.totalProducts).toBe(8); // 5 + 3
        expect(result.current.totalPrice).toBe(110.0); // (10 * 5) + (20 * 3)
        expect(result.current.adaptedProducts).toEqual(adaptedProducts);
        expect(mockAdapterFunction).toHaveBeenCalledTimes(2);
        expect(mockAdapterFunction).toHaveBeenCalledWith(mockProducts[0]);
        expect(mockAdapterFunction).toHaveBeenCalledWith(mockProducts[1]);
    });

    it('should return zero totals and an empty array when products is empty', () => {
        const { result } = renderHook(() =>
            useProductCalculator([], mockAdapterFunction)
        );

        expect(result.current.totalProducts).toBe(0);
        expect(result.current.totalPrice).toBe(0);
        expect(result.current.adaptedProducts).toEqual([]);
        expect(mockAdapterFunction).not.toHaveBeenCalled();
    });

    it('should handle null or undefined products gracefully', () => {
        const { result } = renderHook(() =>
            useProductCalculator(null, mockAdapterFunction)
        );

        expect(result.current.totalProducts).toBe(0);
        expect(result.current.totalPrice).toBe(0);
        expect(result.current.adaptedProducts).toEqual([]);
        expect(mockAdapterFunction).not.toHaveBeenCalled();
    });

    it('should recalculate when products change', () => {
        const { result, rerender } = renderHook(
            ({ products }) => useProductCalculator(products, mockAdapterFunction),
            {
                initialProps: { products: mockProducts },
            }
        );

        expect(result.current.totalProducts).toBe(8);
        expect(result.current.totalPrice).toBe(110.0);

        const newProducts = [
            {
                productId: '3',
                productName: 'Product C',
                productDescription: 'Description C',
                itemPrice: '15.00',
                quantityInStock: '4',
                productCategory: 'Category C',
                lastUpdateDate: '2023-06-03T12:00:00Z',
            },
        ];

        rerender({ products: newProducts });

        expect(result.current.totalProducts).toBe(4); // 4
        expect(result.current.totalPrice).toBe(60.0); // 15 * 4
        expect(mockAdapterFunction).toHaveBeenCalledTimes(3); // 2 for initial + 1 for new product
    });
});