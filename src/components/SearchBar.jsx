import React, { Component } from 'react';

class SearchBar extends Component {
    state = { title: "" }

    onChange = (e)=>{
        this.setState({title: e.target.value});
    }
    onSubmit = (e)=>{
        e.preventDefault();
        this.props.onSearch(this.state.title);
    }
    render() { 
        return ( 
            <form onSubmit={this.onSubmit}>
                <div className="input-group">
                    <input type="text" value={this.state.title} className="form-control" onChange={this.onChange} autoComplete="off" placeholder="Search a movie name" required/>
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-dark">Search</button>
                    </div>
                </div>
            </form>
         );
    }
}
 
export default SearchBar;