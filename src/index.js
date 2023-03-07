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
  return movies.map(movie => {
    displayMovieCard(movie)
  })
}

var displayMovieCard = movie => {
  const option = document.createElement('a')

  option.classList.add('dropdown-item')

  option.innerHTML = `
 <img src="${movie.Poster}" />
      ${movie.Title}
	`
  resultsWrapper.appendChild(option)
}

async function onInput(e) {
  console.log(e.target.value)
  const movies = await fetchMovies(e.target.value)
  dropdown.classList.add('is-active')

  displayMovies(movies)
}
