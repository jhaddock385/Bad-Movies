import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import { get } from 'http'
const axios = require('axios')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [{ deway: 'movies' }],
      favorites: [{ deway: 'favorites' }],
      showFaves: false
    }

    // you might have to do something important here!
  }

  componentDidMount() {
    this.getMovies()
      .then((res) => {
        console.log('client: get /search success')
        console.log('response:')
        console.log(res)
        //this.setState
      })
      .catch(() => {
        console.log('client: get /search ERROR')
      })
  }

  getMovies() {
    return axios({
      method: 'get',
      url: 'http://localhost:4000/Search'
    })
  }

  saveMovie() {
    axios({
      method: 'post',
      url: 'http://localhost:4000/save'
    })
      .then((res) => {
        console.log('client: post /save success')
      })
      .catch(() => {
        console.log('client: post /save ERROR')
      })
  }

  deleteMovie() {
    axios({
      method: 'post',
      url: 'http://localhost:4000/delete'
    })
      .then((res) => {
        console.log('client: post /delete success')
      })
      .catch(() => {
        console.log('client: post /delete ERROR')
      })
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    })
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
