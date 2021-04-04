import fetch from 'isomorphic-fetch';
import request from '@code/request';
import jsonParser from '@code/handlers/jsonParser';

request.init({ fetch });

describe('jsonParser', () => {
  let url = 'https://api.apis.guru/v2/metrics.json"';

  beforeAll(() => {
    request.init();
  });

  test('returns JSON from request', async () => {
    request.handle(jsonParser);

    let result = await request(url, { headers: { accept: 'application/json' } });

    expect(typeof result).toBe('object');
  });
});
