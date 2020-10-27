const { Router } = require('express');
const router = new Router();

router.post('/restart', async (req, res) => {
  const { device } = req.query;

  await new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, 3000);
  });

  res.json({
    device: device,
    result: 'success',
    errorReason: '',
  });
});

module.exports = router;
