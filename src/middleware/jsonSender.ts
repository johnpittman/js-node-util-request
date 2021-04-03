import { RequestMiddleware } from '@code/request';

const jsonSender: RequestMiddleware = (params) => {
  const fetchOpts = params.fetchOpts || {};
  const headers = fetchOpts.headers || {};

  if (!headers['Content-Type'] && !headers['content-type']) {
    headers['content-type'] = 'application/json';
  }

  if (typeof fetchOpts.body === 'object') {
    fetchOpts.body = JSON.stringify(fetchOpts.body);
  }

  return params;
};

export default jsonSender;
