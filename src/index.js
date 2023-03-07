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

var fetchSingleMovie = async id => {
  var {data} = await axios.get('http://www.omdbapi.com/', {
    params: {
      // eslint-disable-next-line no-undef
      apikey: `${process.env.API_KEY}`,
      i: id,
    },
  })
  return data
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

 var displayMovieCard =  movie => {
  var option = document.createElement('a')
  var imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster

  option.classList.add('dropdown-item')

  option.innerHTML = `
 <img src="${imgSrc}" />
      ${movie.Title}
	`

  option.addEventListener('click',async () => {
    dropdown.classList.remove('is-active')
    input.value = movie.Title

    const singleMovie = await fetchSingleMovie(movie.imdbID)
	movieTemplate(singleMovie)
  })

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

var movieTemplate = (movieDetail)=>{

	var html = `
	   <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
	
	
	`

	document.querySelector('#summary').innerHTML = html

}
