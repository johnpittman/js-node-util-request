import qs from 'query-string';
import { RequestMiddleware, RequestMiddlewareParams } from '@code/request';

const queryMiddleware: RequestMiddleware = function (params: RequestMiddlewareParams) {
  if (params?.requestOpts?.query) {
    let queryStr = null;

    if (typeof params.fetchInput === 'string') {
      queryStr = qs.stringify(
        params.requestOpts.query,
        params.requestOpts.queryOpts || this._config.requestOpts.queryOpts
      );
    }

    params.fetchInput += queryStr;
  }

  return params;
};

export default queryMiddleware;
