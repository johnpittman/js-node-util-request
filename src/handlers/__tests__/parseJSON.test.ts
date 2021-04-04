import fetch from 'isomorphic-fetch';
import request from '@code/request';
import parseJSON from '@code/handlers/parseJSON';

request.init({ fetch });

describe('parseJSON', () => {
  let url = 'https://api.apis.guru/v2/metrics.json"';

  beforeAll(() => {
    request.init();
  });

  test('returns JSON from request', async () => {
    request.handle(parseJSON);

    let result = await request(url, { headers: { accept: 'application/json' } });

    expect(typeof result).toBe('object');
  });
});
