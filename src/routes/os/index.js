const { Router } = require('express');
const router = new Router();

router.post('/restart', async (req, res) => {
  const { device } = req.query;
  const { id, password } = req.body;

  console.log('req.body', req.body);
  console.log('id', id);
  console.log('password', password);

  await new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, 3000);
  });

  if (id === 'root' && password === 'password') {
    res.json({
      device: device,
      result: 'success',
      errorReason: '',
    });
  } else {
    res.json({
      device: device,
      result: 'fail',
      errorReason: '',
    });
  }
});

module.exports = router;
