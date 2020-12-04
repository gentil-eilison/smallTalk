module.exports = {

    sendIndex(req, res, next) {
        if(global.userId === null) {
        res.sendFile("C:/Users/Spidey/Documents/projeto-integrador/smallTalk/frontend/pages/index.html")
        } else {
            res.sendFile('C:/Users/Spidey/Documents/projeto-integrador/smallTalk/frontend/pages/discover.html')
        }
    },

    sendRegister(req, res, next) {
            res.sendFile('C:/Users/Spidey/Documents/projeto-integrador/smallTalk/frontend/pages/register.html')
    },

    sendProfile(req, res, next) {
        if(global.userId === null) {
            res.redirect('/index')
        } else {
            res.sendFile('C:/Users/Spidey/Documents/projeto-integrador/smallTalk/frontend/pages/profile.html')
        }
    },

    sendDiscover(req, res, next) {
        if(global.userId === null) {
            res.redirect('/index')
        } else {
            res.sendFile('C:/Users/Spidey/Documents/projeto-integrador/smallTalk/frontend/pages/discover.html')
        }
    },

    sendFriends(req, res, next) {
        if(global.userId === null) {
            res.redirect('/index')
        } else {
            res.sendFile('C:/Users/Spidey/Documents/projeto-integrador/smallTalk/frontend/pages/friends.html')
        }
    }
}