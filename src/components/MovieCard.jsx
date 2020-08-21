import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./MovieCard.css";

class MovieCard extends Component 
{
    getPoster = ()=>{
        const posterurl = this.props.movie.Poster;
        
        if(posterurl && posterurl !== "N/A")
        {
            return <img className="poster" src={posterurl} alt="Movie Poster"></img>
            
        }
        else{
            return <div className="poster poster-not-found">N/A</div>
        }
    }

    renderType(){
        let {Type} = this.props.movie;
        if(Type!=="movie"){
            return <div className="movie-card-subtitle" style={{textTransform:"capitalize"}}>({Type})</div>
        }
    }

    render() 
    { 
        let {Title, Year, imdbID} = this.props.movie;
        
        return ( 
            <div className="movie-card">
                <div className="movie-card-poster-wrapper">
                <Link to={`/movie/${imdbID}`}>{this.getPoster()}</Link>
                </div> 
                <div className="movie-card-info">
                    <Link to={`/movie/${imdbID}`} className="movie-card-title">{Title}</Link>
                    <div className="movie-card-subtitle">{Year}</div>
                    {this.renderType()}
                </div> 
            </div>
        );
    }
}
 
export default MovieCard;