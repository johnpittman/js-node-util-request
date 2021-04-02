import request from '@code/request';

test('_middleware collection exists', () => {
  expect(request).toHaveProperty('_middleware');
});

test('_fetch reference exists', async () => {
  expect(request).toHaveProperty('_fetch');
});
