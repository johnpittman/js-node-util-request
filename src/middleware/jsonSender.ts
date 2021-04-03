import { RequestMiddleware } from '@code/request';

let jsonSender: RequestMiddleware = (params) => {
  let fetchOpts = (params.fetchOpts = params.fetchOpts || {});
  let headers = (params.fetchOpts.headers = params.fetchOpts.headers || {});

  if (!headers['Content-Type'] && !headers['content-type']) {
    headers['content-type'] = 'application/json';
  }

  if (typeof fetchOpts.body === 'object') {
    fetchOpts.body = JSON.stringify(fetchOpts.body);
  }

  return params;
};

export default jsonSender;
