/*
    path: /api/v1/users

*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getUsers, editUser} = require('../controllers/users');

const router = Router();

router.get('/', validarJWT, getUsers);

router.put('/:userId', validarJWT, editUser);

module.exports = router;