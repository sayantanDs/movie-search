import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import BrowseMovies from "./components/BrowseMovies";
import MoviePage from "./components/MoviePage/MoviePage";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const fetchAPISearchResults = (title, page=1) =>{
  console.log(`API Searched for ${title}, page=${page}`);

  return new Promise((resolve, reject) => {
    
    fetch(`https://www.omdbapi.com/?s=${title}&page=${page}&apikey=${API_KEY}`)
    .then(response =>{
        console.log("Response status:", response.status);
        if(response.status == 200){             // check response status code
            response.json().then((data)=>{      // convert to json
                if(data.Response && "Search" in data){
                  resolve(data);
                }
                else{
                  reject(("Error" in data)?data.Error:"Something went wrong!");
                }
                
            })
            .catch(err => {
              console.log("Error", err); 
              reject("Something went wrong!")
            });
        }
        else{
          console.log("Error", response.status); 
          reject("Something went wrong!");
        }
    })
    .catch(err => {
      console.log("Error", err); 
      reject("Unable to search! Check your Internet connection.");
    });
  });  
}



const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedMovieName, setSearchedMovieName] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const moviesPerPage = 10;

  const resetState = () => {
    setTotalPages(1);
    setCurrentPage(1);
    setError(null);
    setSearchedMovieName(null);
    setLoading(false);
    setMovieList([]);
  }
  
  const searchMovie = (title) => { 
    resetState();
    setLoading(true);
    setSearchedMovieName(title); 

    fetchAPISearchResults(title)
    .then((data)=>{      
      let t = Math.ceil(data.totalResults/moviesPerPage);      
      let new_movie_list = Array(t).fill(null).map(()=>Array());
      new_movie_list[0] = data.Search;

      setMovieList(new_movie_list);
      setTotalPages(t);
      setError(null);
    })
    .catch((err)=>{setError(err);})
    .finally(()=>{      
      setLoading(false); 
    });   
       
  }

  const gotoPage = (page)=> {
    console.log("Goto page", page);
    if(searchedMovieName !== null && page<=movieList.length){
      if(movieList[page-1].length === 0)   // data for this page was not fetched before
      {
        setLoading(true);
        setError(null);
        setCurrentPage(page);
        fetchAPISearchResults(searchedMovieName, page)
        .then((data)=>{            
            setMovieList(movieList.map((m, i)=>(i===(page-1)) ? data.Search : m));            
        })
        .catch((err)=>{
          setError(err);
        })
        .finally(()=>{      
          setLoading(false); 
        });      
      }
      else // data for this page was fetched before
      {
        setError(null);
        setCurrentPage(page);
      }
    }    
  }  
  
  const getMoviesInCurrentPage = ()=>{
    // console.log("getting movies in page", currentPage);
    return movieList[currentPage-1];
  }

  return (
    <div className="app">
      <header className="app-header">
        Movie Search
      </header>
      <div className="container" style={{minHeight: "90vh"}}>
          <Router>
              <Route exact path="/" render={(props)=><BrowseMovies {...props}
                                                      searchedMovieName={searchedMovieName}
                                                      loading={loading}
                                                      error={error} 
                                                      movieList={getMoviesInCurrentPage()} 
                                                      onSearch={searchMovie}
                                                      gotoPage={gotoPage}
                                                      totalPages={totalPages}
                                                      currentPage={currentPage}
                                                      /> } />
              <Route path="/movie/:imdbid" component={MoviePage}/>
          </Router> 
      </div>      
    </div>
    
  )
}
 
export default App;




//   placeholder_movies = {
//     "Search": [
//         {
//             "Title": "Harry Potter and the Deathly Hallows: Part 2",
//             "Year": "2011",
//             "imdbID": "tt1201607",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
//         },
//         {
//             "Title": "Harry Potter and the Sorcerer's Stone",
//             "Year": "2001",
//             "imdbID": "tt0241527",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
//         },
//         {
//             "Title": "Harry Potter and the Chamber of Secrets",
//             "Year": "2002",
//             "imdbID": "tt0295297",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_SX300.jpg"
//         },
//         {
//             "Title": "Harry Potter and the Prisoner of Azkaban",
//             "Year": "2004",
//             "imdbID": "tt0304141",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg"
//         },
//         {
//             "Title": "Harry Potter and the Goblet of Fire",
//             "Year": "2005",
//             "imdbID": "tt0330373",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX300.jpg"
//         },
//         {
//             "Title": "Harry Potter and the Order of the Phoenix",
//             "Year": "2007",
//             "imdbID": "tt0373889",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BMTM0NTczMTUzOV5BMl5BanBnXkFtZTYwMzIxNTg3._V1_SX300.jpg"
//         },
//         {
//             "Title": "Harry Potter and the Deathly Hallows: Part 1",
//             "Year": "2010",
//             "imdbID": "tt0926084",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ2OTE1Mjk0N15BMl5BanBnXkFtZTcwODE3MDAwNA@@._V1_SX300.jpg"
//         },
//         {
//             "Title": "Harry Potter and the Half-Blood Prince",
//             "Year": "2009",
//             "imdbID": "tt0417741",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_SX300.jpg"
//         },
//         {
//             "Title": "Harry Potter and the Chamber of Secrets",
//             "Year": "2002",
//             "imdbID": "tt0304140",
//             "Type": "game",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BNTM4NzQ2NjA4NV5BMl5BanBnXkFtZTgwODAwMjE4MDE@._V1_SX300.jpg"
//         },
//         {
//             "Title": "Harry Potter and the Forbidden Journey",
//             "Year": "2010",
//             "imdbID": "tt1756545",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BNDM0YzMyNGUtMTU1Yy00OTE2LWE5NzYtZDZhMTBmN2RkNjg3XkEyXkFqcGdeQXVyMzU5NjU1MDA@._V1_SX300.jpg"
//         }
//     ],
//     "totalResults": "86",
//     "Response": "True"
//   }
// }
