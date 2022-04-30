const Message = require('../models/message');

const getChat = async(req, res) => {

    const userId = req.params.userId;

    const last30 = await Message.find({
            $or: [{ from: userId}, {to: userId }]
        })
        .sort('-createdAt')
        .limit(30);

    res.json({
        ok: true,
        mensajes: last30
    })

}

module.exports = {
    getChat,
}