import fetch from 'isomorphic-fetch';

import request, { RequestHandlerParams, RequestMiddlewareParams } from '>/request';

request.init({ fetch });

describe('request', () => {
  let url = 'https://www.google.com';
  let middleware = (params: RequestMiddlewareParams) => {
    return params;
  };
  let handler = (params: RequestHandlerParams) => {
    return params;
  };
  let errorHandler = () => {
    return 'error';
  };

  beforeAll(() => {
    request.init();
  });

  // test('abortable', async () => {
  //   request.init({
  //     opts: {
  //       abortable: true
  //     }
  //   });

  //   try {
  //     let res = request(url);
  //     res.abort();
  //     await res;
  //   } catch (err) {
  //     expect(err.type).toEqual('aborted');
  //   }
  // });

  describe('.init', () => {
    beforeAll(() => {
      request.init();
    });

    test('set options', () => {
      let obj = {};
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

  describe('.handleError', () => {
    beforeAll(() => {
      request.init();
      request.handleError(errorHandler);
    });

    test('adds error handler', () => {
      expect(typeof request._errorHandler).toEqual('function');
    });
  });

  describe('.__processMiddleware', () => {
    beforeAll(() => {
      request.init();
    });

    test('returns altered result', () => {
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

    beforeAll(() => {
      request.init();
      request.handle(handler);
      request.handle(handler2);
    });

    test('returns result in order', async () => {
      let params = { fetchResponse: new Response(), fetchInput: url, result: '' };
      let result = await request._processHandlers(params);

      expect(result).toEqual('ab');
    });
  });

  describe('._requestErrors', () => {
    beforeAll(() => {
      request.init();
      request.handleError(errorHandler);
    });

    test('returns', async () => {
      try {
        await request._requestErrors('');
      } catch (err) {
        expect(err).toEqual('error');
      }
    });
  });
});
