const { response } = require('express');

const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { validateGoogleIdToken } = require('../helpers/google-verify-token');

const { generarJWT } = require('../helpers/jwt');


const googleSignUp = async(req, res) => {


    try {

        const token = req.body.token;
        if (!token) {
            return res.status(404).json({
                ok: false,
                msg: "No hay token en la petición"
            })
        }

        const googleUser = await validateGoogleIdToken( token );

        const email = googleUser.email;

        const name = googleUser.name;

        const existeEmail = await User.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const user = new User({
            "email": email,
            "name": name,
        });

        await user.save();

        // Generar mi JWT
        const jwt = await generarJWT(user.id);

        res.json({
            ok: true,
            user,
            token: jwt
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

} 


const googleSignIn = async(req, res) => {

    try {

        const token = req.body.token;
        if (!token) {
            return res.status(404).json({
                ok: false,
                msg: "No hay token en la petición"
            })
        }

        const googleUser = await validateGoogleIdToken( token );

        const email = googleUser.email;

        const userDB = await User.findOne({ email }).populate("shop");
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no registrado'
            });
        }

        // Generar el JWT
        const jwttoken = await generarJWT(userDB.id)
        res.json({
            ok: true,
            user: userDB,
            token: jwttoken
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const crearUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await User.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const user = new User(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generar mi JWT
        const token = await generarJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }


        // Generar el JWT
        const token = await generarJWT(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // generar un nuevo JWT, generarJWT... uid...
    const token = await generarJWT(uid);

    // Obtener el user por el UID, user.findById... 
    const user = await User.findById(uid);

    if (user == null) {
        return res.status(400).json({
            ok: false,
            msg: 'No se ha encontrado un usuario'
        });
    }

    res.json({
        ok: true,
        user,
        token
    });

}



module.exports = {
    googleSignUp,
    googleSignIn,
    crearUser,
    login,
    renewToken,
}