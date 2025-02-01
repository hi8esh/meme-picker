import { catsData } from './data.js'

const generateEmotion = document.getElementById('generate-emotion')
const generate = document.getElementById('generate')
const selectOption = document.getElementById('select-emotion')
const generateMeme = document.getElementById('generate-meme')
const alertMsg = document.getElementById('alert-msg')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
const memeModalMain = document.getElementById('meme-modal-main')
const gifsOnlyCheck = document.getElementById('gifs-only-check')

generateEmotion.addEventListener('click', renderOptions)
generateMeme.addEventListener('click', renderMeme)
memeModalCloseBtn.addEventListener('click', closeModal)

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

function renderMeme(e){
    const selectedEmotion = selectOption.value
    console.log(selectedEmotion)
    if (selectedEmotion === "none"){
        alertMsg.style.display = 'flex'
        return
    }
    alertMsg.style.display = 'none'
    const catObject = getSingleCatObject(selectedEmotion)
    console.log(catObject)
    memeModalMain.innerHTML = `
                                <img class="meme-img"
                                 src="./images/${catObject.image}"
                                 alt="${catObject.alt}"
                                 >
                              `
    memeModal.style.display = 'flex'
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
    const isGif = gifsOnlyCheck.checked
    const matchingArray = catsData.filter(function(cat){
        if(isGif){
            return cat.emotionTags.includes(emotion) && cat.isGif
        }
        else{
            return cat.emotionTags.includes(emotion)
        }
    })
    return matchingArray
}

function closeModal(){
    memeModal.style.display = 'none'
}