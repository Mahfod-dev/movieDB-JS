// var root = document.querySelector('.autocomplete')
import {debounce} from './utils'
import {fetchSingleMovie} from '.'

export var createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
	
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>


`

  var input = root.querySelector('input')
  var dropdown = root.querySelector('.dropdown')
  var resultsWrapper = root.querySelector('.results')

  input.addEventListener('input', debounce(onInput, 2000))

  var displayMovies = items => {
    if (!items.length) {
      dropdown.classList.remove('is-active')
      return
    }

    return items.map(item => {
      displayMovieCard(item)
    })
  }

  var displayMovieCard = item => {
    var option = document.createElement('a')

    option.classList.add('dropdown-item')

    option.innerHTML = renderOption(item)

    option.addEventListener('click', async () => {
      dropdown.classList.remove('is-active')

      input.value = inputValue(item)

      const singleMovie = await fetchSingleMovie(item.imdbID)
      onOptionSelect(singleMovie)
    })

    resultsWrapper.appendChild(option)
  }

  async function onInput(e) {
    resultsWrapper.innerHTML = ''

    var items = await fetchData(e.target.value)
    dropdown.classList.add('is-active')

    displayMovies(items)
  }

  document.addEventListener('click', e => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove('is-active')
    }
  })
}
