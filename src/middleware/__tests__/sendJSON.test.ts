import fetch from 'isomorphic-fetch';
import request from '@code/request';
import sendJSON from '@code/middleware/sendJSON';

request.init({ fetch });

describe('sendJSON', () => {
  let contentTypeHeader = 'content-type';

  beforeAll(() => {
    request.init();
  });

  test('returns proper json fetch opts', async () => {
    request.use(sendJSON);

    let result = request._processMiddleware({ fetchInput: '', fetchOpts: { body: true } });

    expect(result.fetchOpts?.headers && result.fetchOpts?.headers[contentTypeHeader]).toBe('application/json');
    expect(typeof result.fetchOpts?.body).toBe('string');
  });

  test('custom content-type', async () => {
    request.use(sendJSON);

    let result = request._processMiddleware({
      fetchInput: '',
      fetchOpts: { headers: { 'content-type': 'text/html' }, body: true }
    });

    expect(result.fetchOpts?.headers && result.fetchOpts?.headers[contentTypeHeader]).toBe('text/html');
    expect(result.fetchOpts?.body).toEqual(true);
  });
});
