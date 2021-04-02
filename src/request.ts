export type Fetch = (fetchInput: RequestInfo, fetchOpts?: RequestInit) => FetchResponse;
export type FetchResponse = Promise<Response>;
export type RequestMiddleware = (fetchInput: RequestInfo, fetchOpts?: RequestInit) => void;
export type RequestHandler = (
  fetchResponse: FetchResponse,
  fetchInput: RequestInfo,
  fetchOpts?: RequestInit,
  requestOpts?: any
) => void;

export default function request(fetchInput: RequestInfo, fetchOpts?: RequestInit) {
  let fetchResponse = null;

  request._processMiddleware(fetchInput, fetchOpts);

  fetchResponse = request._fetch(fetchInput, fetchOpts);

  return request._processHandlers(fetchResponse, fetchInput, fetchOpts);
}

// Set fetch to use based on environment
request._fetch = typeof fetch === 'object' ? fetch : null;

// Middleware
request._middleware = [];

// Stream handlers
request._handlers = [];

// Middleware processor
request._processMiddleware = function (fetchInput: RequestInfo, fetchOpts?: RequestInit) {
  if (request._middleware.length > 0) {
    request._middleware.forEach((middleware: RequestMiddleware) => {
      middleware(fetchInput, fetchOpts);
    });
  }
};

// Middleware processor
request._processHandlers = function (
  fetchResponse: FetchResponse,
  fetchInput: RequestInfo,
  fetchOpts?: RequestInit,
  requestOpts?: any
) {
  if (request._handlers.length > 0) {
    request._handlers.forEach((handler: RequestHandler) => {
      handler(fetchResponse, fetchInput, fetchOpts, requestOpts);
    });
  }
};

// Set overrides and options
request.setConfig = function (opts: { fetch: Fetch }) {
  if (opts) {
    if (opts.fetch) {
      request._fetch = fetch;
    }
  }
};

// Insert middleware
request.use = function (middleware: RequestMiddleware) {
  request._middleware.push(middleware);
};

// Insert response handler
request.handle = function (handler: RequestHandler) {
  request._handlers.push(handler);
};
