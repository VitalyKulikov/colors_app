const cols = document.querySelectorAll('.col')

// implement changing colors when pressing space
document.addEventListener('keydown', event => {
  event.preventDefault()
  if (event.code.toLowerCase() === 'space') {
    setRandomColors()
  }
})

// processing clicks
document.addEventListener('click', event => {
  const type = event.target.dataset.type
  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i' ?
      event.target : event.target.children[0]
    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
    copyToClickBord(event.target.textContent)
  }
})

function copyToClickBord(text) {
  return navigator.clipboard.writeText(text)
}

// Set random column colors. If the column is locked, the color does not change.
function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : []

  cols.forEach((col, index) => {
    const isLock = col.querySelector('i').classList.contains('fa-lock')
    const text = col.querySelector('h2')
    const button = col.querySelector('button')

    if (isLock) {
      colors.push(text.textContent)
      return
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random()

    if (!isInitial) {
      colors.push(color)
    }


    text.textContent = color
    col.style.background = color

    setColorText(text, color)
    setColorText(button, color)
  })
  updateColorsHash(colors)
}

// Enter the name of the color
function setColorText(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}


// changing the hash string structure
function updateColorsHash(colors = []) {
  document.location.hash = colors.map((col) => {
    return  col.toString().substring(1)
  }).join('-')
}

// adding to hash
function getColorsFromHash() {
  if (document.location.hash.length > 1) {
   return  document.location.hash.substring(1).split('-')
     .map((color) => '#' + color)
  }
  return []
}

setRandomColors(true);