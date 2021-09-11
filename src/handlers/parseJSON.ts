import { RequestHandler, RequestHandlerParams } from '>/request';

let jsonParser: RequestHandler = async (params: RequestHandlerParams) => {
  let { fetchResponse } = params;
  let contentType = fetchResponse.headers.get('content-type') || '';

  if (/application\/json/.test(contentType)) {
    let ok = fetchResponse.ok;

    params.result = await fetchResponse.json();

    if (!ok) {
      throw params.result;
    }
  }

  return params;
};

export default jsonParser;
