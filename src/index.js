const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = new express();
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes');
const expiredTime = 4 * 60 * 60 * 1000;

var options = {
  //https://www.zerocho.com/category/NodeJS/post/5e9bf5b18dcb9c001f36b275
  //origin: '*',
  origin: true,
  exposeHeaders: ['*'],
  //exposedHeaders: ['Content-Disposition'],
  credentials: true,
};

app.use(cors(options));

app.use(
  session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: expiredTime }, // 쿠키의 maxAge를 이용해서 세션 유효기간 설정. 3초
    rolling: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // cookie 분석 미들웨어 장착!!!

app.use((req, res, next) => {
  console.log('req.originalUrl', req.originalUrl);
  console.log('session', req.session);
  console.log('session.authenticated', req.session.authenticated);
  console.log('now', new Date(Date.now()));
  console.log('req.cookies', req.cookies);

  if (allowUrl(req.originalUrl)) {
    return next();
  }

  console.log('typeof session.authenticated', typeof req.session.authenticated);
  if (req.session.authenticated === true) {
    req.session.cookie.expires = new Date(Date.now() + expiredTime);
    req.session.cookie.maxAge = expiredTime;
    return next();
  }

  res.status(401).json();
});

app.use('/servicemanager/api', apiRouter);

app.listen(3100, () => {
  console.log('Listening to port 3100');
});

function allowUrl(pathname) {
  const urls = [
    '/servicemanager/api/auth/login',
    '/servicemanager/api/auth/logout',
    '/servicemanager/api/auth/me',
    '/favicon.ico',
  ];
  console.log('pathname', pathname);

  for (const item of urls) {
    if (pathname.startsWith(item)) {
      console.log(pathname);
      return true;
    }
  }

  return false;
}
