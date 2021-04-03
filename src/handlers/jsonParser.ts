import { RequestHandler } from '@code/request';

let jsonParser: RequestHandler = async (params) => {
  let { fetchResponse } = params;

  if (fetchResponse.ok === true && /application\/json/.test(fetchResponse.headers.get('content-type'))) {
    params.result = await fetchResponse.json();
  }

  return params;
};

export default jsonParser;
