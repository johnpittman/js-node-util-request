const fetch = require('isomorphic-fetch');

async function testFetch() {
  let res = await fetch('https://www.google.com');

  console.log(Object.keys(res));
  console.log(res.ok);
  console.log(res.size);
  console.log(res.status);
  console.log(res.statusText);
  console.log(res.timeout);
  console.log('headers', res.headers.get('content-type'));

  // let result = await res.text();
  // let result2 = await res.blob();
  // console.log(result.status);
  // console.log(result2.status);
}

testFetch();
