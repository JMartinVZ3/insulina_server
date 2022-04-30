/*
    path: /api/v1/messages

*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getChat } = require('../controllers/messages');

const router = Router();

router.get('/:userId', getChat);

module.exports = router;