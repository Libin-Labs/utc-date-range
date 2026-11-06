import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('includes both endpoints', () => {
  assert.deepEqual(api.dateRange('2024-01-01', '2024-01-03'), [
    '2024-01-01',
    '2024-01-02',
    '2024-01-03',
  ]);
});
test('handles single-day range', () => {
  assert.deepEqual(api.dateRange('2024-04-04', '2024-04-04'), ['2024-04-04']);
});
test('crosses leap day', () => {
  assert.deepEqual(api.dateRange('2024-02-28', '2024-03-01'), [
    '2024-02-28',
    '2024-02-29',
    '2024-03-01',
  ]);
});
test('crosses year boundary', () => {
  assert.deepEqual(api.dateRange('2023-12-31', '2024-01-01'), ['2023-12-31', '2024-01-01']);
});
test('returns chronological values', () => {
  assert.ok(api.dateRange('2024-01-01', '2024-01-05')[0] < '2024-01-05');
});
test('rejects reversed range', () => {
  assert.throws(() => api.dateRange('2024-02-01', '2024-01-01'), RangeError);
});
