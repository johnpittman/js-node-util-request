export type Fetch = (fetchInput: RequestInfo, fetchOpts?: RequestInit) => Promise<Response>;
/**
 * External options that allow the user to interaction with integrated features, middleware, and handlers.
 */
export interface RequestOpts {
  [key: string]: any;
  abortable?: boolean;
}
export interface RequestMiddlewareParams {
  fetchInput: RequestInfo;
  fetchOpts?: RequestInit;
  requestOpts?: RequestOpts;
}
export interface RequestHandlerParams {
  fetchResponse: Response;
  fetchInput: RequestInfo;
  fetchOpts?: RequestInit;
  requestOpts?: RequestOpts;
  result?: any;
}
export type RequestMiddleware = (params: RequestMiddlewareParams) => RequestMiddlewareParams;
export type RequestHandler = (params: RequestHandlerParams) => RequestHandlerParams | Promise<RequestHandlerParams>;
export interface AbortablePromise<T> extends Promise<T> {
  abort: () => void;
}

export default function request(fetchInput: RequestInfo, fetchOpts: RequestInit = {}, requestOpts?: RequestOpts) {
  const middelwareResult = request._processMiddleware({
    fetchInput,
    fetchOpts,
    requestOpts
  });

  // Enable abortable from response.
  let abortController = null;
  if (request._userOpts.abortable || requestOpts?.abortable) {
    abortController = new AbortController();
    fetchOpts.signal = abortController.signal;
  }

  // Typescript workaround to add abort property to promise.
  // Manually execute the Promise to avoid making 'request' an async function.
  const resultPromise = request
    ._fetch(middelwareResult.fetchInput, middelwareResult.fetchOpts)
    .then(async (fetchResponse) => {
      const handlersResponse = await request._processHandlers({
        ...middelwareResult,
        fetchResponse
      });

      return handlersResponse;
    }) as AbortablePromise<any>;

  if (abortController) {
    resultPromise.abort = () => {
      abortController.abort();
    };
  }

  return resultPromise;
}

request._fetch = typeof fetch === 'object' ? fetch : null;
request._userOpts = null;
request._middleware = null;
request._handlers = null;

request.init = (params?: { fetch?: Fetch; opts?: RequestOpts }) => {
  request._middleware = [];
  request._handlers = [];

  /**
   * Set fetch if browser or if it's finlly native in nodejs
   * Polyfill: https://www.npmjs.com/package/node-fetch
   */
  if (params?.fetch) {
    request._fetch = params.fetch;
  }

  if (params?.opts) {
    request._userOpts = params.opts;
  }
};

/**
 * Pipe fetch information through middleware
 */
request._processMiddleware = function (params: RequestMiddlewareParams): RequestMiddlewareParams {
  let index = request._middleware.length;
  let currValue = params;

  while (--index >= 0) {
    let middleware = request._middleware[index];
    currValue = middleware(currValue);
  }

  return currValue;
};

/**
 * Pipe fetch response and information through middleware
 */
request._processHandlers = async function (params: RequestHandlerParams): Promise<any> {
  let result = params.fetchResponse;

  let index = -1;
  let len = request._handlers.length;
  let resultParams = params;

  while (++index < len) {
    let handler = request._handlers[index];
    resultParams = await handler(resultParams);
  }

  result = resultParams.result;

  return result;
};

// Insert middleware
request.use = function (middleware: RequestMiddleware) {
  request._middleware.push(middleware);
};

// Insert response handler
request.handle = function (handler: RequestHandler) {
  request._handlers.push(handler);
};

request.init();
