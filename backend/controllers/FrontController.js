const mysql = require('../config')
const { v4: uuidV4 } = require('uuid')
let nodemailer = require('nodemailer')

module.exports = {
    getLoggedUser(req, res) {
        mysql.query('select * from users where id = ?', [global.userId], function (err, results) {
            if (err) {
                throw err
            } else {
                res.send(results[0])
            }
        })
    },

    getUserLanguages(req, res) {
        mysql.query('select lang_id from users_languages where user_id = ?', [global.userId], function (err, results) {
            if (err) {
                throw err
            } else {
                const languagesId = results.map((e, i) => {
                    return e.lang_id
                })

                let sources = []

                languagesId.forEach((e, i) => {
                    mysql.query('select src from languages where id = ?', [e], function (err, results) {
                        if (err) {
                            throw err
                        } else if (languagesId.length === i + 1) {
                            sources.push(results[0])
                            res.send(sources)
                        } else {
                            sources.push(results[0])
                        }
                    })
                })

            }
        })
    },

    getNotLoggedUsers(req, res) {
        mysql.query('select * from users where id != ?', [global.userId], function (err, results) {
            if (err) {
                throw err
            } else {
                res.send(results)
            }
        })
    },

    getNotLoggedUsersLanguages(req, res) {
        mysql.query('select lang_id, user_id from users_languages where user_id != ?', [global.userId], function (err, results) {
            if (err) {
                throw err
            } else {
                const languagesId = results.map((e, i) => {
                    return {
                        lang_id: e.lang_id,
                        user_id: e.user_id
                    }
                })

                const languagesSrc = []

                languagesId.forEach((e, i) => {
                    mysql.query('select src from languages where id = ?', [e.lang_id], function (err, results) {
                        if (err) {
                            throw err
                        } else {
                            const final = {
                                user_id: e.user_id,
                                lang_src: results[0].src
                            }

                            if (languagesId.length === i + 1) {
                                languagesSrc.push(final)
                                res.send(languagesSrc)
                            } else {
                                languagesSrc.push(final)
                            }



                        }
                    })
                })

            }
        })
    },

    getUserInterests(req, res) {
        mysql.query('select interest_id from users_interests where user_id = ?', [global.userId], (err, results) => {
            if (err) {
                throw err
            } else {
                res.send(results)
            }

        })
    },

    getUserLanguagesId(req, res) {
        mysql.query('select lang_id from users_languages where user_id = ?', [global.userId], function (err, results) {
            if (err) {
                throw err
            } else {
                res.send(results)
            }
        })
    },

    getUserLanguagesName(req, res) {
        mysql.query('select lang_id from users_languages where user_id = ?', [global.userId], function (err, results) {
            if (err) {
                throw err
            } else {
                const languagesIds = results.map(e => {
                    return e.lang_id
                })

                const languagesNames = []

                languagesIds.forEach((e, i) => {
                    mysql.query('select lang from languages where id = ?', [e], function (err, results) {
                        if (err) {
                            throw err
                        } else {
                            if (i + 1 === languagesIds.length) {
                                languagesNames.push(results[0].lang)
                                res.send(languagesNames)
                            } else {
                                languagesNames.push(results[0].lang)
                            }
                        }
                    })
                })
            }
        })
    },

    getFilteredUsers(req, res, next) {
        const filters = req.body.filter.length > 1 ? req.body.filter : [req.body.filter]
        const filteredUsersId = new Set()
        const filteredUsersIdRes = []

        filters.forEach((e, i) => {
            mysql.query('select user_id from users_interests where interest_id = ?', [e], (err, results) => {
                if (err) {
                    throw err
                } else {
                    results.forEach(e => {
                        if (e.user_id !== global.userId) {
                            filteredUsersId.add(e.user_id)
                        }
                    })

                    Array.from(filteredUsersId).forEach(e => {
                        filteredUsersIdRes.push({
                            user_id: e
                        })

                    })

                    if (i === filters.length - 1) {
                        res.send(filteredUsersIdRes)
                    }
                }
            })
        })

    },

    getUserFriends(req, res, next) {
        let friends = []
        let counter = 0
        mysql.query('select id from is_friends_with where user1_id = ? or user2_id = ?', [global.userId, global.userId], (err, results) => {
            if (err) {
                throw err
            } else {
                const friendshipId = results
                if(friendshipId.length == 0) {
                    res.send([])
                } else {
                    friendshipId.forEach((e, i) => {
                        mysql.query('select user1_id, user2_id from is_friends_with where id = ?', [e.id], (err, results) => {
                            if (err) {
                                throw err
                            } else {
                                results.forEach((e) => {
                                    if (e.user1_id != global.userId) {
                                        friends.push({ id: e.user1_id })
                                    } else {
                                        friends.push({ id: e.user2_id })
                                    }
                                })
    
                                if (i == friendshipId.length - 1) {
                                    friends.forEach((e, i1) => {
                                        mysql.query('select lang_id,user_id from users_languages where user_id = ?', [e.id], (err, results1) => {
                                            if (err) {
                                                throw err
                                            } else {
                                                mysql.query('select user_name,src from users where id = ?', [e.id], (err, results3) => {
                                                    if (err) {
                                                        throw err
                                                    } else {
                                                        results3.forEach((e2, i2) => {
                                                            e['user_name'] = e2.user_name
                                                            e['user_src'] = e2.src
                                                        })
                                                        e['src'] = []
                                                        results1.forEach((elem, i3) => {
                                                            mysql.query('select src from languages where id = ?', [elem.lang_id], (err, results2) => {
                                                                if (err) {
                                                                    throw err
                                                                } else {
                                                                    results2.forEach((el, i9) => {
                                                                        if (elem.user_id == e.id) {
                                                                            e['src'].push(el.src)
                                                                            if (i1 == friends.length - 1) {
                                                                                counter++
                                                                            }
    
                                                                        }
    
                                                                        if (i1 == friends.length - 1 && counter == results1.length) {
                                                                            res.send(friends)
                                                                        }
                                                                    })
    
    
    
                                                                }
                                                            })
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    })
                                }
                            }
                        })
                    })
                }
                
            }
        })
    },

    createLink(req, res, next) {
        let chatters = { user: null, friend: null, id: uuidV4() }
        mysql.query('select id from users where id = ?', [global.userId], (err, results) => {
            if (err) {
                throw err
            } else {
                results.forEach((e, i) => {
                    chatters.user = e.id
                })

                mysql.query('select id from users where id = ?', [req.body.friendId], (err, results) => {
                    if (err) {
                        throw err
                    } else {
                        results.forEach((e, i) => {
                            chatters.friend = e.id
                        })

                        mysql.query('select id from meetings_users where (participant1_id = ? or participant1_id = ?) and (participant2_id = ? or participant2_id = ?)', [chatters.user, chatters.friend, chatters.user, chatters.friend], (err, results) => {
                            if (err) {
                                throw err
                            } else {
                                if (results.length == 0) {
                                    mysql.query('insert into meetings(room_key) values(?)', [chatters.id], (err) => {
                                        if (err) {
                                            throw err
                                        } else {
                                            mysql.query('select id from meetings where room_key = ?', [chatters.id], (err, results) => {
                                                if (err) {
                                                    throw err
                                                } else {
                                                    mysql.query('insert into meetings_users(participant1_id, participant2_id, room_key) values(?,?,?)', [chatters.user, chatters.friend, results[0].id], (err) => {
                                                        if (err) {
                                                            console.log('Não foi possível registrar a sala.')
                                                            throw err
                                                        } else {
                                                            console.log("Sala registrada com sucesso.")
                                                            res.redirect('/friends')
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    mysql.query('update meetings set room_key = ? where id = ?', [chatters.id, results[0].id], (err, results) => {
                                        if (err) {
                                            console.log('Houve um erro ao atualizar a chave.')
                                            throw err
                                        } else {
                                            console.log('Chave atualizada com sucesso.')
                                            res.redirect('/friends')
                                        }
                                    })
                                }
                            }
                        })
                    }
                })

            }
        })
    },

    getKeys(req, res, next) {
        let keys = []
        mysql.query('select room_key, participant1_id, participant2_id from meetings_users where (participant1_id = ? or participant2_id = ?)', [global.userId, global.userId], (err, results1) => {
            if (err) {
                throw err
            } else {
                results1.forEach((e, i2) => {
                    keys.push({})
                    mysql.query('select room_key from meetings where id = ?', [e.room_key], (err, results) => {
                        if (err) {
                            throw err
                        } else {
                            results.forEach((e2, i) => {
                                keys[i2]['room_key'] = e2.room_key

                                mysql.query('select email from users where id = ?', [e.participant1_id], (err, results3) => {
                                    if (err) {
                                        throw err
                                    } else {
                                        
                                        keys[i2]['user1_email'] = results3[0].email
                                    }
                                })

                                mysql.query('select email from users where id = ?', [e.participant2_id], (err, results4) => {
                                    if (err) {
                                        throw err
                                    } else {
                                        keys[i2]['user2_email'] = results4[0].email

                                        if (i2 == results1.length - 1) {
                                            res.send(keys)
                                        }
                                    }
                                })
                            })
                        }
                    })
                })

            }
        })
    },

    sendMail(req, res, next) {
        let sender = null 
        let recipient = null
        mysql.query('select pw, email from users where id = ?', [global.userId], (err, results) => {
            if (err) {
                throw err
            } else {
                console.log(req.body.data)
                if(req.body.data[0] === results[0].email) {
                    sender = results[0].email
                    recipient = req.body.data[1] 
                } else {
                    sender = req.body.data[1]
                    recipient = req.body.data[0]
                }

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: sender,
                        pass: results[0].pw
                    }
                })

                let mailOptions = {
                    from: sender,
                    to: recipient,
                    subject: `Chat Invitation`,
                    text: `Hi! I'm inviting you to a chat! Heres the key: ${req.body.data[2]}`
                }

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('Email sent:' + info.response)
                    }
                })
                console.log(sender)
                console.log(recipient);
                res.redirect(`chat/${req.body.data[2]}`)
            }
        })
    },

    preapreRoom(req, res, next) {
        res.sendFile('C:/Users/Spidey/Documents/projeto-integrador/smallTalk/frontend/pages/chat-room.html')
        
    },
}