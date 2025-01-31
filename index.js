import { catsData } from './data.js'

let generateEmotion = document.getElementById('generate-emotion')
let generate = document.getElementById('generate')
let selectOption = document.getElementById('select-emotion')
let generateMeme = document.getElementById('generate-meme')
let alertMsg = document.getElementById('alert-msg')

generateEmotion.addEventListener('click', renderOptions)
generateMeme.addEventListener('click', renderMeme)


function renderMeme(e){
    const selectedEmotion = selectOption.value
    console.log(selectedEmotion)
    if (selectedEmotion === "none"){
        alertMsg.style.display = 'flex'
        return
    }
    alertMsg.style.display = 'none'
    const catObject = getSingleCatObject(selectedEmotion)
    generate.innerHTML += `<img src="./images/${catObject.image}">`
}

function getSingleCatObject(emotion){
    const catsArray = getMatchingCatsArray(emotion)
    console.log(catsArray)
    if (catsArray.length === 1){
        return catsArray[0]
    }
    else {
        const index = Math.floor(Math.random()* catsArray.length)
        return catsArray[index]
    }
}

function getMatchingCatsArray(emotion){
    const matchingArray = catsData.filter(function(cat){
        return cat.emotionTags.includes(emotion)
    })
    return matchingArray
}

function getEmotions(cats){
    const emotionArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionArray.includes(emotion)){
                emotionArray.push(emotion)
            }
        }
    }
    return emotionArray
}

function renderOptions(){
    const emotions = getEmotions(catsData)
    console.log(emotions)
    generateEmotion.style.display = 'none'
    generate.style.display = 'flex'
    let options = ``
    for (let emotion of emotions){
        options += `
                    <option value="${emotion}">
                        ${emotion}
                    </option>
                   `
    }
    selectOption.innerHTML += options
}
