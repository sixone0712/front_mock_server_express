const { Router } = require('express');
const router = new Router();

const systemRouter = require('./system');
const filesRouter = require('./files');
const restartRouter = require('./restart');
const loginRouter = require('./login');

router.use('/system', systemRouter);
router.use('/restart', restartRouter);
router.use('/files', filesRouter);
router.use('/auth', loginRouter);

module.exports = router;
