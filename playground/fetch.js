const fetch = require('node-fetch');

async function testFetch() {
  let res = await fetch('https://www.google.com');

  console.log(Object.keys(res));
  console.log(res.ok);
  console.log(res.size);
  console.log(res.status);
  console.log(res.statusText);
  console.log(res.timeout);
  console.log('headers', res.headers.get('content-type'));

  let result = null;
  result = await res.text();
  console.log(result.status);
}

testFetch();
