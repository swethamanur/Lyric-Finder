import React, {Component} from 'react';
import axios from 'axios';

import {Consumer} from '../../context';

class Search extends Component {

    state = {
        titleTrack: ''
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value 
        });
        console.log(this.state.titleTrack);
    };

    findTrack = (dispatch,e) => {
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
    }

    render(){
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                 return(
                    <div className="card card-body mb-4 p-4">
                        <h1 className="display-4 text-center">
                            <i className="fas fa-music"></i>Search For A Song
                        </h1>
                        <p className="lead text-center">Get the lyrics for any song</p>
                        <form className="form-group" onSubmit={this.findTrack.bind(this,dispatch)}>
                            <input type="text" placeholder="Song Title or Artist..." name="titleTrack" value={this.state.titleTrack}className="form-control mb-4" onChange={this.onChange}/>
                            <button type="submit" className="btn btn-primary btn-block mb-4" >Get Song Lyrics</button>
                        </form>
                    </div>
                    )
                }
            }
            </Consumer>
           
        )
    }
};

export default Search;