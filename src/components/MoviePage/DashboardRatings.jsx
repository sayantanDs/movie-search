import React, { Component } from 'react';

class MovieDashboardRatings extends Component {
    
    getRatings(){
        if(this.props.ratings)
        {
            return (
                <div style={{marginTop: "1rem", width: "fit-content", textAlign: "center", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "center"}}>
                    {this.props.ratings.map((rating, i)=>{
                        let source = rating.Source==="Internet Movie Database"?"IMDb":rating.Source;
                        return (
                            <div key={i} style={{width: "80px", margin: "3px"}}>
                                <div style={{fontSize: "12px"}}>{source}</div> 
                                <div style={this.rating_style}>{rating.Value}</div>
                            </div>
                        );}
                    )}
                </div>
            );
        }
        else{
            return <div className="mb-3">No ratings found!</div>
        }
    }
    render() { 
        return (  
            <div className="mt-3 p-2">
                {this.getRatings()}
            </div>
        );
    }
    
    rating_style = {
        backgroundColor: "rgb(230,230,230)",
        // borderBottom: "3px solid rgb(200,200,200)",
        padding: "3px",
        margin: "8px 5px 10px 8px",
        borderRadius: "5px",
    }
    
}
 
export default MovieDashboardRatings;