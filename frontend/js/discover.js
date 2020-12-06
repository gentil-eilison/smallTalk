import {getInfoUsers, getInfoNotLoggedUsers, getInfoSrcUsersLanguages, getInfoNotLoggedUsersLanguages} from './fetch.js'

async function updateUserLanguages() {
    const languages = await getInfoSrcUsersLanguages()

    languages.forEach(e => {
        $('.body-container .profile-item .heading .languages').append(`<img src="${e.src}" alt="france-flag" width="50px" height="50px">`)
    })
}

async function updateDiscoverArea() {
    const notLoggedUsers = await getInfoNotLoggedUsers()
    const users_languages = await getInfoNotLoggedUsersLanguages()

        notLoggedUsers.forEach((e, i) => {
        const user_id_r = e.id
        const notLoggedUserId = e.id
        const profile_pic = e.src ? e.src : '/profile_01.svg'
    
        $('.discover-area').append(`<div class="friend-item" id="${e.id}"></div>`)
        $(`.discover-area .friend-item[id=${e.id}]`).append('<div class="heading"></div>')
        $(`.discover-area .friend-item[id=${e.id}] .heading`).append('<div class="title"></div>')
        $(`.discover-area .friend-item[id=${e.id}] .heading .title`).append('<img src="" alt="profile-pic" width="75px" height="75px"></img>')
        $(`.discover-area .friend-item[id=${e.id}] .heading .title`).append('<span>')
        $(`.discover-area .friend-item[id=${e.id}] .heading`).append('<div class="languages"></div>')
    
        const notLoggedUserLanguages = []
    
        users_languages.forEach(e => {
            if(e.user_id === notLoggedUserId) {
                notLoggedUserLanguages.push(e.lang_src)
            }
        })
    
        if(notLoggedUserLanguages.length !== 0) {
            notLoggedUserLanguages.forEach((e, i) => {
                $(`.discover-area .friend-item[id=${user_id_r}] .heading .languages`).append(`<img src="" ${i} alt="lang-flag" width="50px" height="50px"></img>`)
    
                $(`.discover-area .friend-item[id=${user_id_r}] .heading .languages img[${i}]`).attr('src', `${e}`)
    
            })
        }      
    
        $(`.discover-area .friend-item[id=${e.id}]`).append('<div class="footer"></div>')
        $(`.discover-area .friend-item[id=${e.id}] .footer`).append('<button class="profile-button">')
        $(`.discover-area .friend-item[id=${e.id}] .footer`).append('<button class="add-button">')
            
        $(`.discover-area .friend-item[id=${e.id}] .heading .title img`).attr('src', `/img/${profile_pic}`)
        $(`.discover-area .friend-item[id=${e.id}] .heading .title span`).text(e.user_name)
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


$('#filtros').submit(function(e) {
    e.preventDefault()
    let url = $(this).attr('action')
    let data = $('input[name="filter"]:checked')

    console.log(url, Array.from(data))

    $.post(url, data, function(res) {
            const ids = Array.from(document.querySelectorAll('.friend-item'))
            const results = []

            // res.forEach(e => {
            //     console.log(e.user_id);
            // })
            // ids.forEach(element => {
            //     console.log(element.id);
            // })

            res.forEach(e => {
                ids.forEach(element => {
                    if(e.user_id == element.id) {
                        results.push(element.id)
                    }
                })
            })

            results.forEach(id => {
                $(`.friend-item[id=${id}]`).addClass('interested')
            })

            const notInterested = Array.from($(`.friend-item`).not('.interested'))

            notInterested.forEach(element => {
                element.style.display = 'none'
            })
    })

})

