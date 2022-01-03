const fs = require('fs');
const packageFile = require('./package.json');

delete packageFile.devDependencies;
delete packageFile.nodemonConfig;

const packageObj = {
  ...packageFile,
  scripts: {
    start: "node server.js",
    test: "jest -i --colors --verbose --detectOpenHandles"
  }
};

const json = JSON.stringify(packageObj, null, 2);

fs.writeFileSync('../dist/package.json', json, 'utf8');