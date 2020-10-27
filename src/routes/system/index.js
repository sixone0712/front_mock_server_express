const { Router } = require('express');
const router = new Router();
const data = require('../../../data/data');

let flag = false;

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

  if (flag) {
    res.json(data.getDeviceInfo());
    flag = !flag;
  } else {
    res.json(data.getDeviceInfo2());
    flag = !flag;
  }
});

module.exports = router;
