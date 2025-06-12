import { render, screen, fireEvent } from '@testing-library/react';
import ProductTable from '../../../../components/ProductTable';

const products = [
  { id: '1', name: 'A', price: 50, stock: 2, category: 'Electronics' },
  { id: '2', name: 'B', price: 200, stock: 20, category: 'Books' },
];

it('should highlight products with stock quantity lower han lowStock', () => {
  render(<ProductTable products={products} />);
  const rows = screen.getAllByRole('row');
  expect(rows[0]).toHaveStyle('background-color: #ffeb3b');
  expect(rows[1]).not.toHaveStyle('background-color: #ffeb3b');
});

it('should highlight products with price higher than highPrice', () => {
  render(<ProductTable products={products} />);
  fireEvent.change(screen.getByLabelText('highlight'), { target: { value: 'highPrice' } });
  const rows = screen.getAllByRole('row');
  expect(rows[1]).toHaveStyle('background-color: #ffeb3b');
  expect(rows[0]).not.toHaveStyle('background-color: #ffeb3b');
});

it('should highlight based on category chosen', () => {
  render(<ProductTable products={products} />);
  fireEvent.change(screen.getByLabelText('highlight'), { target: { value: 'category' } });
  const rows = screen.getAllByRole('row');
  expect(rows[0]).toHaveStyle('background-color: #ffeb3b');
  expect(rows[1]).not.toHaveStyle('background-color: #ffeb3b');
});