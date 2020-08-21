import React, { Component } from 'react';
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";

class MovieSearch extends Component 
{
  

  renderMovieList()
  {
    let {search_result} = this.props;
    // console.log("rendering:", search_result);
    if(search_result.Response == "False" || !("Search" in search_result))
    {
        return <h2 style={this.error_msg_style}>{("Error" in search_result)?search_result.Error:"Something went wrong! Try searching something else."}</h2>
    }
    else{
        let {Search: movies} = search_result;
        return movies.map((movie)=><MovieCard key={movie.imdbID} movie={movie}/>);
    }
  }

  render()
  {
    return (
      
        <div>
            <div className="searchbar-wrapper">
                <SearchBar onSearch={this.props.onSearch}/>
            </div>

            <div style={this.movies_container_style}>
                {this.renderMovieList()}        
            </div>
        </div>
      
    )
  }

  error_msg_style = {
    color: "hsl(216, 50%, 75%)",
    padding: "10px",
    marginTop: "50px",
  }

  movies_container_style = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "space-between",
  }

}

export default MovieSearch;
