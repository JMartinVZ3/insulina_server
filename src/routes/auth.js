/*
    path: api/v1/login

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { crearUser, login, renewToken, googleSignIn, googleSignUp} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos
], crearUser);


router.post('/', [
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
], login);

router.get('/renew', validarJWT, renewToken);

router.post('/google', googleSignIn);

router.post('/google/new', googleSignUp);

module.exports = router;