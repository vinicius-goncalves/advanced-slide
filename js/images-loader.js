import * as Utils from './utils.js'
import updateDots from './dots.js'

const imgsFiles = document.querySelector('input[type="file"]')
const imgsContainer = document.querySelector('.imgs')

const selectImgs = document.querySelector('[data-container="select-imgs"]')
const imgsSelected = document.querySelector('[data-container="imgs-selected"]')

function createImageElement(src) {
    const img = new Image()
    img.setAttribute('src', src)
    return img
}

function loadImages(imgs) {

    const imgsArr = Utils.toArray(imgs)
    const docFragment = document.createDocumentFragment()

    imgsArr.forEach(img => {
        const imgEl = createImageElement(URL.createObjectURL(img))
        docFragment.appendChild(imgEl)
    })

    imgsContainer.appendChild(docFragment)
}

imgsFiles.addEventListener('change', (event) => {

    const imgs = event.target.files

    loadImages(imgs)

    Utils.hideElement(selectImgs)
    Utils.showElement(imgsSelected)

    updateDots(imgs.length, 0)
})

export default loadImages