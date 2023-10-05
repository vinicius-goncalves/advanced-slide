await import('./images-loader.js')

import * as Utils from './utils.js'
import updateDots from './dots.js'

let index = 0

const buttons = document.querySelector('.buttons')
const previousBtn = buttons.querySelector('span[data-button="previous"]')
const nextBtn = buttons.querySelector('span[data-button="next"]')

const btnsArray = [previousBtn, nextBtn]

function getAllImages() {
    const imgsContainer = document.querySelector('.imgs')
    const imgs = imgsContainer.querySelectorAll('img')
    return [...imgs]
}

function disablePointerEvents(el) {
    const elStyle = el.style
    elStyle.setProperty('pointer-events', 'none')
}

function enablePointerEvents(el) {
    const elStyle = el.style
    elStyle.setProperty('pointer-events', 'auto')
}

function createSwapAnimation(element, ...keyframes) {

    if(!(element instanceof Element)) {
        return
    }

    const animationOptions = {
        duration: 600,
        easing: 'cubic-bezier(1, .27, 0, 1)',
        delay: 0
    }

    btnsArray.forEach(disablePointerEvents)

    const animation = element.animate(keyframes, animationOptions)
    animation.onfinish = () => btnsArray.forEach(enablePointerEvents)
}

function createPreviousAnimation(element) {
    createSwapAnimation(element,
        { transform: 'translateX(-515px)' },
        { transform: 'translateX(0)' })
}

function createNextAnimation(element) {

    createSwapAnimation(element,
        { transform: 'translateX(0)' },
        { transform: 'translateX(-515px)' })
}

function updateButtonsVisibility(currIndex = index) {

    const allImages = getAllImages()

    const showPreviousBtn = currIndex <= 0 ? 'none' : 'block'
    const showNextBtn = currIndex == allImages.length - 1 ? 'none' : 'block'

    const entries = new Map([
        [ previousBtn, showPreviousBtn ],
        [ nextBtn, showNextBtn ]
    ])

    for(const [ btn, visibility ] of entries) {
        btn.style.display = visibility
    }
}

function getImagesFromCurrIndex(btnClicked) {

    const allImages = getAllImages()
    const imgsLen = allImages.length

    const indexPrevision = btnClicked == 'next' ? index + 1 : index - 1
    updateButtonsVisibility(indexPrevision)

    if(btnClicked == 'next') {

        const currImage = allImages.at(index % imgsLen)
        const nextImage = allImages.at(++index % imgsLen)

        return { currImage, nextImage }
    }

    if(btnClicked == 'previous') {

        const currImage = allImages.at(index % imgsLen)
        const nextImage = allImages.at(--index + imgsLen % imgsLen)

        return { currImage, nextImage }
    }
}

function updateCurrSlide(btnClicked) {

    const allImages = getAllImages()

    const images = getImagesFromCurrIndex(btnClicked, index)

    if(!images) {
        return
    }

    const { currImage, nextImage } = images

    if(btnClicked == 'previous') {
        Utils.showElement(nextImage)
        Array.of(currImage, nextImage).forEach(createPreviousAnimation)
    }

    if(btnClicked === 'next') {
        Array.of(currImage, nextImage).forEach(createNextAnimation)

        const [ currImageAnimation ] = currImage.getAnimations()
        currImageAnimation.onfinish = () => Utils.hideElement(currImage)
    }

    setTimeout(() => updateDots(allImages.length, index), 300)
}

Array.of(previousBtn, nextBtn).forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.button
        updateCurrSlide(type)
    })
})

window.addEventListener('DOMContentLoaded', () => {
    updateButtonsVisibility()
})

export {
    updateCurrSlide
}