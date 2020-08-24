import React, { Component } from 'react';
import "./MoviePage.css";
import { Link } from 'react-router-dom';

import MovieDashboard from "./MovieDashboard";

class MoviePage extends Component {
    state = { 
        movie: {
            Title: "Loading..."
        }
    }
    componentDidMount(){
        console.log("Movie page for", this.props.match.params.imdbid);
        
        // this.setState({movie: this.placeholder_movie});        
        this.getApiMovieInfo(this.props.match.params.imdbid);
    }

    getApiMovieInfo(imdbid){
        const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
        fetch(`https://www.omdbapi.com/?i=${imdbid}&plot=full&apikey=${API_KEY}`)
        .then(response => {
            
            response.json().then((data)=>{
                // console.log("moviepage res:", data);
                if("Title" in data){
                    this.setState({movie: data});
                }
                else{
                    this.setState({movie: {Title: "Something went wrong!"}});
                }
                
            })
            .catch(err => {
                console.log(err);
                this.setState({movie: {Title: "Something went wrong!"}});
            });
            
        })
        .catch(err => {
            console.log(err);
            this.setState({movie: {Title: "Unable to search! Check your Internet connection."}});
        });
    }

    getPoster = ()=>{
        const posterurl = this.state.movie.Poster;
        
        if(posterurl && posterurl !== "N/A")
        {
            return <img className="movie-page-poster" src={posterurl} alt="Movie Poster"></img>
            
        }
        else{
            return <div className="movie-page-poster movie-page-poster-not-found">N/A</div>
        }
    }

    
    renderIfPresent(property, showAs=undefined){
        if(property in this.state.movie){
            return (
                <React.Fragment>
                    <div className="movie-attrib-name">{(showAs)?showAs:property}</div>
                    <div className="movie-attrib-val"> {this.state.movie[`${property}`]}</div>
                </React.Fragment>
            );
        }
    }

    renderActorList(){
        if("Actors" in this.state.movie)
        {
            let actors = this.state.movie.Actors.split(", ");
            return (
                <div className="actor-list">
                    <div className="movie-attrib-name">Actors</div>
                    
                    {actors.map((actor, index) => <div className="movie-attrib-val" key={index}>{actor}</div> )}
                    
                </div>
            );
        }
    }


    render() { 
        // console.log("page props: ", this.props);
        let {movie} = this.state;
        // console.log("M:",movie);
        return ( 
            
            <div className="movie-page-container">
                <Link to="/" className="btn btn-secondary">Back to Search</Link>
                <div className="row mt-5">
                    <div className="col-lg-4 col-md-5 col-sm-12 p-1" style={{marginBottom:"30px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                        {this.getPoster()}
                    </div>
                    <div className="col-lg-8 col-md-7 col-sm-12 px-3">
                        <MovieDashboard movie={this.state.movie}/>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-lg-8 col-md-6 col-sm-12 p-4">
                        <h3>Plot</h3>
                            <p>{movie.Plot}</p>
                    </div>
                    <div className=" col-lg-4 col-md-6 col-sm-12 p-4">
                        {this.renderActorList()}
                        {this.renderIfPresent("Director")}
                        {this.renderIfPresent("Writer")}
                        {this.renderIfPresent("Awards")}
                        {this.renderIfPresent("Production")}
                        {this.renderIfPresent("BoxOffice")}
                    </div>
                </div>
            </div>
        );
    }    
}
 
export default MoviePage;






// // placeholder data for testing purposes
    // placeholder_movie = {
    //     "Title": "Harry Potter and the Deathly Hallows: Part 2",
    //     "Year": "2011",
    //     "Rated": "PG-13",
    //     "Released": "15 Jul 2011",
    //     "Runtime": "130 min",
    //     "Genre": "Adventure, Drama, Fantasy, Mystery",
    //     "Director": "David Yates",
    //     "Writer": "Steve Kloves (screenplay), J.K. Rowling (novel)",
    //     "Actors": "Ralph Fiennes, Michael Gambon, Alan Rickman, Daniel Radcliffe",
    //     "Plot": "Harry, Ron, and Hermione continue their quest of finding and destroying the Dark Lord's three remaining Horcruxes, the magical items responsible for his immortality. But as the mystical Deathly Hallows are uncovered, and Voldemort finds out about their mission, the biggest battle begins and life as they know it will never be the same again.",
    //     "Language": "English",
    //     "Country": "UK, USA",
    //     "Awards": "Nominated for 3 Oscars. Another 45 wins & 91 nominations.",
    //     "Poster": "https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
    //     "Ratings": [
    //         {
    //             "Source": "Internet Movie Database",
    //             "Value": "8.1/10"
    //         },
    //         {
    //             "Source": "Rotten Tomatoes",
    //             "Value": "96%"
    //         },
    //         {
    //             "Source": "Metacritic",
    //             "Value": "85/100"
    //         }
    //     ],
    //     "Metascore": "85",
    //     "imdbRating": "8.1",
    //     "imdbVotes": "739,625",
    //     "imdbID": "tt1201607",
    //     "Type": "movie",
    //     "DVD": "11 Nov 2011",
    //     "BoxOffice": "$381,000,185",
    //     "Production": "Warner Bros. Pictures",
    //     "Website": "N/A",
    //     "Response": "True"
    // }