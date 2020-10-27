const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = new express();

const apiRouter = require('./routes');

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
    cookie: { maxAge: 60 * 1000 }, // 쿠키의 maxAge를 이용해서 세션 유효기간 설정. 3초
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log('req.originalUrl', req.originalUrl);
  console.log('session', req.session);
  console.log('session.authenticated', req.session.authenticated);
  console.log('now', new Date(Date.now()));

  if (allowUrl(req.originalUrl)) {
    return next();
  }

  console.log('typeof session.authenticated', typeof req.session.authenticated);
  if (req.session.authenticated === true) {
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
