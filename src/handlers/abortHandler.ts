import { RequestHandler } from '@code/request';

// TODO: turn into middleware
// - have to initialize abort controller and apply signal before feetch is called
const abortHandler: RequestHandler = function abortHandler(fetchResponse, fetchInput, fetchOpts) {
  const abortController = new AbortController();
  fetchOpts.signal = abortController.signal;

  // @ts-ignore
  fetchResponse.abort = () => {
    abortController.abort();
  };

  return fetchResponse;
};

export default abortHandler;
