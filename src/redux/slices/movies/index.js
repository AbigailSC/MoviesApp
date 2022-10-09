import { createSlice } from '@reduxjs/toolkit';
import axios from "axios"

const initialState = {
  trendingMovies: [],
  discoverMovies: []
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload
    },
    setDiscoverMovies: (state, action) => {
      state.discoverMovies = action.payload
    }
  }
});

export const { setTrendingMovies, setDiscoverMovies } = movieSlice.actions

export default movieSlice.reducer;

export function getTrendingMovies() {
  return async function (dispatch) {
    try {
      const trendingMoviesInfo = await axios.get('https://api.themoviedb.org/3/trending/all/week?api_key=e2e3d6e5bcd2854b499d3e5b96ebbb1c')
      const dataMovies = trendingMoviesInfo.data.results.map((movie) => {
        return {
          img: 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path,
          name: movie.original_title || movie.name
        }
      })
      dispatch(setTrendingMovies(dataMovies))
    } catch (error) {
      console.log(error)
    }
  }
}

export function getMoviesHome(currentPage) {
  return async function (dispatch) {
    try {
      let moviesHome
      if (currentPage === undefined) {
        moviesHome = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=e2e3d6e5bcd2854b499d3e5b96ebbb1c&language=en-US&page=1")
      } else {
        moviesHome = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=e2e3d6e5bcd2854b499d3e5b96ebbb1c&language=en-US&page=${currentPage}`)
      }
      dispatch(setDiscoverMovies(moviesHome.data.results))
    } catch (error) {
      console.log(error)
    }
  }
}