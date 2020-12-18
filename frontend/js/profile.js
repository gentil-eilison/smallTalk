import {getInfoUsers, getInfoSrcUsersLanguages, getInfoUserInterests, getInfoUserLanguagesId, getInfoUserLanguagesName, getInfoFriendProfile} from './fetch.js'

// let clicked = false 

// $.fn.toggleAttr = function (attr, value, preValue) {
//     const pv = preValue
//     if(clicked === false) {
//         $(this).on('click', function() {
//             $(this).attr(`${attr}`, `${value}`)
//             clicked = true 
//         })
//     } else {
//         $(this).on('click', function () {
//             $(this).attr(`${attr}`, `${pv}`) 
//             clicked = false
//         })
             
//     }
// }

// Functions 

async function updateScreen() {

    const isFriendProfile = window.location.href.indexOf('friendProfile') != -1 ? true : false

        if(isFriendProfile) {
            const friendProfileInfo = await getInfoFriendProfile()

            const friendProfileItem = friendProfileInfo.img_src != null && friendProfileInfo.img_src != '' ? friendProfileInfo.img_src : '/profile_01.svg' 
    
            $('[nome]').text(friendProfileInfo.user_name)
            $('textarea').text(friendProfileInfo.bio)
            $('[icon]').attr('src', `/img/${friendProfileItem}`)
            friendProfileInfo.interests_id.forEach((e, i) => {
                $(`label[interest][for="${e}"]`).toggleClass('interested')
            })

            friendProfileInfo.langs_src.forEach((e, i) => {
                $(`.languages-container`).append(`<img spoken-lang-${i} class="rounded-circle ml-2" width="60px" height="60px"></img>`)

                $(`[spoken-lang-${i}]`).attr('src', `${e}`)
             })
        } else {
            let interests = await getInfoUserInterests()
            const userInfo = {
                user_name: await getInfoUsers('user_name'),
                bio: await getInfoUsers('bio'),
                icon: await getInfoUsers('src'),
            }

            const profileItem = userInfo.icon != null && userInfo.icon != '' ? userInfo.icon : '/profile_01.svg'
    
            $('[nome]').text(userInfo.user_name)
            $('textarea').text(userInfo.bio)
            $('[icon]').attr('src', `/img/${profileItem}`)
            interests.forEach((e, i) => {
                $(`label[interest][for="${e.interest_id}"]`).toggleClass('interested')
            })

            updateProfileLanguages()
        }
    
}   

updateScreen()

async function updateProfileLanguages() {
    const sources = await getInfoSrcUsersLanguages()

    sources.forEach((e, i) => {
        $(`.languages-container`)
        .append(`<img spoken-lang-${i} class="rounded-circle ml-2" width="60px" height="60px"></img>`)

        $(`[spoken-lang-${i}]`).attr('src', `${e.src}`)
    })
}

async function populateRemoveLanguagesForm() {
    const languagesId = await getInfoUserLanguagesId()
    const languagesNames = await getInfoUserLanguagesName()
    const langaugesSrc = await getInfoSrcUsersLanguages()

    console.log(langaugesSrc);

    languagesId.forEach((e, i) => {
        $('[remove-lang-form] form').prepend(`<div class="form-group ml-3 ${i}">`)
        $(`[remove-lang-form] form .form-group.${i}`).append(`<input type="checkbox" name="lang" value=${e.lang_id} id="lang">`).append(`<label for="language">${languagesNames[i]}</label>`).append(`<img src="${langaugesSrc[i].src}" alt="lang-flag" height="30px"></img>`).append('</br>')
    })
    
}

populateRemoveLanguagesForm()

// Dinamics Control

const url = window.location.href 
const checkFriendProfile = url.split('/')[3]

if(checkFriendProfile != "friendProfile") {
    $('[interest]').each((i, e) => {
        const attr_value = $(e).attr('name')
        
        $(e).on('click', function(e) {
            if($(this).hasClass('interested')) {
                $(this).removeClass('interested')
                $(this).attr('name', null)
            } else {
                $(this).addClass('interested')
                $(this).attr('name', `${attr_value}`)
            }
        })
    })
}

$('input[value="EXCLUIR CONTA"]').on('click', () => {
    $('[confirm]').show()
})

$('[deny]').on('click', () => {
    $('[confirm]').hide()
})

$('input[value="ALTERAR SENHA"]').on('click', () => {
    $('[confirm-p]').show()
})

$('input[value="Cancelar"]').on('click', () => {
    $('[confirm-p]').hide()
})

$('input[value="ADICIONAR"]').on('click', () => {
    $('[lang-form]').removeClass('hidden')
})

$('[lang-cancel]').on('click', () => {
    $('[lang-form]').addClass('hidden')
})

$('input[value="REMOVER"]').on('click', () => {
    $('[remove-lang-form]').removeClass('hidden')
})

$('[lang-cancel]').on('click', () => {
    $('[remove-lang-form]').addClass('hidden')
})