module.exports = {

    sendIndex(req, res) {
        if(global.userId === null) {
        res.sendFile("C:/Users/Spidey/Documents/projeto-integrador/smallTalk/frontend/pages/index.html")
        } else {
            res.sendFile('C:/Users/Spidey/Documents/projeto-integrador/smallTalk/frontend/pages/discover.html')
        }
    },

    sendRegister(req, res) {
            res.sendFile('C:/Users/Spidey/Documents/projeto-integrador/smallTalk/frontend/pages/register.html')
    },

    sendProfile(req, res) {
        if(global.userId === null) {
            res.redirect('/index')
        } else {
            res.sendFile('C:/Users/Spidey/Documents/projeto-integrador/smallTalk/frontend/pages/profile.html')
        }
    },

    sendDiscover(req, res) {
        if(global.userId === null) {
            res.redirect('/index')
        } else {
            res.sendFile('C:/Users/Spidey/Documents/projeto-integrador/smallTalk/frontend/pages/discover.html')
        }
    },

    sendFriends(req, res) {
        if(global.userId === null) {
            res.redirect('/index')
        } else {
            res.sendFile('C:/Users/Spidey/Documents/projeto-integrador/smallTalk/frontend/pages/friends.html')
        }
    },

    sendFilteredDiscover(req, res) {
        res.sendFile("C:/Users/Spidey/Documents/projeto-integrador/smallTalk/frontend/pages/discover.html")
    }
}