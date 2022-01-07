const fs = require('fs');
const packageFile = require('./package.json');

delete packageFile.devDependencies;
delete packageFile.nodemonConfig;

const packageObj = {
  ...packageFile,
  scripts: {
    start: "DEVELOP_ENV=prod node server.js",
    test: "DEVELOP_ENV=dev jest --color"
  }
};

const json = JSON.stringify(packageObj, null, 2);

fs.writeFileSync('../dist/package.json', json, 'utf8');