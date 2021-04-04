import type { RequestMiddleware } from '@code/request';

let sendJSON: RequestMiddleware = (params) => {
  let { fetchOpts } = params;

  if (fetchOpts) {
    let headers: any = (fetchOpts.headers = fetchOpts.headers || {});
    let hasContentTypeHeader = headers['content-type'] || headers['Content-Type'] || fetchOpts.body instanceof FormData;

    // Allow user to send what they want
    if (fetchOpts.body !== undefined && !hasContentTypeHeader) {
      headers['content-type'] = 'application/json';

      fetchOpts.body = JSON.stringify(fetchOpts.body);
    }
  }

  return params;
};

export default sendJSON;
