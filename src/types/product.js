// /**
//  * @typedef {object} RawProductApiData
//  * @property {string} productId - ID sản phẩm từ API
//  * @property {string} productName - Tên sản phẩm từ API
//  * @property {string} productDescription - Mô tả sản phẩm từ API
//  * @property {number | string} itemPrice - Giá sản phẩm (có thể là số hoặc chuỗi từ JSON)
//  * @property {number | string} quantityInStock - Số lượng trong kho (có thể là số hoặc chuỗi từ JSON)
//  * @property {string} productCategory - Danh mục sản phẩm từ API
//  * @property {string} lastUpdateDate - Ngày cập nhật cuối cùng (ISO string)
//  */

/**
 * @typedef {object} ProductEntity
 * @property {string} id - ID sản phẩm (chuẩn hóa từ productId)
 * @property {string} name - Tên sản phẩm (chuẩn hóa từ productName)
 * @property {string} description - Mô tả sản phẩm (chuẩn hóa từ productDescription)
 * @property {number} price - Giá sản phẩm (đã được parse thành số)
 * @property {number} stock - Số lượng trong kho (đã được parse thành số)
 * @property {string} category - Danh mục sản phẩm (chuẩn hóa từ productCategory)
 * @property {string} lastUpdated - Ngày cập nhật cuối cùng (chuẩn hóa)
 */