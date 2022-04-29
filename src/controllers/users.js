const { response } = require('express');
const User = require('../models/user');

const getUsers = async(req, res = response) => {


    try {

        const users = await User
            .find({})

        res.json({
            ok: true,
            users,
        });


    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const editUser = async(req, res = response) => {


    try {

        const userId = req.params.userId;

        const user = await User.findByIdAndUpdate( userId, req.body, { new: true, runValidators: true});

        res.json({
            ok: true,
            user
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getUsers,
    editUser,
}