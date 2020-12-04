export async function getInfoUsers(attr) {
    let info  = await fetch('http://localhost:5005/getUser')
                            .then(results => results.json())
                            .then(data => {
                                return data
                            })
                            .catch(error => console.log(error))
    console.log(info)
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

// export async function getInfoDiscoverFilters() {
//     const filters = fetch('http://localhost:5005/discover')
//                         .then(results => { 
//                             console.log(results.text())
//                             results.json()
//                         })
//                         .then(data => {
//                             return data
//                         })
//                         .catch(error => {
//                             console.log(error);
//                         })

//     return filters
// }

export async function getInfoFilteredUsers() {
    const url = `${window.location.href}`
    console.log(url + 'teste');
    const filteredUsersId = await fetch('http://localhost:5005/getFilteredUsers')
                                    .then(results => results.json())
                                    .then(data => {
                                        return data
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                                     
    return filteredUsersId
}