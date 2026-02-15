import products from './products';

test('products export is an array of product objects', () => {
  expect(Array.isArray(products)).toBe(true);
  expect(products.length).toBeGreaterThan(0);
  const p = products[0];
  expect(p).toBeDefined();
  expect(p).toHaveProperty('id');
  expect(p).toHaveProperty('name');
  expect(p).toHaveProperty('price');
  expect(typeof p.price).toBe('number');
  expect(p).toHaveProperty('inStock');
  expect(p).toHaveProperty('image');
  expect(p).toHaveProperty('description');
});
