import axios from 'axios'
import {checkDOMExists} from './utils'
import {createAutoComplete} from './autoComplete'

checkDOMExists('.input')
checkDOMExists('.dropdown')
checkDOMExists('.results')

export var fetchData = async searchTerm => {
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

export var fetchSingleMovie = async id => {
  var {data} = await axios.get('http://www.omdbapi.com/', {
    params: {
      // eslint-disable-next-line no-undef
      apikey: `${process.env.API_KEY}`,
      i: id,
    },
  })
  return data
}

createAutoComplete({
  root: document.querySelector('.autocomplete'),
  renderOption(movie) {
    var imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster
    return `
 <img src="${imgSrc}" />
      ${movie.Title}
	`
  },
  onOptionSelect(movie) {
    console.log(movie)
    movieTemplate(movie)
  },
  inputValue(movie) {
    return movie.Title
  },
  async fetchData(searchTerm) {
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
  },
})

export var movieTemplate = movieDetail => {
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
	<article class='notification is-primary>
	<p class='title'>${movieDetail.Awards}</p>
	<p class='subtitle'>Awards</p>
	</article>
	<article class='notification is-primary>
	<p class='title'>${movieDetail.BoxOffice}</p>
	<p class='subtitle'>Box Office</p>
	</article>
	<article class='notification is-primary>
	<p class='title'>${movieDetail.Metascore}</p>
	<p class='subtitle'>Meta Score</p>
	</article>
	<article class='notification is-primary>
	<p class='title'>${movieDetail.imdbRating}</p>
	<p class='subtitle'>IMDB Rating</p>
	</article>
	<article class='notification is-primary>
	<p class='title'>${movieDetail.imdbVotes}</p>
	<p class='subtitle'>IMDB Votes</p>
	</article>
	
	
	`

  document.querySelector('#summary').innerHTML = html
}
