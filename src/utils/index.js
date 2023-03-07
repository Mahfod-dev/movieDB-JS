export var debounce = (func, delay = 1000) => {
  var timeoutId
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args)
    }, delay)
  }
}

export function checkDOMExists(selector) {
  if (document.querySelector(selector)) {
    return console.log(`${selector} is valid`)
  } else {
    return console.log(`${selector} is not valid`)
  }
}
