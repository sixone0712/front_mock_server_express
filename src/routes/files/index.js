const { Router } = require('express');
const router = new Router();
const data = require('../../../data/data');
const path = require('path');

router.get('/', async (req, res) => {
  const { device } = req.query;
  console.log('device', device);
  await new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, 1000);
  });

  res.json({
    lists: data.getFileInfo(device),
  });
});

router.post('/', (req, res) => {
  res.json({
    downloadId: 'dl20201217',
  });
});

let statusCnt = 0;
router.get('/download/:name?', (req, res) => {
  statusCnt++;
  console.log(statusCnt, statusCnt);
  if (statusCnt > 10) {
    res.json({
      donwloadId: 'dl20201019',
      status: 'done',
      url: 'http://localhost:3100/servicemanager/api/files/store/dl20201019',
    });
    statusCnt = 0;
  } else {
    res.json({
      donwloadId: 'dl20201019',
      status: 'process',
      url: '',
    });
  }
});

router.delete('/download/:name?', (req, res) => {
  res.json();
});

router.get('/store/:name', async (req, res) => {
  console.log('__dirname', __dirname);
  const fpath = path.join(__dirname, '\\test_log_file.zip');
  // res.setHeader(
  //   'Content-disposition',
  //   'attachment; filename=test_log_file.zip',
  // );
  res.download(fpath); // Set disposition and send it.
});

module.exports = router;
