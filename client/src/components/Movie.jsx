import React from 'react'

function Movie(props) {
  console.log
  console.log(props)
  return (
    <li
      className="movie_item"
      onClick={(event) => {
        console.log('log from Movie: ' + props)
        props.handleClick(props)
      }}
    >
      <img src="https://images-na.ssl-images-amazon.com/images/I/518JHKEF17L.jpg" />
      <div className="movie_description">
        <h2>{props.title}</h2>
        <section className="movie_details">
          <div className="movie_year">
            <span className="title">Year</span>
            <span>{props.date}</span>
          </div>
          <div className="movie_rating">
            <span className="title">Rating</span>
            <span>{props.rating}</span>
          </div>
        </section>
      </div>
    </li>
  )
}

// Make an onClick for each list item. If the movies shown is the search results,
// onClick add it to the database (do it in the main app, and pass down the function)

// If you're currently showing the fave list, delete the movie instead
// You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

export default Movie
