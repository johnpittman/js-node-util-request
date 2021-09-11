import fetch from 'isomorphic-fetch';

import parseJSON from '>/handlers/parseJSON';
import request from '>/request';

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
