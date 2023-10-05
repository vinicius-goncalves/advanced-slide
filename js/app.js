import loadImages from './images-loader.js'
loadImages()

const allImages = [...document.querySelectorAll('.images img')]

const buttons = document.querySelector('.buttons')
const previousBtn = buttons.querySelector('span[data-button="previous"]')
const nextBtn = buttons.querySelector('span[data-button="next"]')

let index = 0

function getElStyle(element) {
    if(!(element instanceof Element)) {
        return
    }

    const elStyle = element.style
    return elStyle
}

function hideElement(element) {
    const elStyle = getElStyle(element)
    elStyle.setProperty('display', 'none')
}

function showElement(element) {
    const elStyle = getElStyle(element)
    elStyle.removeProperty('display')
}

function createSwapAnimation(element, ...keyframes) {

    if(!(element instanceof Element)) {
        return
    }

    const animationOptions = {
        duration: 600,
        easing: 'cubic-bezier(1, .02, 0, .96)',
        delay: 0
    }

    element.animate(keyframes, animationOptions)
}

function createNextAnimation(element) {
    createSwapAnimation(element,
        { transform: 'translateX(0)' },
        { transform: 'translateX(-515px)' })
}

function createPreviousAnimation(element) {
    createSwapAnimation(element,
        { transform: 'translateX(-515px)' },
        { transform: 'translateX(0)' })
}

function getImagesFromCurrIndex(btnType) {

    const imgsLen = allImages.length

    if(btnType == 'next') {
        const currImage = allImages.at(index % imgsLen)
        const nextImage = allImages.at(++index % imgsLen)
        return { currImage, nextImage }
    }

    if(btnType == 'previous') {
        const currImage = allImages.at(index % imgsLen)
        const nextImage = allImages.at(--index + imgsLen % imgsLen)
        return { currImage, nextImage }
    }
}

function updateCurrSlide(btnType) {

    const { currImage, nextImage } = getImagesFromCurrIndex(btnType)

    switch(btnType) {
        case 'previous':

            showElement(nextImage)
            Array.of(currImage, nextImage).forEach(createPreviousAnimation)

            break

        case 'next':

            Array.of(currImage, nextImage).forEach(createNextAnimation)
            const [ currImageAnimation ] = currImage.getAnimations()
            currImageAnimation.onfinish = () => hideElement(currImage)

            break

        default:
    }
}

Array.of(previousBtn, nextBtn).forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.button
        updateCurrSlide(type)
    })
})