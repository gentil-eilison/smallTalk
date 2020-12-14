export async function getInfoUsers(attr) {
    let info  = await fetch('http://localhost:5005/getUser')
                            .then(results => results.json())
                            .then(data => {
                                return data
                            })
                            .catch(error => console.log(error))
    return info[`${attr}`]
}

export async function getInfoNotLoggedUsers() {
    const users = await fetch('http://localhost:5005/getNotLoggedUsers')
                            .then(results => results.json())
                            .then(data => {
                                return data
                            })
                            .catch(error => console.log(error))
                
    return users
}

export async function getInfoNotLoggedUsersLanguages() {
    const users_languages = await fetch('http://localhost:5005/getNotLoggedUsersLanguages')
                                    .then(results => results.json())
                                    .then(data => {
                                        return data
                                    })
                                    .catch(error => console.log(error))
    
    return users_languages
}

export async function getInfoSrcUsersLanguages() {
    const langSources = await fetch('http://localhost:5005/getUserLanguages')  
                                    .then(results => results.json())
                                    .then(data => {
                                        return data
                                    })
                                    .catch(error => console.log(error))
    
    return Object.values(langSources)
}

export async function getInfoUserInterests() {
    const interests = await fetch('http://localhost:5005/getUserInterests')
                                  .then(results => results.json())
                                  .then(data => {
                                      return data 
                                  })
                                  .catch(error => console.log(error))
    return Object.values(interests)
}

export async function getInfoUserLanguagesId() {
    const languagesId = fetch('http://localhost:5005/getUserLanguagesId')
                            .then(results => results.json())
                            .then(data => {
                                return data
                            })
                            .catch(error => console.log(error))
    
    return languagesId
}

export async function getInfoUserLanguagesName() {
    const languagesNames = fetch('http://localhost:5005/getUserLanguagesName')
                            .then(results => results.json())
                            .then(data => {
                                return data
                            })
                            .catch(error => console.log(error))
            
    return languagesNames
}

export async function getInfoUserFriends() {
    const userFriends = fetch('http://localhost:5005/getUserFriends')
                            .then(results => results.json())
                            .then(data => {
                                return data 
                            })
                            .catch(err => console.log(err))
    return userFriends
}

export async function getKeys() {
    const keys = fetch('http://localhost:5005/getKeys')
                     .then(results => results.json())
                     .then(data => {
                         return data 
                     })
                     .catch(err => console.log(err))
    return keys 
export async function getInfoFriendProfile() {
    const url = window.location.href 
    const newUrl = url.split('/')
    let finalUrl = ""

    newUrl[3] = "profile"

    newUrl.forEach((e, i) => {
        if(i === newUrl.length - 1) {
            finalUrl += e
        } else {
            finalUrl += e + "/"
        }
        
    })

    const friendProfileInfo = await fetch(finalUrl)
                                .then(res => res.json())
                                .then(data => {
                                    return data
                                })

    return friendProfileInfo
}