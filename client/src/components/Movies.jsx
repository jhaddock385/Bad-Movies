import React from 'react'
import Movie from '../components/Movie.jsx'

class Movies extends React.Component {
  constructor(props) {
    super(props)
  }

  // Make an onClick for each list item. If the movies shown is the search results,
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    var testArray = this.props.movies
    let movieslots = testArray.map((movie) => {
      // console.log('props')
      // console.log(this.props.movies[0])
      return (
        <ul className="movies">
          <Movie
            title={movie.title}
            key={movie.api_id}
            id={movie.id}
            api_id={movie.api_id}
            description={movie.description}
            date={movie.date}
            rating={movie.rating}
            image={movie.image}
            handleClick={this.props.handleClick}
          />
        </ul>
      )
    })
    return movieslots
  }
}

export default Movies
