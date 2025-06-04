import React, { useState } from 'react';
import TableComponent from '../components/TableComponent';
import userSchema from '../schemas/userSchema';
import productSchema from '../schemas/productSchema';
import { useFetch } from '../hooks/network/useFetch';

function TableDemoPage() {
  const [products] = useState([
    { name: 'Laptop', price: 999.99, stock: 5 },
    { name: 'Headphones', price: 49.99, stock: 50 },
    { name: 'Monitor', price: 199.99, stock: 12 },
  ]);

  const [data, setData] = useFetch("https://jsonplaceholder.typicode.com/users");
  const schema = userSchema;

  return (
    <div>
      <h2>User Table</h2>
      <TableComponent data={data} schema={schema} />

      <h2>Product Table</h2>
      <TableComponent data={products} schema={productSchema} />
    </div>
  );
}

export default TableDemoPage;