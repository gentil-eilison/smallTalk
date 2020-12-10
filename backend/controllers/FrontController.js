const mysql = require('../config')

module.exports = {
    getLoggedUser(req, res) {
        mysql.query('select * from users where id = ?', [global.userId], function (err, results) {
            res.send(results[0])
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

                friendshipId.forEach((e, i) => {
                    mysql.query('select user1_id, user2_id from is_friends_with where id = ?', [e], (err, results) => {
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
                                friends.forEach((e ,i1) => {
                                    mysql.query('select lang_id,user_id from users_languages where user_id = ?', [e.id], (err, results1) => {
                                        if (err) {
                                            throw err
                                        } else {
                                            results1.forEach((elem) => {
                                                mysql.query('select src from languages where id = ?', [elem.lang_id], (err, results2) => {
                                                    if (err) {
                                                        throw err
                                                    } else {
                                                        results2.forEach((el) => {
                                                            if (elem.user_id == e.id) {
                                                                    e[`lang_${elem.lang_id}`] = el.src
                                                            }
                                                        })
                                                        if(i1 == friends.length-1) {
                                                            counter++
                                                        }

                                                        if(counter == friends.length) {
                                                            res.send(friends)
                                                        }
                                                        
                                                    }
                                                })
                                       
                                            })     
                                        }
                                    })
                                })
                            }

                        }
                    })
                })
            }
        })
    }

}