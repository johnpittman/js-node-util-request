const qs = require('query-string');

async function testQueryString() {
  const data = {
    a: 'a',
    array: [1, 2, 3],
    jibberish: '#$%&&%#&&%'
  };
  console.log('stringify w/ null opts', qs.stringify(data, undefined));
  console.log('stringify', qs.stringify(data));
  //   console.log('parse', qs.parse(qs.stringify(data)));
  console.log('parse separator: default', qs.parse('a=1&a=2&a=3,4,5'));
  console.log(
    'parse separator: comma',
    qs.parse('a=1&a=2&a=3,4,5', {
      arrayFormat: 'comma'
    })
  );
  // console.log('extract: only query input', qs.extract('a=1&b=2'));
  // console.log('extract w/ ?', qs.extract('www.google.com?'));
  //   console.log('extract w/ query', qs.extract('www.google.com?a=1&b=2'));
  console.log('parseURL', qs.parseUrl('www.google.com:34345?a=1&b=2#wgg'));
  console.log('parseURL: no query', qs.parseUrl('www.google.com?'));
}

testQueryString();
