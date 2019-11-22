const mongoose = require('mongoose')

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
} else {
  mongoose.connect('mongodb://localhost:27017/movies', {
    useNewUrlParser: true
  })
}

const db = mongoose.connection

mongoose.Promise = Promise
db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => {
  console.log('db: connected')
})

var Schema = mongoose.Schema

// api_id: 650005
// date: "2019-11-21"
// description: "History is at our fingertips, it's time to use it.  A depiction of reality stripped of hierarchical boundaries of fact and fiction. Only concepts with image and movement being paramount. The good times don't stop when you stop having fun."
// genre: []
// image: "/3XuUX40l0ARUOvQZLpJJNatFTRh.jpg"
// rating: 0
// title: "Pierced Reality"

var movieSchema = new Schema({
  api_id: String,
  id: String,
  title: String,
  year: Date,
  rating: Number,
  genre: String,
  description: String
})

const Movie = mongoose.model('Movie', movieSchema)

// Movie.find().then((results) => {
//   console.log('results:')
//   console.log(results)
// })

const upsertMovies = (filter, update) => {
  console.log('db: upsertMovies')
  return Movie.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true // Make this update into an upsert
  })
}

const addFave = (newFave) => {
  var fave = new Movie(newFave)
  return fave.save(function(err) {})
}

const findMovies = () => {
  console.log('db: findMovies')
  return Movie.find()
}

module.exports.upsertMovies = upsertMovies
module.exports.findMovies = findMovies
module.exports.addFave = addFave
module.exports.db = db
