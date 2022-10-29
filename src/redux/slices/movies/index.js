import { createSlice } from '@reduxjs/toolkit';
import axios from "axios"

const initialState = {
  trendingMovies: [],
  discoverMovies: [],
  detailMovie: [],
  filteredMovies: []
};

const apikey = import.meta.env.VITE_APP_API_KEY;

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload
    },
    setDiscoverMovies: (state, action) => {
      state.discoverMovies = action.payload
    },
    setDetailMovie: (state, action) => {
      state.detailMovie = action.payload
    },
    cleanDetail: (state) => {
      state.detailMovie = []
    },
    getTitle: (state, action) => {
      state.filteredMovies = action.payload
    },
    cleanSearch: (state) => {
      state.filteredMovies = []
    },
  }
});

export const { setTrendingMovies, setDiscoverMovies, setDetailMovie, cleanDetail, getTitle, cleanSearch } = movieSlice.actions

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
        moviesHome = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`)
      } else {
        moviesHome = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=${currentPage}`)
      }
      dispatch(setDiscoverMovies(moviesHome.data.results))
    } catch (error) {
      console.log(error)
    }
  }
}

export function getMovieById(idTitle) {
  return async function (dispatch) {
    try {
      const titleData = await axios.get(`https://api.themoviedb.org/3/movie/${idTitle}?api_key=${apikey}&language=en-US`)
      const titleVideo = await axios.get(`https://api.themoviedb.org/3/movie/${idTitle}/videos?api_key=${apikey}&language=en-US`)
      const titleKeywords = await axios.get(`https://api.themoviedb.org/3/movie/${idTitle}/keywords?api_key=${apikey}`)
      // **Obtener la localización de usuario y en base a eso recomendar el proveedor en donde puede ver la peli
      const titleAllInfo = {
        ...titleData.data,
        ...titleVideo.data,
        keywords: titleKeywords.data.keywords.map((key) => key.name)
      }
      // console.log(titleAllInfo);
      dispatch(setDetailMovie(titleAllInfo))
    } catch (error) {
      console.log(error)
    }
  }
}

export function cleanDetailMovie() {
  return function (dispatch) {
    dispatch(cleanDetail())
  }
}

export function searchTitle(title) {
  return async function (dispatch) {
    try {
      const titles = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apikey}&query=${title}`)
      console.log("desde redux", titles.data);
      dispatch(getTitle(titles.data.results))
    } catch (error) {
      console.log(error)
    }
  }
}

export function cleanSearchTitle() {
  return function (dispatch) {
    dispatch(cleanSearch())
  }
}