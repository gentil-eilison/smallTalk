import { getInfoUsers, getInfoSrcUsersLanguages } from './fetch.js'

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