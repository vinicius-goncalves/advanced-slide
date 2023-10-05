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

function toArray(arrayLike) {
    const map = Array.prototype.map
    return map.call(arrayLike, item => item)
}

export {
    hideElement,
    showElement,
    toArray
}