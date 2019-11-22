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

var movieSchema = new Schema({
  name: String,
  year: Date,
  rating: Number,
  genre: String
})

const Movie = mongoose.model('Movie', movieSchema)

// Movie.find().then((results) => {
//   console.log('results:')
//   console.log(results)
// })

const upsertMovies = (filter, update) => {
  console.log('db: addMovies')
  return Character.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true // Make this update into an upsert
  })
}

const findMovies = () => {
  console.log('db: findMovies')
  return Movie.find()
}

module.exports.upsertMovies = upsertMovies
module.exports.findMovies = findMovies
module.exports.db = db
