const mysql = require('../config')
const FrontController = require('./FrontController')
const PageController = require('./PageController')
global.userId = null
let initialStateInterest = false

module.exports = {
    // Register Page

    createUser(req, res, next) {
        if(req.body.pw === req.body.cpw) {
            initialStateInterest = true

            mysql.query("insert into users (src, user_name, email, pw, birthdate, bio) values (?,?,?,?,?,?)", [null, req.body.user_name,req.body.email,req.body.pw, req.body.birthdate, null])

            res.redirect('/index')
                console.log('User successfully created')
            } else {
                console.log("passwords don't match.")

                res.redirect('/register')
            }
    },

    // Landing Page

    logUser(req, res, next) {
        let autResult = false 

        mysql.query('select id from users where email = ? and pw = ?' , [req.body.email, req.body.pw], (err, results, fields) => {
            if(err) {
                throw err 
            } else {
               userId = results[0].id
               autResult = true 

               autUser(autResult)
               
            }
        })

        function autUser(autResult) {
            if(autResult) {
                res.redirect('/discover')
            } else {
                res.send('User not found')
            }
        }

    },

    // Profile Page

    saveBio(req, res, next) {
            mysql.query('select bio from users where id = ?', [userId], (err, results) => {
            if(err) {
                throw err
            } else {
                insertBio(results[0].bio)
            }
        })

        function insertBio(queryResult) {
            if(queryResult === undefined) {
                mysql.query('insert into users(bio) values(?) where id = ?', [req.body.bio, userId])

                res.redirect('/profile')
            } else {
                mysql.query('update users set bio = ? where id = ?', [req.body.bio, userId])

                res.redirect('/profile')
            }
        }
    },

    logOut(req, res, next) {
        userId = null
        res.redirect('/index')
    },

    deleteUser(req, res, next) {
            mysql.query('delete from users_languages where user_id = ?', [userId])
            mysql.query('delete from users where id = ?', [userId])

            res.redirect('/index')

            userId = null
    },

    changePassword(req, res, next) {
        mysql.query('select pw from users where id = ?', [userId], (err, results) => {
            if(err) {
                throw err 
            } else { 
                checkPassword(results[0].pw)
            }
        })
        function checkPassword(queryResult) {
            if(queryResult === req.body.cp) {
                if(req.body.np === req.body.cnp) {
                    mysql.query('update users set pw = ? where id = ?', [req.body.cnp, userId])

                    res.redirect('/profile')

                    console.log("password successfully changed.")
                } else {
                    res.send("New passwords don't match")
                }
            } else {
                res.send('Your current password is wrong.')
            }
        }
    },

    addLanguages(req, res, next) {
        if(req.query.lang.length > 1) {
        req.query.lang.forEach((e, i) => {
            mysql.query('insert into users_languages(lang_id, user_id) values(?, ?)', [e, userId])
        })
        
        } else {
            mysql.query('insert into users_languages(lang_id, user_id) values(?, ?)', [req.query.lang, userId])
        }
        res.redirect('/profile')
    },

    uploadProfilePicture(req, res, next) { 
        mysql.query('select src from users where id = ?', [userId], (err, results) => {
            if (results[0] == {"src": null}) {
                mysql.query('insert into users(src) value(?) where id = ?', [req.body.icon, userId])
                res.redirect('/profile')
                console.log('user icon inserted.')
            } else {
                mysql.query('update users set src = ? where id = ?', [req.body.icon, userId])
                res.redirect('/profile')
                console.log('user icon updated.')
            }
        })
    },

    registerInterest(req, res, next) {
        mysql.query('select interest_id from users_interests where user_id = ?', [userId], (err, results) => {
            if(err) {
                throw err
            } else {
                let interests = []
                results.forEach((e, i) => {
                    interests.push(e.interest_id)
                })

                if(interests.length == 0 && req.body.inter.length > 1) {
                    req.body.inter.forEach(e => {
                        mysql.query('insert into users_interests(user_id, interest_id) values(?,?)', [userId, e])
                    })
                }else if(interests.length == 0 && req.body.inter.length == 1) {
                        mysql.query('insert into users_interests(user_id, interest_id) values(?,?)', [userId, req.body.inter])

                } else if(interests.length >= 1 && req.body.inter.length > 1) {
                    // atualizar/excluir
                   req.body.inter.forEach((e, i) => {
                    let contains = interests.indexOf(e) != -1 ? true : false
                        if(contains) {
                            mysql.query('delete from users_interests where interest_id = ? and user_id = ?', [e, userId])
                        } else {
                            mysql.query('insert into users_interests(user_id, interest_id) values(?,?)', [userId, e])
                        }
                   })
                
                } else if (interests.length >= 1 && req.body.inter.length == 1) {
                    const contains = interests.indexOf(req.body.inter) != -1 ? true : false
                    if(contains) {
                        mysql.query('delete from users_interests where interest_id = ? and user_id = ?', [req.body.inter, userId])
                    } else {
                        mysql.query('insert into users_interests(user_id, interest_id) values(?,?)', [userId, req.body.inter])
                    }
                   
                }

                res.redirect('/profile')

            }
            
        })
    },

    removeLanguges(req, res, next) {
        if(req.query.lang.length > 1) {
            req.query.lang.forEach((e, i) => {
                mysql.query('delete from users_languages where lang_id = ? and user_id = ?', [e, userId])
            })

        } else {
                mysql.query('delete from users_languages where lang_id = ? and user_id = ?', [req.query.lang, userId])  
        }

        res.redirect('/profile')
    }
    // Discover Page  
}