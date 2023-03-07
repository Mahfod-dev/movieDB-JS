import axios from 'axios'
const input = document.querySelector('input')

var fetchMovies = async searchTerm => {
  var {data} = await axios.get('http://www.omdbapi.com/', {
    params: {
      // eslint-disable-next-line no-undef
      apikey: `${process.env.API_KEY}`,
      s: searchTerm,
    },
  })
  console.log(data)
}

var debounce = (func, delay = 1000) => {
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

function onInput(e) {
  fetchMovies(e.target.value)
}

input.addEventListener('input', debounce(onInput, 2000))

fetchMovies()
