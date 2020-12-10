import { getInfoUsers, getInfoSrcUsersLanguages, getInfoUserFriends } from './fetch.js'

async function updateFriends() {
    const usersInfo = []
    const usersLang = []

    const userFriends = await getInfoUserFriends()
    console.log(userFriends)
    
    
    

    // $('#amigos').append(`<div friend class="mx-auto col-9 my-4 rounded container-fluid"><div class="row"><div class="rounded-circle bg-dark col-3 my-3 ml-3" friend-icon></div><div class="ml-3 my-3 col-7 overflow-auto" nickname></div></div><div class="row"><form method="GET" class="mt-4"><input type="submit" value="Perfil" formaction="/profile" class="botao-verde py-1 px-3 ml-3 mb-3"><input type="submit" value="Marcar Chat" class="botao-vermelho py-1 px-3 mx-auto"></form></div></div>`)
    
}

async function updateScreen() {
    $('[icon]').attr('src', `/img/${await getInfoUsers('src')}`)
    $('[nome]').text(`${await getInfoUsers('user_name')}`)

    const data = await getInfoSrcUsersLanguages()
    const lang = []
    data.forEach(function(e) {
        lang.push(e.src)
    })

    console.log(lang)

    lang.forEach(function(e, i) {
        let element = $(`<div idioma class="align-self-center rounded-circle mx-auto my-2"><img src="${e}" alt="idioma"></div>`)
        $('[idiomas]').append(element)

    })
}


updateScreen()
updateFriends()
