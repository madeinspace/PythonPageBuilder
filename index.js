const fs = require('fs');

const pages = Object.values(
  JSON.parse(fs.readFileSync('./pages.json', 'utf8'))
);

const cleanedPages = Object.values(pages).reduce((acc, current) => {
  return [...acc, current.Alias];
}, []);

console.log('cleanedPages: ', cleanedPages);
