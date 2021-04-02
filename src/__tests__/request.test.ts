import request from '@code/request';

test('middleware collection exists', () => {
  expect(request).toHaveProperty('_middleware');
});
