# m2m-demo-express

<div align=center>
  <img width="250" src="https://files.authing.co/authing-console/authing-logo-new-20210924.svg" />
</div>

<div align=center>
  <a href="https://forum.authing.cn/" target="_blank"><img src="https://img.shields.io/badge/chat-forum-blue" /></a>
  <a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-success" alt="License"></a>
</div>

**简体中文** | [English](./README.md)

## 简介

Node.js Express API Server 快速开始的示例程序。


## 安装依赖

运行以下命令安装项目依赖：

```bash
$ npm install
```

## 填写你的应用配置

在`/app.js`第 12 行，修改配置为你的应用配置：

```js
// 授权中间件，Access token 必须存在，并且能被 Authing 应用公钥验签
const checkJwt = jwt({
  // 从 Authing 应用服务发现地址动态获取验签公钥
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://{应用域名}.authing.cn/oidc/.well-known/jwks.json`
  }),

  // 验证受众和颁发者
  audience: 'APP_ID',
  issuer: [`https://{应用域名}.authing.cn/oidc`],
  algorithms: ['RS256']
});
```

# 运行

运行本示例程序：

```bash
$ npm start
```

# 参考文档

[Node.js Express API Server 快速开始](https://docs.authing.cn/v2/quickstarts/apiServer/nodeJsExpress.html)


## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Authing
