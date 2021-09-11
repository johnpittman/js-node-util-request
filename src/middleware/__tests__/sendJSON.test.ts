import fetch from 'isomorphic-fetch';

import sendJSON from '>/middleware/sendJSON';
import request from '>/request';

request.init({ fetch });

describe('sendJSON', () => {
  let contentTypeHeader = 'content-type';

  beforeAll(() => {
    request.init();
    request.use(sendJSON);
  });

  test('returns proper json fetch opts', async () => {
    let result = request._processMiddleware({ fetchInput: '', fetchOpts: { body: true } });

    expect(result.fetchOpts?.headers && result.fetchOpts?.headers[contentTypeHeader]).toBe('application/json');
    expect(typeof result.fetchOpts?.body).toBe('string');
  });

  test('custom content-type', async () => {
    let result = request._processMiddleware({
      fetchInput: '',
      fetchOpts: { headers: { 'content-type': 'text/html' }, body: true }
    });

    expect(result.fetchOpts?.headers && result.fetchOpts?.headers[contentTypeHeader]).toBe('text/html');
    expect(result.fetchOpts?.body).toEqual(true);
  });

  test('does not override when passing FormData', async () => {
    let result = request._processMiddleware({
      fetchInput: '',
      fetchOpts: { body: new FormData() }
    });

    expect(result.fetchOpts?.headers && result.fetchOpts?.headers[contentTypeHeader]).toBeUndefined();
    expect(result.fetchOpts?.body instanceof FormData).toEqual(true);
  });
});
