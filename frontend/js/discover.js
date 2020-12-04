import {getInfoUsers, getInfoNotLoggedUsers, getInfoSrcUsersLanguages, getInfoNotLoggedUsersLanguages ,getInfoFilteredUsers} from './fetch.js'

async function updateUserLanguages() {
    const languages = await getInfoSrcUsersLanguages()

    languages.forEach(e => {
        $('.body-container .profile-item .heading .languages').append(`<img src="${e.src}" alt="france-flag" width="50px" height="50px">`)
    })
}

async function updateDiscoverArea() {
    const notLoggedUsers = await getInfoNotLoggedUsers()
    const users_languages = await getInfoNotLoggedUsersLanguages()
    
    
    if(window.location.href.indexOf('?') !== -1) {
        const filteredUsersId = await getInfoFilteredUsers()
        console.log(filteredUsersId);
    }
 
    notLoggedUsers.forEach((e, i) => {
        const index = i
        const notLoggedUserId = e.id
        const profile_pic = e.src ? e.src : '/profile_01.svg'


        $('.discover-area').append(`<div class="friend-item" ${i}></div>`)
        $(`.discover-area .friend-item[${i}]`).append('<div class="heading"></div>')
        $(`.discover-area .friend-item[${i}] .heading`).append('<div class="title"></div>')
        $(`.discover-area .friend-item[${i}] .heading .title`).append('<img src="" alt="profile-pic" width="75px" height="75px"></img>')
        $(`.discover-area .friend-item[${i}] .heading .title`).append('<span>')
        $(`.discover-area .friend-item[${i}] .heading`).append('<div class="languages"></div>')

        const notLoggedUserLanguages = []

        users_languages.forEach(e => {
            if(e.user_id === notLoggedUserId) {
                notLoggedUserLanguages.push(e.lang_src)
            }
        })

        if(notLoggedUserLanguages.length !== 0) {
            notLoggedUserLanguages.forEach((e, i) => {
                $(`.discover-area .friend-item[${index}] .heading .languages`).append(`<img src="" ${i} alt="lang-flag" width="50px" height="50px"></img>`)

                $(`.discover-area .friend-item[${index}] .heading .languages img[${i}]`).attr('src', `${e}`)

            })
        }

        $(`.discover-area .friend-item[${i}]`).append('<div class="footer"></div>')
        $(`.discover-area .friend-item[${i}] .footer`).append('<button class="profile-button">')
        $(`.discover-area .friend-item[${i}] .footer`).append('<button class="add-button">')
        
        $(`.discover-area .friend-item[${i}] .heading .title img`).attr('src', `/img/${profile_pic}`)
        $(`.discover-area .friend-item[${i}] .heading .title span`).text(e.user_name)
        $(`.discover-area .friend-item .footer .profile-button`).text('Visualizar')
        $(`.discover-area .friend-item .footer .add-button`).text('Adicionar')
        
    })
}


async function updateScreen() {
    $('.body-container .profile-item .heading .title span')
        .text(await getInfoUsers('user_name'))

    $('.body-container .profile-item .heading .title img').attr('src', `/img/${await getInfoUsers('src')}`)

    updateUserLanguages()

    updateDiscoverArea()

}

updateScreen()
