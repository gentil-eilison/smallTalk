const mysql = require('../config')

module.exports = {
    getLoggedUser(req, res, next) {
        mysql.query('select * from users where id = ?', [global.userId] ,function(err, results) {
            res.send(results[0])
        })
    },

    getUserLanguages(req, res, next) {
        mysql.query('select lang_id from users_languages where user_id = ?', [global.userId], function(err, results) {
            if(err) {
                throw err
            } else {
                const languagesId = results.map((e, i) => {
                    return e.lang_id
                })  
                
                let sources = []

                languagesId.forEach((e, i) => {
                    mysql.query('select src from languages where id = ?', [e], function(err, results) {
                        if(err) {
                            throw err
                        } else if(languagesId.length === i + 1) {
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

    getNotLoggedUsers(req, res, next) {
        mysql.query('select * from users where id != ?', [global.userId], function(err, results) {
            if(err) {
                throw err
            } else {
                res.send(results)
            }
        }) 
    },

    getNotLoggedUsersLanguages(req, res, next) {
        mysql.query('select lang_id, user_id from users_languages where user_id != ?', [global.userId], function(err, results) {
            if(err) {
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
                    mysql.query('select src from languages where id = ?', [e.lang_id], function(err, results) {
                        if(err) {
                            throw err
                        } else {
                            const final = {
                                user_id: e.user_id,
                                lang_src: results[0].src
                            }

                            if(languagesId.length === i + 1) {
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

    getUserInterests(req, res, next) {
        mysql.query('select interest_id from users_interests where user_id = ?', [global.userId], (err, results) => {
            if(err) {
                throw err 
            } else {
                res.send(results)
            } 

        })
    },

    getUserLanguagesId(req, res, next) {
        mysql.query('select lang_id from users_languages where user_id = ?', [global.userId], function(err, results) {
            if(err) {
                throw err
            } else {
                res.send(results)
            }
        })
    },

    getUserLanguagesName(req, res, next) {
        mysql.query('select lang_id from users_languages where user_id = ?', [global.userId], function(err, results) {
            if(err) {
                throw err
            } else {
                const languagesIds = results.map(e => {
                    return e.lang_id
                })
                
                const languagesNames = []

                languagesIds.forEach((e, i) => {
                    mysql.query('select lang from languages where id = ?', [e], function(err, results) {
                        if(err) {
                            throw err
                        } else {
                            if(i + 1 === languagesIds.length) {
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
        // const filters = req.query
        console.log(req.query);
        const {filter} = req.query
        const filtersId = []
        const filteredUsersId = new Set()
        let filteredUsersIdObj = new Array()

        if(filter !== undefined) {
            filter.forEach(e => {
                mysql.query('select id from interests where topic = ?', [e], (err, results) => {
                    if(err) {
                        throw err
                    } else {
                        filtersId.push(results[0].id)
                    }
                
                filtersId.forEach((e,i) => {
                    mysql.query('select user_id from users_interests where interest_id = ?', [e], (err, results) =>{
                        if(err) {
                            throw err
                        } else {
                            results.forEach(e => {
                                if(e.user_id !== global.userId) {
                                    filteredUsersId.add(e)
                                    console.log(filteredUsersId);
                                }
                            })

                            filteredUsersIdObj = [...filteredUsersId]

                            if(i === filtersId.length - 1) {
                                res.send(JSON.stringify(filteredUsersId))
                            }
                            
                        }
                    })
                })
    
                })
            })
        } else {
            res.send(null)
        }
    }

}