import React, { useState } from 'react';
import { useProductHighlight } from '../hooks/ui/form/useProductHighlight';
import { highlightLowStock, highlightHighPrice, highlightCategory } from '../utils/highlightStrategies';

const strategies = {
  lowStock: { fn: highlightLowStock, config: { threshold: 10 } },
  highPrice: { fn: highlightHighPrice, config: { minPrice: 100 } },
  category: { fn: highlightCategory, config: { category: 'Electronics' } },
};

export default function ProductTable({ products }) {
  const [selected, setSelected] = useState('lowStock');
  const [highlightedProducts,, setHighlightConfig] = useProductHighlight(
    products,
    strategies[selected].fn,
    strategies[selected].config
  );

  const handleChange = e => {
    const value = e.target.value;
    setSelected(value);
    setHighlightConfig({
      strategy: strategies[value].fn,
      config: strategies[value].config,
    });
  };

  return (
    <div>
      <select aria-label="highlight" value={selected} onChange={handleChange}>
        <option value="lowStock">Kho còn ít sản phẩm</option>
        <option value="highPrice">Giá cao</option>
        <option value="category">Theo loại sản phẩm</option>
      </select>
      <table>
        <tbody>
          {highlightedProducts.map((p) => (
            <tr key={p.id} style={{ backgroundColor: p.isHighlighted ? '#ffeb3b' : 'white' }}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>{p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}