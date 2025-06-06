import React from 'react';
import { useFetch } from '../hooks/network/useFetch';
import { useForm } from '../hooks/form/useForm'; // Composite
import { useProductCalculator } from '../hooks/adapters/useProductCalculator'; // Hook Adapter Pattern
import { useSortedProducts } from '../hooks/data/useSortedProducts'; // Hook Factory Pattern
import { useFilteredProductsByCategory } from '../hooks/data/useFilteredProductsByCategory.js'; // Factory
import { useFilteredProductsByMaxPrice } from '../hooks/data/useFilteredProductsByMaxPrice.js'; // Factory

// Import validators
import { required, minLength, isNumber, isPositive } from '../utils/validators';

const PRODUCTS_JSON_PATH = "https://raw.githubusercontent.com/NguyenChanHung1/React-Custom-Hooks/refs/heads/main/src/data/products.json";

const ProductManagerApp = () => {
    const [managedProducts, setManagedProducts] = useFetch(PRODUCTS_JSON_PATH);

    // Adapter Pattern: lay danh sach duoc adapt voi interface co the giao tiep voi logic + tinh tong
    const { totalProducts, totalPrice, adaptedProducts } = useProductCalculator(managedProducts);

    // Factory Pattern: createDataProcessorHook tao ra cac hook filter va sort
    const { processedData: filteredByCategoryProducts, updateConfig: updateCategoryFilter } =
        useFilteredProductsByCategory(adaptedProducts);

    const { processedData: filteredByPriceProducts, updateConfig: updatePriceFilter } =
        useFilteredProductsByMaxPrice(filteredByCategoryProducts);

    const { processedData: displayedProducts, config: sortConfig, updateConfig: updateSortConfig } =
        useSortedProducts(filteredByPriceProducts); // Đây là danh sách cuối cùng sẽ hiển thị

    // Composition Pattern: useValidation dung nhieu validators 
    const {
        formValues,
        handleChange,
        validate_errors,
        isLoading: isSubmitting,
        submit_error,
        isSuccess,
        handleSubmit,
        resetForm,
        isValid
    } = useForm(
        {
            productId: '',
            productName: '',
            productDescription: '',
            itemPrice: '',
            quantityInStock: '',
            productCategory: '',
        },
        {
            productId: [required, minLength(3)],
            productName: [required, minLength(5)],
            itemPrice: [required, isNumber, isPositive],
            quantityInStock: [required, isNumber, isPositive],
            productCategory: [required],
            productDescription: [required]
        },
        async (newProductRawData) => { // onSubmit handler
            const newProductWithDefaults = {
                ...newProductRawData,
                lastUpdateDate: new Date().toISOString(), // Them last update date
            };

            setManagedProducts(prevProducts => [...prevProducts, newProductWithDefaults]);
            console.log('New product added successfully!');
            resetForm();
            return Promise.resolve({ success: true });
        }
    );

    // Delete product using product ID
    const handleDeleteProduct = (id) => {
        setManagedProducts(prevProducts => prevProducts.filter(p => p.productId !== id)); 
        console.log(`Product with ID ${id} deleted.`);
    };

    // Filter & Sort Handler
    const handleCategoryFilterChange = (e) => {
        updateCategoryFilter({ category: e.target.value });
    };

    const handleMaxPriceFilterChange = (e) => {
        updatePriceFilter({ maxPrice: parseFloat(e.target.value) || Infinity });
    };

    const handleSortChange = (e) => {
        updateSortConfig({ direction: e.target.value });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Product Manager App</h1>

            <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
                <h2>Thống kê sản phẩm</h2>
                <p>Tổng số sản phẩm trong kho: <strong>{totalProducts}</strong></p>
                <p>Tổng giá trị các mặt hàng: <strong>${totalPrice.toFixed(2)}</strong></p>
            </div>

            {/* Filter & Sort */}
            <section style={{ marginBottom: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
                <h2>Bộ lọc & Sắp xếp</h2>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <div>
                        <label htmlFor="categoryFilter" style={{ marginRight: '5px' }}>Lọc theo danh mục:</label>
                        <input
                            type="text"
                            id="categoryFilter"
                            placeholder="e.g., Electronics"
                            onChange={handleCategoryFilterChange}
                            style={{ padding: '8px' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="maxPriceFilter" style={{ marginRight: '5px' }}>Giá tối đa:</label>
                        <input
                            type="number"
                            id="maxPriceFilter"
                            placeholder="e.g., 200"
                            onChange={handleMaxPriceFilterChange}
                            style={{ padding: '8px' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="sortOrder" style={{ marginRight: '5px' }}>Sắp xếp theo tên:</label>
                        <select id="sortOrder" onChange={handleSortChange} value={sortConfig.direction} style={{ padding: '8px' }}>
                            <option value="asc">Tăng dần (A-Z)</option>
                            <option value="desc">Giảm dần (Z-A)</option>
                        </select>
                    </div>
                </div>
            </section>


            {/* Bang hien thi san pham */}
            <section>
                <h2>Danh sách sản phẩm</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Tên sản phẩm</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Giá</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Số lượng</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Danh mục</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Cập nhật cuối</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedProducts.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Không có sản phẩm nào phù hợp.</td>
                            </tr>
                        ) : (
                            displayedProducts.map((product) => ( 
                                <tr
                                    key={product.id}
                                    style={{
                                        // backgroundColor: isRowSelected(product.id) ? '#e0f7fa' : 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.id}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.name}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>${product.price.toFixed(2)}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.stock}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.category}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.lastUpdated}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteProduct(product.id);
                                            }}
                                            style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>

            {/* Form them san pham */}
            <section style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
                <h2>Thêm sản phẩm mới</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="productId" style={{ display: 'block', marginBottom: '5px' }}>Product ID:</label>
                        <input
                            type="text"
                            id="productId"
                            name="productId"
                            value={formValues.productId}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                        {validate_errors.productId && validate_errors.productId.map((err, idx) => <p key={idx} style={{ color: 'red', fontSize: '0.9em' }}>{err}</p>)}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="productName" style={{ display: 'block', marginBottom: '5px' }}>Product Name:</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={formValues.productName}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                        {validate_errors.productName && validate_errors.productName.map((err, idx) => <p key={idx} style={{ color: 'red', fontSize: '0.9em' }}>{err}</p>)}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="itemPrice" style={{ display: 'block', marginBottom: '5px' }}>Price:</label>
                        <input
                            type="number"
                            id="itemPrice"
                            name="itemPrice"
                            value={formValues.itemPrice}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                        {validate_errors.itemPrice && validate_errors.itemPrice.map((err, idx) => <p key={idx} style={{ color: 'red', fontSize: '0.9em' }}>{err}</p>)}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="quantityInStock" style={{ display: 'block', marginBottom: '5px' }}>Quantity In Stock:</label>
                        <input
                            type="number"
                            id="quantityInStock"
                            name="quantityInStock"
                            value={formValues.quantityInStock}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                        {validate_errors.quantityInStock && validate_errors.quantityInStock.map((err, idx) => <p key={idx} style={{ color: 'red', fontSize: '0.9em' }}>{err}</p>)}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="productCategory" style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
                        <input
                            type="text"
                            id="productCategory"
                            name="productCategory"
                            value={formValues.productCategory}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                        {validate_errors.productCategory && validate_errors.productCategory.map((err, idx) => <p key={idx} style={{ color: 'red', fontSize: '0.9em' }}>{err}</p>)}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="productDescription" style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
                        <textarea
                            id="productDescription"
                            name="productDescription"
                            value={formValues.productDescription}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        ></textarea>
                        {validate_errors.productDescription && validate_errors.productDescription.map((err, idx) => <p key={idx} style={{ color: 'red', fontSize: '0.9em' }}>{err}</p>)}
                    </div>

                    <button type="submit" disabled={isSubmitting || !isValid}
                        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>
                        {isSubmitting ? 'Đang thêm...' : 'Thêm sản phẩm'}
                    </button>
                    <button type="button" onClick={resetForm}
                        style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Reset Form
                    </button>

                    {submit_error && <p style={{ color: 'red' }}>Lỗi khi thêm sản phẩm: {submit_error.message}</p>}
                    {isSuccess && <p style={{ color: 'green' }}>Sản phẩm đã được thêm thành công!</p>}
                </form>
            </section>
        </div>
    );
};

export default ProductManagerApp;