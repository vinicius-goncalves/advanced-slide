const dotsContainer = document.querySelector('.dots')

function createDot(index, activeDot = false) {
    const dot = document.createElement('span')
    dot.classList.add('dot')
    dot.classList.toggle('active-dot', activeDot)
    dot.setAttribute('data-dot', index)
    return dot
}

function createDots(amount, currIndex) {

    for(let i = 0; i < amount; i++) {
        const dot = createDot(i, currIndex === i)
        dotsContainer.appendChild(dot)
    }
}

function unmarkAllDots() {
    const dots = dotsContainer.children
    Array.of(...dots).forEach(dot => dot.classList.remove('active-dot'))
}

function getSpecifDot(index) {
    const dots = dotsContainer.children
    return [...dots].at(index)
}

function updateDots(amount, currIndex) {

    if(!dotsContainer.hasChildNodes()) {
        createDots(amount, currIndex)
        return
    }

    unmarkAllDots()
    const dot = getSpecifDot(currIndex)
    dot.classList.add('active-dot')
}

export default updateDots