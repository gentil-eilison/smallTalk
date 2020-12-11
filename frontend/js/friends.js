import { getInfoUsers, getInfoSrcUsersLanguages, getInfoUserFriends } from './fetch.js'

async function updateFriends() {
    let userLanguage = 0
    const userFriends = await getInfoUserFriends()
    
    console.log(userFriends)

    userFriends.forEach(function(e,i) {
        $('[amigos]').append(`<div friend-${i} style="border: 3px solid #c4c4c4; background-color: #f0e4e4;" class="mx-auto col-12 my-4 rounded container-fluid"><div class="row vishkk"><div class="rounded-circle col-5 my-3 ml-3" friend-icon><img src="img/${e.user_src}" alt=""></div><div class="ml-3 my-3 col-5 overflow-auto" nickname>${e.user_name}</div><div language-container class="col-10 mx-auto d-flex justify-content-around"></div></div><div class="row"><form method="GET" class="mt-4"><input type="submit" value="Perfil" formaction="/profile" class="botao-verde py-1 px-3 ml-3 mb-3"><input type="submit" value="Marcar Chat" class="botao-vermelho py-1 px-3 mx-auto"></form></div></div>`) 

        userLanguage = e.src.length

        for(let index=0; index < userLanguage; index++) {
            $(`[amigos] [friend-${i}] .vishkk [language-container]`).append(`<div language class="bg-white rounded-circle align-self-center"><img src="${e.src[index]}" alt=""></div>`)
        }
        
    })

    

    
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
