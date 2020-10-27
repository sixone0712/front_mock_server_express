const { Router } = require('express');
const router = new Router();
const data = require('../../../data/data');

router.get('/', async (req, res) => {
  try {
    await new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    });
  } catch (e) {
    console.log(e);
  }

  res.json(data.getDeviceInfo());
});

module.exports = router;
