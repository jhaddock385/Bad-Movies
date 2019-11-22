var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
const { upsertMovies, findMovies, addFave } = require('../db/mongodb/index.js')
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

app.post('/save', (req, res) => {
  console.log('server: post /save')
  console.log('server: movie to save:')
  console.log(req.body)
  res.status(200).send()
  addFave(req.body)
  // .then((data) => {
  //   console.log('server: upsertMovie success')
  //   console.log(data)
  // })
  // .catch((err) => {
  //   console.log('server: upsertMovie error')
  //   console.log(err)
  // })

  // console.log('server: post /save')
  // console.log('server: movie to save:')
  // console.log(req.body)
  // res.status(200).send()
  // upsertMovies(null, req.body)
  //   .then((data) => {
  //     console.log('server: upsertMovie success')
  //     console.log(data)
  //   })
  //   .catch((err) => {
  //     console.log('server: upsertMovie error')
  //     console.log(err)
  //   })
})

app.get('/search', function(req, res) {
  getMoviesFromAPI()
    .then(({ data }) => {
      console.log('server: getMoviesFromApi success')
      console.log('movies: ')
      let x = data.results
      // console.log(movies)

      let parsed = x.map((movie) => {
        //console.log(movie)
        let temp = {
          title: movie.title,
          description: movie.overview,
          genre: movie.genre_ids,
          rating: movie.popularity,
          date: movie.release_date,
          api_id: movie.id,
          image: movie.poster_path
          //id: '2'
        }
        return temp
      })

      console.log('parsed')
      //console.log(parsed)
      res.status(200).send(parsed)
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
