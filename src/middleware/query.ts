import type { RequestMiddleware, RequestMiddlewareParams } from '@code/request';

/**
 * Adds object literal query definition use.
 * @param queryStringPkg import queryString from 'query-string'
 * @returns RequestMiddleware
 */
let queryMiddleware = (queryStringPkg: any): RequestMiddleware => {
  return (params: RequestMiddlewareParams) => {
    if (params?.userOpts?.query) {
      if (typeof params.fetchInput === 'string') {
        let parsedURL = queryStringPkg.parseUrl(params.fetchInput);
        let queryStr = queryStringPkg.stringify(
          {
            ...parsedURL.query,
            ...params.userOpts.query
          },
          params.userOpts.queryOpts
        );

        params.fetchInput = `${parsedURL}?${queryStr}`;
      }
    }

    return params;
  };
};

export default queryMiddleware;
