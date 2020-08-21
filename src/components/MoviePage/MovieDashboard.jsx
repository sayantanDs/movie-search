import React, { Component } from 'react';
import DashboardRatings from "./DashboardRatings";

class MovieDashboard extends Component {
    

    render() { 
        let {movie} = this.props;
        return ( 
            <div>
                <div className="movie-title mb-2">{movie.Title}</div>
                <h5>{movie.Year}</h5>
                <div className="p-2">
                {("Genre" in movie)?movie.Genre.split(", ").map((genre, i)=><span key={i} style={this.genre_style}>{genre}</span>):""}
                </div>
                
                <DashboardRatings ratings={this.props.movie.Ratings}/>

                <ul style={{listStyleType: "none", margin: "20px 0px 0px 0px", padding: "0"}}>
                    <li>Released: {movie.Released}</li>
                    <li>Rated: {movie.Rated}</li>
                    <li>Runtime: {movie.Runtime}</li>
                </ul>
                    
                

            </div>
        );
    }

    genre_style = {
        backgroundColor: "rgb(230,230,230)",
        padding: "5px",
        margin: "3px",
        fontSize: "12px",
        borderRadius: "3px",
        borderBottom: "2px solid rgb(200,200,200)"
    }
}
 
export default MovieDashboard;