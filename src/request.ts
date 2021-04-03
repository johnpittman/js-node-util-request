export type Fetch = (fetchInput: RequestInfo, fetchOpts?: RequestInit) => Promise<Response>;
/**
 * External options that allow the user to interaction with integrated features, middleware, and handlers.
 */
export interface UserOpts {
  [key: string]: any;
  abortable?: boolean;
}
export interface RequestMiddlewareParams {
  fetchInput: RequestInfo;
  fetchOpts?: RequestInit;
  userOpts?: UserOpts;
}
export interface RequestHandlerParams {
  fetchResponse: Response;
  fetchInput: RequestInfo;
  fetchOpts?: RequestInit;
  userOpts?: UserOpts;
  result?: any;
}
export type RequestMiddleware = (params: RequestMiddlewareParams) => RequestMiddlewareParams;
export type RequestHandler = (params: RequestHandlerParams) => RequestHandlerParams | Promise<RequestHandlerParams>;
export interface AbortablePromise<T> extends Promise<T> {
  abort: () => void;
}

export default function request(fetchInput: RequestInfo, fetchOpts?: RequestInit, userOpts?: UserOpts) {
  // Override global opts with user input if passed by user
  let allUserOpts = userOpts
    ? {
        ...request._userOpts,
        ...userOpts
      }
    : request._userOpts;

  // Run middleware
  let middelwareResult = request._processMiddleware({
    fetchInput,
    fetchOpts,
    userOpts: allUserOpts
  });

  // Enable abort controller
  // Create fetch opts in none exist
  let abortController = null;
  if (middelwareResult.userOpts.abortable == true) {
    abortController = new AbortController();

    if (!fetchOpts) {
      fetchOpts = {};
    }

    fetchOpts.signal = abortController.signal;
  }

  // Initial fetch
  // Typescript workaround of using '.then' to add abort property to promise.
  // Manually execute the Promise to avoid making 'request' an async function.
  let resultPromise = request
    ._fetch(middelwareResult.fetchInput, middelwareResult.fetchOpts)
    .then(async (fetchResponse) => {
      // Run handlers
      let handlersResponse = await request._processHandlers({
        ...middelwareResult,
        fetchResponse
      });

      return handlersResponse;
    }) as AbortablePromise<any>;

  // Add abort controller to final promise to be accessed by user.
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

/**
 * Set fetch if it's not native in nodejs
 * Polyfill: https://www.npmjs.com/package/node-fetch
 */
request.init = (params?: { fetch?: Fetch; opts?: UserOpts }) => {
  request._middleware = [];
  request._handlers = [];
  request._userOpts = params?.opts ? params.opts : {};

  if (params?.fetch) {
    request._fetch = params.fetch;
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
