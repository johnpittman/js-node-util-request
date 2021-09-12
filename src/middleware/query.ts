import queryString from 'query-string';

import { RequestMiddlewareParams } from '>/request';

let query = (params: RequestMiddlewareParams) => {
  // Cannot set when fetchInput is a Request object
  if (typeof params.fetchInput === 'string' && params.userOpts?.query) {
    let queryStr = queryString.stringify(params.userOpts.query, params.userOpts.queryOpts);

    params.fetchInput = `${params.fetchInput}?${queryStr}`;
  }

  return params;
};

export default query;
