import type { RequestMiddleware } from '@code/request';

let jsonSender: RequestMiddleware = (params) => {
  let fetchOpts = (params.fetchOpts = params.fetchOpts || {});
  let headers: any = (params.fetchOpts.headers = params.fetchOpts.headers || {});

  if (!headers.accept && !headers.Accept) {
    headers.accept = 'application/json';
  }

  if (fetchOpts.body !== undefined) {
    fetchOpts.body = JSON.stringify(fetchOpts.body);
  }

  return params;
};

export default jsonSender;
