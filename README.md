# Overview
  To manage product in the shop
  * Required knowing:
    - Typescript https://www.typescriptlang.org/
    - Node https://nodejs.org/en/
    - Docker https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
    - Mongoose https://mongoosejs.com/docs/guide.html
    - Authentication:
      + Jwt Token https://en.wikipedia.org/wiki/JSON_Web_Token
    - Testing https://lawrey.medium.com/unit-tests-ui-tests-integration-tests-end-to-end-tests-c0d98e0218a6
      + Intergation Test (`jest, supertest`)
      + Unit Test (`jest`)

## Run Project
  + Run `cd src` go into folder src.
    + Run `npm install --save` for install node_modules.
    + Run `npm start` for start server.
    + Run `npm run start:nodemon` for start server with nodemon.
    + Run `npm run build` to combile code to js (the code certain by folder dist).
    + Run `npm run start:dist` to start server with folder dist.

## Run Test 
  + Run `cd src` go into folder src.
    + Run `npm run test` for check all test.
    + Run `npm run test:unit` for unit test
    + Run `npm run test:integration` for intergration test
    + Run `npm run test:dist` to run test in folder dist.

## Docker
  + Run `docker build -f docker/Dockerfile -t product .` for build image.
  + Run `docker-compose -f docker/docker-compose.yml up -d` for run image.


## Token
`eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiI2MTU5ODk0NTkwMzVlOWE3MDYxNDcxN2IiLCJwZXJtaXNzaW9ucyI6Im1wOnIgbXA6YyIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2NDE4ODQxMjYsImV4cCI6MzY0MTg4NTAyNn0.Mql9vA8dLCw4PazNW-F_AnJR1pvayf4O8LxemcGkPryWaoKw25CbdoRE7JZmJdPkt7Eoh70k3rHm9QLSc7MbB1Ob7mKwWqR0tGluC2AyBMtO-sKS9WMtWUZ8evVq4H8ItRJw-Puxgi_eBLzdVitkm1p7MFYhxFzD-SHw_msxmMVFI4FHOQIt2cZ98aFAcq-AvPPDP5rQ-n4F2L4g_h_5lRymJwDKAPw-OYIPsUOlVn_YUwdmFEQBsAIhRAh4usEYHcnvA8CdfsdBzmv0h_5Q_SXD1ByU0dI2MAfec2kLJD3DcNJ7ubWmxeQ83mh2-yL3KLz4KmE4dFeABlZFganxzw`