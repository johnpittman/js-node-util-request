import { RequestHandler } from '@code/request';

let jsonParser: RequestHandler = async (params) => {
  let { fetchResponse } = params;

  if (/application\/json/.test(fetchResponse.headers.get('content-type'))) {
    let ok = fetchResponse.ok;

    params.result = await fetchResponse.json();

    if (!ok) {
      throw params.result;
    }
  }

  return params;
};

export default jsonParser;
