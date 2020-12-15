// imports do fetch API

import {getInfoUsers, getInfoNotLoggedUsers, getInfoSrcUsersLanguages, getInfoNotLoggedUsersLanguages, getInfoUserFriends} from './fetch.js'

// Funções próprias para buscar dados dos usuários

async function updateUserLanguages() {
    const languages = await getInfoSrcUsersLanguages()

    languages.forEach(e => {
        $('.body-container .profile-item .heading .languages').append(`<img src="${e.src}" alt="france-flag" width="50px" height="50px">`)
    })
}

// Funções para atualizar a página

async function updateDiscoverArea() {
    const notLoggedUsers = await getInfoNotLoggedUsers()
    const users_languages = await getInfoNotLoggedUsersLanguages()
    const userFriends = await getInfoUserFriends()

        notLoggedUsers.forEach((e, i) => {
            // Dados sobre os amigos
            let isFriend = false
            const user_id_r = e.id
            const notLoggedUserId = e.id
            const profile_pic = e.src ? e.src : '/profile_01.svg'


            // Criando o modelo dos cards: parte superior e container das languages
            $('.discover-area').append(`<div class="friend-item" id="${e.id}"></div>`)
            $(`.discover-area .friend-item[id=${e.id}]`).append('<div class="heading"></div>')
            $(`.discover-area .friend-item[id=${e.id}] .heading`).append('<div class="title"></div>')
            $(`.discover-area .friend-item[id=${e.id}] .heading .title`).append('<img src="" alt="profile-pic" width="75px" height="75px"></img>')
            $(`.discover-area .friend-item[id=${e.id}] .heading .title`).append('<span>')
            $(`.discover-area .friend-item[id=${e.id}] .heading`).append('<div class="languages"></div>')
    
            // Populando as languages
            const notLoggedUserLanguages = []
    
            users_languages.forEach(e => {
                if(e.user_id === notLoggedUserId) {
                    notLoggedUserLanguages.push(e.lang_src)
                }
            })
    
            // Inserindo no HTML
            if(notLoggedUserLanguages.length !== 0) {
                notLoggedUserLanguages.forEach((e, i) => {
                    $(`.discover-area .friend-item[id=${user_id_r}] .heading .languages`).append(`<img src="" ${i} alt="lang-flag" width="50px" height="50px"></img>`)
    
                    $(`.discover-area .friend-item[id=${user_id_r}] .heading .languages img[${i}]`).attr('src', `${e}`)
    
                })
            }      
    
            // Form para adicionar/ver perfil.
            $(`.discover-area .friend-item[id=${e.id}]`).append('<div class="footer"></div>')
            $(`.discover-area .friend-item[id=${e.id}] .footer`).append('<form method="POST">').append('</form>')
            $(`.discover-area .friend-item[id=${e.id}] .footer form`).append(`<input type="hidden" name="id" value="${e.id}">`)
            $(`.discover-area .friend-item[id=${e.id}] .footer form`).append(`<input type="submit" class="profile-button" formaction="/friendProfile/${e.id}" value="Perfil">`)

            for(let friend of userFriends) {
                if(friend.id == notLoggedUserId) {
                    isFriend = true
                    break
                }
            }

            if(isFriend) {
                $(`.discover-area .friend-item[id=${e.id}] .footer form`).append('<input type="submit" class="add-button" formaction="/addFriend" value="Remover">')
                $(`.discover-area .friend-item[id=${e.id}] .footer form .add-button`).css('background', '#EEE').css('color', '#DC1C1C').css('font-weight', 'bold')
            }  else {
                $(`.discover-area .friend-item[id=${e.id}] .footer form`).append('<input type="submit" class="add-button" formaction="/addFriend" value="Adicionar">')
            }
        
            
            $(`.discover-area .friend-item[id=${e.id}] .heading .title img`).attr('src', `/img/${profile_pic}`)
            $(`.discover-area .friend-item[id=${e.id}] .heading .title span`).text(e.user_name)

        })        
}

async function updateScreen() {
    $('.body-container .profile-item .heading .title span')
        .text(await getInfoUsers('user_name'))

    $('.body-container .profile-item .heading .title img').attr('src', `/img/${await getInfoUsers('src')}`)

    updateUserLanguages()

    updateDiscoverArea()

}

// Esconder os usuários não selecionados

$('#filtros').submit(function(e) {
    e.preventDefault()
    let url = $(this).attr('action')
    let data = $('input[name="filter"]:checked')

    console.log(url, Array.from(data))

    $.post(url, data, function(res) {
            const ids = Array.from(document.querySelectorAll('.friend-item'))
            const results = []

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

// Chamada de funções

updateScreen()

