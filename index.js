import { catsData } from './data.js'

let generateEmotion = document.getElementById('generate-emotion')
let selectOption = document.getElementById('select-emotion')

generateEmotion.addEventListener('click', renderOptions)

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
    selectOption.style.display = 'flex'
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
