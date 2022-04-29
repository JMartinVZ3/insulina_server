/*
    path: /api/v1/bot

*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getCompletion } = require('../controllers/bot');

const router = Router();

router.post('/', getCompletion);

module.exports = router;