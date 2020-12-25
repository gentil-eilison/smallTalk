const path = require('path')

module.exports = {

    sendIndex(req, res) {
        if(global.userId === null) {
        res.sendFile(path.resolve(__dirname + "../../../frontend/pages/index.html"))
        } else {
            console.log('quase lá');
            res.sendFile(path.resolve(__dirname + "../../../frontend/pages/discover.html"))
        }
    },

    sendRegister(req, res) {
            res.sendFile(path.resolve(__dirname + "../../../frontend/pages/register.html"))
    },

    sendProfile(req, res) {
        if(global.userId === null) {
            res.redirect('/index')
        } else {
            res.sendFile(path.resolve(__dirname + '../../../frontend/pages/profile.html'))
        }
    },

    sendDiscover(req, res) {
        if(global.userId === null) {
            res.redirect('/index')
        } else {
            console.log('tentando');
            res.sendFile(path.resolve(__dirname + '../../../frontend/pages/discover.html'))
        }
    },

    sendFriends(req, res) {
        if(global.userId === null) {
            res.redirect('/index')
        } else {
            res.sendFile(path.resolve(__dirname + '../../../frontend/pages/friends.html'))
        }
    },

    sendErrorIndex(req, res) {
        res.sendFile(path.resolve(__dirname + "../../../frontend/pages/index.html"))
    },

    sendSuccessIndex(req, res) {
        res.sendFile(path.resolve(__dirname + "../../../frontend/pages/index.html"))
    },

    sendRegisterError(req, res) {
        res.sendFile(path.resolve(__dirname + "../../../frontend/pages/register.html"))
    }
}