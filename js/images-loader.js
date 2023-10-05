const images = document.querySelector('.images')

function createImageElement(src) {
    const img = new Image()
    img.setAttribute('src', src)
    return img
}

function loadImages() {
    for(let i = 1; i <= 4; i++) {
        const img  = createImageElement(`./images/image${i}.jpg`)
        images.appendChild(img)
    }
}

export default loadImages