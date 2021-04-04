import fetch from 'isomorphic-fetch';
import request from '@code/request';
import query from '@code/middleware/query';

request.init({ fetch });

describe('query', () => {
  beforeAll(() => {
    request.init();
  });

  test('deserializes query object to string', async () => {
    request.use(query);

    let result = request._processMiddleware({
      fetchInput: '',
      userOpts: {
        query: {
          a: 1
        }
      }
    });

    expect(result.fetchInput).toEqual('?a=1');
  });
});
