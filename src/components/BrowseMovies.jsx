import React, { Component } from 'react';
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";


const Pagination = ({searchedMovieName, totalPages, gotoPage, currentPage})=>{

  const prevPage = ()=>{
    console.log("prev");
    gotoPage(Math.max(1, currentPage-1));
  }
  const nextPage = ()=>{
    console.log("next");
    gotoPage(Math.min(totalPages, currentPage+1));
  }

    
  if(searchedMovieName!==null){
    let neighbours = 2;
    let from_num = Math.max(1, currentPage-neighbours);
    let n_r = neighbours + (neighbours-(currentPage-from_num));
    let to_num = Math.min(totalPages, currentPage+n_r);
    let n_l = neighbours + (neighbours - (to_num-currentPage));
    from_num = Math.max(1, Math.min(from_num, currentPage-n_l));
    let rangeArr = [];
    for(let i=from_num; i<=to_num;i++){rangeArr.push(i);}

    return (        
      <ul className="pagination justify-content-center">
        
          <li className={(currentPage==1)?"page-item disabled":"page-item"}>
            <button className="page-link" onClick={prevPage}>&laquo;</button>
          </li>  
          {(from_num>1)?<li className="page-item"> <button className="page-link" onClick={()=>gotoPage(1)}>1</button></li>:null}
          {(from_num>2)?<li className="page-item disabled"> <button className="page-link">..</button></li>:null}
          {rangeArr.map((pnum)=>(
            <li key={pnum} className={(currentPage==pnum)?"page-item active":"page-item"}>
              <button className="page-link" onClick={()=>gotoPage(pnum)}>{pnum}</button>
            </li>
          ))}
          {(to_num<totalPages-1)?<li className="page-item disabled"> <button className="page-link">..</button></li>:null}
          {(to_num<totalPages)?<li className="page-item"> <button className="page-link" onClick={()=>gotoPage(totalPages)}>{totalPages}</button></li>:null}
  
          <li className={(currentPage==totalPages)?"page-item disabled":"page-item"}>
            <button className="page-link" onClick={nextPage}>&raquo;</button>
          </li>
              
      </ul>
    );
  }
  else{return null}
  
}

const BrowseMoviePage = ({searchedMovieName, loading, error, movieList, onSearch, totalPages, gotoPage, currentPage}) => 
{

    const msg_style = {
      textAlign: "center",
      color: "hsl(216, 50%, 75%)",
      padding: "10px",
      marginTop: "50px",
    }

    const movies_container_style = {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignContent: "space-between",
      marginTop: "40px"
    }

    const renderMovieList = () =>{
      if (searchedMovieName === null)
      { 
        return (
          <div style={msg_style}>
              <h2>Welcome to Movie Search!</h2>
              <h5>Search for a movie in the search bar to get started</h5>
          </div>
          
        ); 
      }
      else if(loading)
      { return  <h2 style={msg_style}> Loading... </h2>; }
      else if(error!==null)
      { return <h2 style={msg_style}>{error}</h2>; }
      else
      {
        return movieList.map((movie, i)=><MovieCard key={i} movie={movie}/>);
      }
    }   

    return (
      
        <div>
            <div className="searchbar-wrapper">
                <SearchBar onSearch={onSearch}/>
            </div>

            <div style={movies_container_style}>
                {renderMovieList()}        
            </div>
            <div className="mt-4 pb-5">
              <Pagination searchedMovieName={searchedMovieName} 
                          gotoPage={gotoPage} 
                          totalPages={totalPages}
                          currentPage={currentPage}/>
            </div>
        </div>
      
    )

  

}
export default BrowseMoviePage;
