import axios from 'axios'


const fetchMovies = async()=>{

const {data} = await axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1")


}
