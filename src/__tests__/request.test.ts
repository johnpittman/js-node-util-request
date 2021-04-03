import fetch from 'node-fetch';
import request, { RequestMiddlewareParams, RequestHandlerParams } from '@code/request';

request.init({ fetch });

describe('request', () => {
  const url = 'https://www.google.com';
  const middleware = (params: RequestMiddlewareParams) => {
    return params;
  };
  const handler = (params: RequestHandlerParams) => {
    return params;
  };

  beforeAll(() => {
    request.init();
  });

  test('abortable', async () => {
    request.init({
      opts: {
        abortable: true
      }
    });

    try {
      const res = request(url);
      res.abort();
      await res;
    } catch (err) {
      expect(err.type).toEqual('aborted');
    }
  });

  describe('.init', () => {
    beforeAll(() => {
      request.init();
    });

    test('init requestOpts', () => {
      const obj = {};
      request.init({ opts: obj });
      expect(request._userOpts).toBe(obj);
    });
  });

  describe('.use', () => {
    beforeAll(() => {
      request.init();
    });

    test('adds middleware', () => {
      request.use(middleware);
      expect(request._middleware.length).toEqual(1);
    });
  });

  describe('.handle', () => {
    beforeAll(() => {
      request.init();
    });

    test('adds handler', () => {
      request.handle(handler);
      expect(request._handlers.length).toEqual(1);
    });
  });

  describe('.__processMiddleware', () => {
    test('returns result', () => {
      let params = { fetchInput: url };
      request.use((params: RequestMiddlewareParams) => {
        params.fetchInput = '1';
        return params;
      });
      let result = request._processMiddleware(params);

      expect(result.fetchInput).toEqual('1');
    });
  });

  describe('.__processHandlers', () => {
    test('returns result', async () => {
      let params = { fetchResponse: null, fetchInput: url, result: '' };
      let handler = async (params: RequestHandlerParams) => {
        let result = await new Promise((res) => {
          params.result += 'a';
          res(params);
        });

        return result as Promise<RequestHandlerParams>;
      };

      let handler2 = async (params: RequestHandlerParams) => {
        let result = await new Promise((res) => {
          params.result += 'b';
          res(params);
        });

        return result as Promise<RequestHandlerParams>;
      };

      request.handle(handler);
      request.handle(handler2);

      let result = await request._processHandlers(params);

      expect(result).toEqual('ab');
    });
  });
});
