import React, {Component} from 'react';
import axios from 'axios';
import '../../App.css'

import {Consumer} from '../../context';

class Search extends Component {

    state = {
        titleTrack: '',
        error: ''
    }

    onChange = (e) =>{
            this.setState({
                [e.target.name]: e.target.value 
            });
      
    };

    findTrack = (dispatch,e) => {
        if(this.state.titleTrack !== ''){
            e.preventDefault();
            const musixmatchAPI= "d9eaf5f5458dde74b42874e05e7081a8"


         axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track_artist=${this.state.titleTrack}&f_has_lyrics=1&f_lyrics_language=en&page_size=10&page=1&s_track_rating=desc&apikey=${musixmatchAPI}`).then(res => {

            dispatch({
                type: 'SEARCH_TRACKS',
                payload: res.data.message.body.track_list
            });

            this.setState({titleTrack: ''});
            
        }).catch(err => {
            console.log(err);
        })
        }else{
            

            this.setState({
                error: "Oops! enter a song or artist's name"
            });

            
        }
        
    };

    //removes alert from dom
    removeAlert =(e) => {
       document.getElementById('alert').remove();
       this.setState({error: ''})
    }

    render(){
        
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    if(this.state.error !== ''){
                        return (
                            <div id="alert" className="alert alert-warning alert-dismissable fade show" role="alert"><strong>{this.state.error}</strong>
                                <button type="button" className="close" dataDismiss="alert" ariaLabel="Close" onClick={this.removeAlert}>
                                    <span ariaHidden="true">&times;</span>
                                </button>
                                
                            </div>
                        )
                    }else{
                        return(
                            <div className="card card-body mb-4 p-4">
                                <h1 className="display-4 text-center">
                                    <i className="fas fa-music"></i>Search For A Song
                                </h1>
                                <p className="lead text-center">Get the lyrics for any song</p>
                                
                                <form className="form-group" onSubmit={this.findTrack.bind(this,dispatch)}>
                                    <div className="input-group mb-3 input-field">

                                    <input type="text" class="form-control mb-3" placeholder="Search Song or Artist..."/>

                                        <div class="input-group-append">
                                            <button class="btn btn-secondary mb-3" type="button">
                                                <i class="fas fa-filter"></i>
                                            </button>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary btn-block mb-4" >Get Song Lyrics</button>
                                    </div>    
                                </form>
                            </div>
                            )
                        }
            }}
            </Consumer>
           
        )
        }
    };


export default Search;