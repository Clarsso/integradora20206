const { calcularTotal } = require('../utils');

test('calcula correctamente el total', () => {
  expect(calcularTotal(100, 3)).toBe(300);
});

test('retorna 0 si la cantidad es 0', () => {
  expect(calcularTotal(100, 0)).toBe(0);
});