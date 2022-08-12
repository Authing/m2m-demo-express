# m2m-demo-express

<div align=center>
  <img width="250" src="https://files.authing.co/authing-console/authing-logo-new-20210924.svg" />
</div>

<div align=center>
  <a href="https://forum.authing.cn/" target="_blank"><img src="https://img.shields.io/badge/chat-forum-blue" /></a>
  <a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-success" alt="License"></a>
</div>

**English** | [简体中文](./README.zh-CN.md)

## Introduction

Node.js Express API Server quick start sample program.


## Install dependencies

Run the following command to install the project dependencies:

```bash
$ npm install
```

## Fill in your application configuration

On line 12 of `/app.js`, modify the configuration to your application configuration:

```js
// Authorization middleware, Access token must exist and can be verified by Authing application public key
const checkJwt = jwt({
  // Dynamically obtain the signature verification public key from the Authing application service discovery address
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://{APP_DOMAIN}.authing.cn/oidc/.well-known/jwks.json`
  }),

  // Verify audience and issuer
  audience: 'APP_ID',
  issuer: [`https://{APP_DOMAIN}.authing.cn/oidc`],
  algorithms: ['RS256']
});
```

## Run

Run this sample program:

```bash
$ npm start
```

## Reference

[Node.js Express API Server Quick Start](https://docs.authing.cn/v2/quickstarts/apiServer/nodeJsExpress)


## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Authing
