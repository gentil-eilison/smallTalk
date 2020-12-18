const { query } = require('express')
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

                res.redirect('/indexSuccess')
            } else {
                res.redirect('/registerError')
            }
    },

    // Landing Page

    logUser(req, res, next) {
        let autResult = false 

        mysql.query('select id from users where email = ? and pw = ?' , [req.body.email, req.body.pw], (err, results, fields) => {
            if(err) {
                throw err 
            } else {
                const queryResult = results[0] != undefined ? true : false 
               if(queryResult) {
                    userId = results[0].id
                    autResult = true 
                    autUser(autResult)
                   
                } else {
                    autResult = false 
                    autUser(autResult)
               }

               
               
            }
        })

        function autUser(autResult) {
            if(autResult) {
                res.redirect('/discover')
            } else {
                res.redirect('/indexUserError')
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
                    interests.push(String(e.interest_id))   // funcionando: traz um array com interesses do usuário
                })

                const selectedInterests = [...req.body.inter] // funcionando: faz um array com os itens do form

                if(interests.length == 0 && selectedInterests.length > 1) {
                    selectedInterests.forEach(e => {
                        mysql.query('insert into users_interests(user_id, interest_id) values(?,?)', [userId, e])
                    })
                }else if(interests.length == 0 && selectedInterests.length == 1) {
                        mysql.query('insert into users_interests(user_id, interest_id) values(?,?)', [userId, selectedInterests])

                } else if(interests.length >= 1 && selectedInterests.length > 1) {
                      selectedInterests.forEach((e, i) => {
                      let contains = interests.indexOf(e) != -1 ? true : false

                         if(contains) {
                             mysql.query('delete from users_interests where interest_id = ? and user_id = ?', [e, userId])
                         } else {
                             mysql.query('insert into users_interests(interest_id, user_id) values(?, ?)', [e, userId])
                         }
                    })
                } else if (interests.length >= 1 && selectedInterests.length == 1) {
                            const contains = interests.indexOf(selectedInterests[0]) != -1 ? true : false
                            const selectedInterest = selectedInterests[0] 

                            if(contains) {
                                mysql.query('delete from users_interests where interest_id = ? and user_id = ?', [selectedInterest, userId])
                            } else {
                                mysql.query('insert into users_interests(interest_id, user_id) values(?, ?)', [selectedInterest, userId])
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
    },

    // Discover Page 
    addFriend(req, res) { 
        mysql.query('select id from is_friends_with where (user1_id = ? or user1_id = ?) and (user2_id = ? or user2_id = ?)', [userId, req.body.id, userId, req.body.id], (err, results) => {
            if(err) {
                throw err 
            } else {
                if(results.length > 0) {
                    mysql.query('delete from is_friends_with where id = ?', [results[0].id], (err, results) => {
                        if(err) {
                            console.log('Could not delete friend')
                            throw err
                        } else {
                            console.log('Friend successfully deleted.')
                            mysql.query('select room_key from meetings_users where (participant1_id = ? or participant1_id = ?) and (participant2_id = ? or participant2_id = ?)', [userId, req.body.id, userId, req.body.id], (err, results) => {
                                if(err) {
                                    throw err 
                                } else {
                                    if(results.length > 0) {
                                        mysql.query('delete from meetings_users where room_key = ?', [results[0].room_key])
                                        mysql.query('delete from meetings where id = ?', [results[0].room_key], (err, results) => {
                                            if(err) {
                                                throw err 
                                            } else {
                                                res.redirect('/discover')
                                            }
                                        })
                                    } else {
                                        res.redirect('/discover')
                                    }
                                }
                            })
                            
                        }
                    })
                } else {
                    mysql.query('insert into is_friends_with(user1_id, user2_id) values(?,?)', [userId, req.body.id], (err, results) => {
                        if(err) {
                            console.log('Could not add this friend.')
                            throw err 
                        } else {
                            console.log('Friend added successfully.')
                            res.redirect('/discover')
                        }
                    })
                }
            }
        })
    },

    getSimpleProfileInfo(req, res, next) {
        const userId = req.params.id 

        mysql.query('select id, user_name, bio, src as img_src from users where id = ?', [userId], function(err ,results) {
            if(err) {
                throw err
            } else {
                res.locals.simpleInfo = results 
                next()
            }
        })
    },

    getInterestsProfileInfo(req, res, next) {
        const simpleInfo = req.res.locals.simpleInfo
        let complexInfo = []

        mysql.query('select interest_id from users_interests where user_id = ?', [simpleInfo[0].id], function(err, results) {
            if(err) {
                throw err
            } else {
                const interest_ids = []

                Array.from(results).forEach(e => {
                    interest_ids.push(e.interest_id)
                })

                complexInfo = [...simpleInfo]
                complexInfo[0]['interests_id'] = interest_ids
                
                res.locals.complexInterestInfo = complexInfo
                next()
            }
        })
    },

    getFinalProfileInfo(req, res, next) {
        const complexInterestInfo = req.res.locals.complexInterestInfo
        const user_id = complexInterestInfo[0].id
        let finalProfile = []
        const languages_ids = []
        const languages_src = []

        mysql.query('select lang_id from users_languages where user_id = ?', [user_id], function(err, results) {
            if(err) {
                throw err 
            } else {
                Array.from(results).forEach(e => {
                    languages_ids.push(e.lang_id)
                })

                languages_ids.forEach((e, i) => {
                    mysql.query('select src as lang_src from languages where id = ?', [e], function(err, results) {
                        if(err) {
                            throw err 
                        } else {
                            languages_src.push(results[0].lang_src)

                            if(i === languages_ids.length - 1) {
                                finalProfile = [...complexInterestInfo]
                                finalProfile[0]['langs_src'] = languages_src
                                res.send(finalProfile[0])
                            }
                        }
                    })
                    
                })

            }
        })
    }
}