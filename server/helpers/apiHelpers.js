const request = require('request')
const axios = require('axios')
const { API_KEY } = require('../../config.js')

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

//api.themoviedb.org/3/genre/movie/list?api_key=cdc9446d1981970aa1b55cf71988bf37&language=en-US

// var getMoviesFromAPI = () => {
//   return axios({
//     method: 'get',
//     key: API_KEY,
//     language: 'en-US',
//     url: 'api.themoviedb.org/3/genre/movie/list',
//     prompt: 80
//   })
// }

var getMoviesFromAPI = () => {
  return axios({
    method: 'GET',
    // api_key: 'cdc9446d1981970aa1b55cf71988bf37',
    // language: 'en-US',
    url:
      'https://api.themoviedb.org/3/discover/movie?api_key=cdc9446d1981970aa1b55cf71988bf37&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1'
    //prompt: 80
  })
}

///discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.asc

module.exports.getMoviesFromAPI = getMoviesFromAPI

//this works:
//https://api.themoviedb.org/3/genre/movie/list?api_key=cdc9446d1981970aa1b55cf71988bf37&language=en-US

// base: api.themoviedb.org/3/genre/movie/list - /discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22

// What movies are in theatres?
// URL: /discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22

// What are the most popular movies?
// URL: /discover/movie?sort_by=popularity.desc

// What are the highest rated movies rated R?
// URL: /discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc

// What are the most popular kids movies?
// URL: /discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc
