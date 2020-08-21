import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import BrowseMovies from "./components/BrowseMovies";
import MoviePage from "./components/MoviePage/MoviePage";

class App extends Component 
{
  state={
    search_result: {}
  }

  componentDidMount(){
    this.setState({search_result: this.placeholder_movies});
    // console.log("Set state", this.state.search_result);
  }

  movieSearch = (title)=>{
    console.log("searched: ", title);
    const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
    fetch(`https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`)
    .then(response => {
      console.log("movieSearch res:", response.status);
        response.json().then((data)=>{
          console.log("movieSearch res:", data);
            this.setState({search_result: data});
        })
        .catch(err => {
          console.log(err);
          this.setState({search_result: {"Response": false, "Error": "Something went wrong!"}});
        });
        
    })
    .catch(err => {
      console.log(err);
      this.setState({search_result: {"Response": false, "Error": "Unable to search! Check your Internet connection."}});
    });
  }

  render()
  {
    return (
      <div className="app">
        <header className="app-header">
        Movie Search
        </header>
        <div className="container" style={{minHeight: "90vh"}}>
            <Router>
                <Route exact path="/" render={(props)=><BrowseMovies {...props} search_result={this.state.search_result} onSearch={this.movieSearch}/> } />
                <Route path="/movie/:imdbid" component={MoviePage}/>
            </Router> 
        </div>      
      </div>
      
    )
  }

  // initial movie list shown before search
  placeholder_movies = {
    "Search": [
        {
            "Title": "Harry Potter and the Deathly Hallows: Part 2",
            "Year": "2011",
            "imdbID": "tt1201607",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
        },
        {
            "Title": "Harry Potter and the Sorcerer's Stone",
            "Year": "2001",
            "imdbID": "tt0241527",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
        },
        {
            "Title": "Harry Potter and the Chamber of Secrets",
            "Year": "2002",
            "imdbID": "tt0295297",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_SX300.jpg"
        },
        {
            "Title": "Harry Potter and the Prisoner of Azkaban",
            "Year": "2004",
            "imdbID": "tt0304141",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg"
        },
        {
            "Title": "Harry Potter and the Goblet of Fire",
            "Year": "2005",
            "imdbID": "tt0330373",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX300.jpg"
        },
        {
            "Title": "Harry Potter and the Order of the Phoenix",
            "Year": "2007",
            "imdbID": "tt0373889",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTM0NTczMTUzOV5BMl5BanBnXkFtZTYwMzIxNTg3._V1_SX300.jpg"
        },
        {
            "Title": "Harry Potter and the Deathly Hallows: Part 1",
            "Year": "2010",
            "imdbID": "tt0926084",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ2OTE1Mjk0N15BMl5BanBnXkFtZTcwODE3MDAwNA@@._V1_SX300.jpg"
        },
        {
            "Title": "Harry Potter and the Half-Blood Prince",
            "Year": "2009",
            "imdbID": "tt0417741",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_SX300.jpg"
        },
        {
            "Title": "Harry Potter and the Chamber of Secrets",
            "Year": "2002",
            "imdbID": "tt0304140",
            "Type": "game",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNTM4NzQ2NjA4NV5BMl5BanBnXkFtZTgwODAwMjE4MDE@._V1_SX300.jpg"
        },
        {
            "Title": "Harry Potter and the Forbidden Journey",
            "Year": "2010",
            "imdbID": "tt1756545",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDM0YzMyNGUtMTU1Yy00OTE2LWE5NzYtZDZhMTBmN2RkNjg3XkEyXkFqcGdeQXVyMzU5NjU1MDA@._V1_SX300.jpg"
        }
    ],
    "totalResults": "86",
    "Response": "True"
  }
}

export default App;
