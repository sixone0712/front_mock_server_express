const { Router } = require('express');
const router = new Router();

const systemRouter = require('./system');
const filesRouter = require('./files');
const dockerRouter = require('./docker');
const osRouter = require('./os');
const authRouter = require('./auth');

router.use('/system', systemRouter);
router.use('/docker', dockerRouter);
router.use('/os', osRouter);
router.use('/files', filesRouter);
router.use('/auth', authRouter);

module.exports = router;
