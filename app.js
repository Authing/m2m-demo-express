var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

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
const checkScopes = jwtAuthz(['order:read']);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/api/public', async (req, res) => {
  res.json({
    message: '公开接口'
  })
})

app.get('/api/protected', checkJwt, checkScopes, async (req, res) => {
  res.json({
    message: '受保护的接口'
  })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
