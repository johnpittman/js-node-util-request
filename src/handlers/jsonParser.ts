import type { RequestHandler, RequestHandlerParams } from '@code/request';

let jsonParser: RequestHandler = async (params: RequestHandlerParams) => {
  let { fetchResponse } = params;

  if (/application\/json/.test(fetchResponse.headers.get('content-type') as string)) {
    let ok = fetchResponse.ok;

    params.result = await fetchResponse.json();

    if (!ok) {
      throw params.result;
    }
  }

  return params;
};

export default jsonParser;
