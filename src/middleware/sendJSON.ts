import { RequestMiddleware } from '>/request';

let sendJSON: RequestMiddleware = (params) => {
  let { fetchOpts } = params;

  if (fetchOpts) {
    let headers = (fetchOpts.headers = fetchOpts.headers || {});
    let contentType = headers['content-type'] || headers['Content-Type'];
    let isNotJSON = (contentType && contentType !== 'application/json') || fetchOpts.body instanceof FormData;

    // Allow user to send what they want
    if (fetchOpts.body !== undefined && !isNotJSON) {
      headers['content-type'] = 'application/json';

      fetchOpts.body = JSON.stringify(fetchOpts.body);
    }
  }

  return params;
};

export default sendJSON;
