import { renderHook, act } from '@testing-library/react';
import { useSortedProducts } from '../useSortedProducts'; // Đảm bảo đường dẫn đúng

describe('useSortedProducts (Factory Pattern Product)', () => {
    const mockProducts = [
        { id: "P001", name: "Banana", price: 10, stock: 2, category: "Fruit" },
        { id: "P002", name: "Apple", price: 20, stock: 3, category: "Fruit" },
        { id: "P003", name: "Orange", price: 15, stock: 1, category: "Fruit" },
        { id: "P004", name: "Cherry", price: 5, stock: 4, category: "Fruit" },
    ];

    it('should sort products by name ascending by default', () => {
        const { result } = renderHook(() => useSortedProducts(mockProducts));
        const sortedNames = result.current.processedData.map(p => p.name);
        expect(sortedNames).toEqual(['Apple', 'Banana', 'Cherry', 'Orange']);
    });

    it('should sort products by name descending when config is updated', () => {
        const { result } = renderHook(() => useSortedProducts(mockProducts));

        act(() => {
            result.current.updateConfig({ direction: 'desc' });
        });

        const sortedNames = result.current.processedData.map(p => p.name);
        expect(sortedNames).toEqual(['Orange', 'Cherry', 'Banana', 'Apple']);
    });

    it('should return empty array if input data is empty', () => {
        const { result } = renderHook(() => useSortedProducts([]));
        expect(result.current.processedData).toEqual([]);
    });

    it('should maintain original order if data is not an array', () => {
        const { result } = renderHook(() => useSortedProducts(null));
        expect(result.current.processedData).toEqual([]); // Should return empty array for non-array input
    });
});