import type { RequestMiddleware } from '@code/request';

let jsonSender: RequestMiddleware = (params) => {
  let fetchOpts = (params.fetchOpts = params.fetchOpts || {});
  let headers = (params.fetchOpts.headers = params.fetchOpts.headers || {});

  if (!headers['Content-Type'] && !headers['content-type']) {
    headers['content-type'] = 'application/json';
  }

  if (fetchOpts.body !== undefined) {
    fetchOpts.body = JSON.stringify(fetchOpts.body);
  }

  return params;
};

export default jsonSender;
