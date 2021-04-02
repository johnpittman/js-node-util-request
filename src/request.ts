export default function request(input: RequestInfo, init?: RequestInit) {
  this._currentFetch(input, init);
}

// Set fetch to use based on environment
request._currentFetch = typeof fetch === 'object' || null;

// Middleware collection
request._middleware = [];

// Set overrides and options
request.setConfig = function (opts: { fetch: any }) {
  if (opts) {
    if (opts.fetch) {
      this._currentFetch = fetch;
    }
  }
};
