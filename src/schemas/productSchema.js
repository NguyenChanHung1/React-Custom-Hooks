const productSchema = [
  { key: 'name', label: 'Product Name' },
  { key: 'price', label: 'Price ($)', render: (val) => `$${val.toFixed(2)}` },
  { key: 'stock', label: 'Stock' },
];

export default productSchema;