import qs from 'query-string';
import { RequestMiddleware, RequestMiddlewareParams } from '@code/request';

let queryMiddleware: RequestMiddleware = (params: RequestMiddlewareParams) => {
  if (params?.userOpts?.query) {
    if (typeof params.fetchInput === 'string') {
      let parsedURL = qs.parseUrl(params.fetchInput);
      let queryStr = qs.stringify(
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

export default queryMiddleware;
