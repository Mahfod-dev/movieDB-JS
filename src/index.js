import axios from 'axios'
import {debounce, checkDOMExists} from './utils'

checkDOMExists('.input')
checkDOMExists('.dropdown')
checkDOMExists('#results')

var fetchMovies = async searchTerm => {
  var {data} = await axios.get('http://www.omdbapi.com/', {
    params: {
      // eslint-disable-next-line no-undef
      apikey: `${process.env.API_KEY}`,
      s: searchTerm,
    },
  })

  if (data.Error) {
    return []
  }

  return data.Search
}

var root = document.querySelector('.autocomplete')

root.innerHTML = `
	
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>


`

var input = document.querySelector('input')
var dropdown = document.querySelector('.dropdown')
var resultsWrapper = document.querySelector('.results')

input.addEventListener('input', debounce(onInput, 2000))

var displayMovies = movies => {

	if (!movies.length) {
    dropdown.classList.remove('is-active')
    return
  }


  return movies.map(movie => {
    displayMovieCard(movie)
  })
}

var displayMovieCard = movie => {
  var option = document.createElement('a')
  var imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster

  option.classList.add('dropdown-item')

  option.innerHTML = `
 <img src="${imgSrc}" />
      ${movie.Title}
	`
  resultsWrapper.appendChild(option)
}

async function onInput(e) {
  resultsWrapper.innerHTML = ''

  var movies = await fetchMovies(e.target.value)
  dropdown.classList.add('is-active')

  displayMovies(movies)
}


document.addEventListener('click', e => {
if (!root.contains(e.target)) {
    dropdown.classList.remove('is-active')
  }
})
