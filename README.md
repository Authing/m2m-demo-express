# 安装依赖

运行以下命令安装项目依赖：

```bash
$ npm install
```

# 填写你的应用配置

在 app.js 第 12 行，修改配置为你的应用配置：

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
