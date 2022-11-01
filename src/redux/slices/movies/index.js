import { createSlice } from '@reduxjs/toolkit';
import axios from "axios"

const initialState = {
  trendingMovies: [],
  discoverMovies: [],
  detailMovie: [],
  filteredMovies: [],
  maxPages: null,
  reviews: [],
  genres: []
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
    getMaxPages: (state, action) => {
      state.maxPages = action.payload
    },
    setReviews: (state, action) => {
      state.reviews = action.payload
    },
    cleanReview: (state) => {
      state.reviews = []
    },
    getGenres: (state, action) => {
      state.genres = action.payload
    }
  }
});

export const { setTrendingMovies, setDiscoverMovies, setDetailMovie, cleanDetail, getTitle, cleanSearch, getMaxPages, setReviews, cleanReview, getGenres } = movieSlice.actions

export default movieSlice.reducer;

export function getTrendingMovies() {
  return async function (dispatch) {
    try {
      const trendingMoviesInfo = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apikey}`)
      const dataMovies = trendingMoviesInfo.data.results.map((movie) => {
        return {
          img: 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path,
          name: movie.original_title || movie.name,
          id: movie.id
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
      dispatch(getMaxPages(500))
      // ** La api solo permite un maximo de 500 paginas sin embargo esto no se ve en la data que trae, es por eso que uso un valor estatico
      // console.log(moviesHome.data);
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

export function searchTitle(title, currentPage) {
  return async function (dispatch) {
    try {
      let titles
      if (currentPage === undefined) {
        titles = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${title}&page=1`)
      } else {
        titles = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${title}&page=${currentPage}`)
      }
      if (title === "") {
        dispatch(getTitle([]))
        dispatch(getMaxPages(1))
      } else {
        dispatch(getTitle(titles.data.results))
        dispatch(getMaxPages(titles.data.total_pages))
      }
      // console.log("desde redux", title);
    } catch (error) {
      console.log(error.message)
    }
  }
}

export function cleanSearchTitle() {
  return function (dispatch) {
    dispatch(cleanSearch())
  }
}

export function getReviewsByTitle(idTitle) {
  return async function (dispatch) {
    try {
      const reviewsByTitle = await axios.get(`https://api.themoviedb.org/3/movie/${idTitle}/reviews?api_key=${apikey}&language=en-US&page=1`)
      // console.log(reviewsByTitle);
      dispatch(setReviews(reviewsByTitle.data.results))
    } catch (error) {
      console.log(error);
    }
  }
}

export function cleanReviewTitle() {
  return function (dispatch) {
    dispatch(cleanReview())
  }
}

export function getAllGenres() {
  return async function (dispatch) {
    try {
      const genres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`)
      dispatch(getGenres(genres.data.genres))
    } catch (error) {
      console.log(error);
    }
  }
}