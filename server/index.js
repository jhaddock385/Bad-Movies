var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
const { upsertMovies, findMovies } = require('../db/mongodb/index.js')
const { getMoviesFromAPI } = require('./helpers/apiHelpers.js')

// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup

//Helpers
var apiHelpers = require('./helpers/apiHelpers.js')

//Middleware
app.use(bodyParser.json())

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'))

//***********************************************************************************************************************

/*
Use the routes below to build your application:

|      URL         | HTTP Verb |  Result                                                     |
| :------------:   | :-------: |------------------------------------------------------:      |
|     /genres      |   GET     |  Respond with JSON of all genres                            |
|     /search      |   GET     |  Respond with JSON of all movies by the selected genre      |
|     /save        |   POST    |  Save selected movie as favorite                            |
|     /delete      |   POST    |  Remove selected movie as favorite                          |

*/

// app.get('/favorites', (req, res) => {
// })

app.get('/genres', (req, res) => {
  // make an axios request to get the official list of genres from themoviedb
  // use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list
  //send to controller
})

app.get('/save', (req, res) => {
  // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
  // and sort them by votes (worst first) using the search parameters in themoviedb API
  // do NOT save the results into the database; render results directly on the page

  console.log('server: ')
  //res.body
  findMovies()
    .then((favs) => {
      res.status(200).send(favs)
      console.log(movies)
      //console.log(res)
    })
    .catch((err) => {
      console.log('server: error with findMovies')
    })
})

app.get('/search', function(req, res) {
  //save movie as favorite into the database
  getMoviesFromAPI()
    .then((results) => {
      console.log('server: getMoviesFromApi success')
      //console.log(results)
      //console.log(results.data)
      res.status(200).send(results.data)
    })
    .catch((err) => {
      console.log('server: getMoviesFromApi error')
      console.log(err)
    })
})

//app.post('/save', function(req, res) {

app.post('/delete', function(req, res) {
  //remove movie from favorites into the database
})

//***********************************************************************************************************************
//OPTION 2: Use Express Router

//IF you decide to go with this OPTION 2, delete OPTION 1 to continue

// Routes
const movieRoutes = require('./routes/movieRoutes.js')

// // Use routes
app.use('/movies', movieRoutes)

app.listen(4000, function() {
  console.log('listening on port 4000!')
})
