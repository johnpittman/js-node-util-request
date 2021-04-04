export type Fetch = (fetchInput: RequestInfo, fetchOpts?: RequestInit) => Promise<Response>;
/**
 * External options that allow the user to interaction with integrated features, middleware, and handlers.
 */
export interface UserOpts {
  readonly [key: string]: any;
  readonly abortable?: boolean;
}
export interface RequestFetchOpts extends RequestInit {
  body?: any;
}
export interface RequestMiddlewareParams {
  fetchInput: RequestInfo;
  fetchOpts?: RequestFetchOpts;
  userOpts?: UserOpts;
}
export interface RequestHandlerParams {
  fetchResponse: Response;
  userOpts?: UserOpts;
  result?: any;
}
export type RequestMiddleware = (params: RequestMiddlewareParams) => RequestMiddlewareParams;
export type RequestHandler = (params: RequestHandlerParams) => RequestHandlerParams | Promise<RequestHandlerParams>;
export interface AbortablePromise<T> extends Promise<T> {
  abort: () => void;
}

/**
 * Native fetch request with ability to pass custom options for middleware/handler functionality
 * @param fetchInput RequestInfo
 * @param fetchOpts RequestFetchOpts
 * @param userOpts UserOpts
 * @returns AbortablePromise<any>
 */
export default function request(
  fetchInput: RequestInfo,
  fetchOpts?: RequestFetchOpts,
  userOpts?: UserOpts
): AbortablePromise<any> {
  // Override global opts with user input if passed by user
  let allUserOpts = userOpts
    ? {
        ...request._userOpts,
        ...userOpts
      }
    : request._userOpts;

  // Run middleware
  let middlewareResult = request._processMiddleware({
    fetchInput,
    fetchOpts,
    userOpts: allUserOpts
  });

  // Enable abort controller
  // Create fetch opts in none exist
  let abortController: AbortController | null = null;
  if (middlewareResult.userOpts?.abortable == true) {
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
    ._fetch(middlewareResult.fetchInput, middlewareResult.fetchOpts)
    .then(async (fetchResponse) => {
      // Run handlers
      let handlersResponse = await request._processHandlers({
        fetchResponse,
        userOpts: middlewareResult.userOpts
      });

      return handlersResponse;
    }) as AbortablePromise<any>;

  // Add abort controller to final promise to be accessed by user.
  if (abortController && resultPromise) {
    resultPromise.abort = () => {
      abortController?.abort();
    };
  }

  return resultPromise;
}

request._fetch = typeof window === 'object' ? window.fetch : fetch;
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

request.init();

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
  let result = null;

  let index = -1;
  let len = request._handlers.length;
  let resultParams = params;

  while (++index < len) {
    let handler = request._handlers[index];
    resultParams = await handler(resultParams);
  }

  // If no handlers were processed, return intial fetch for user to operate on
  result = resultParams.result || params.fetchResponse;

  return result;
};

/**
 * Insert middleware
 * @param middleware RequestMiddleware
 */
request.use = function (middleware: RequestMiddleware) {
  request._middleware.push(middleware);
};

/**
 * Insert response handler
 * @param handler RequestHandler
 */
request.handle = function (handler: RequestHandler) {
  request._handlers.push(handler);
};
