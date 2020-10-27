const { Router } = require('express');
const router = new Router();

router.get('/login', (req, res) => {
  const { password } = req.query;

  console.log('password', password);
  if (password === 'password') {
    req.session.authenticated = true;
    res.status(200).json();
  } else {
    res.status(400).json();
  }
});

router.get('/me', (req, res) => {
  if (req.session.authenticated === true) {
    res.status(200).json();
  } else {
    res.status(400).json();
  }
});

module.exports = router;
