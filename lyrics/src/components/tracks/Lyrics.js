import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';

import Spinner from '../layout/Spinner';

class Lyrics extends Component{

    state={
        track: {},
        lyrics: {},
        genre:''
    };

    componentDidMount(){
        const musixAPI= "d9eaf5f5458dde74b42874e05e7081a8";

        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${musixAPI}`).then((res) => {
            
            this.setState({
                lyrics: res.data.message.body.lyrics
            })
            return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${musixAPI}`).then((res) => {
                
                this.setState({
                    track: res.data.message.body.track
                })
                console.log(this.state.track.primary_genres);
            });
            
        }).catch((err) => {
            console.log(err);
        });
    }

   

    render(){
        const {track,lyrics} = this.state;
        if (track === undefined || lyrics === undefined || Object.keys(track) === 0 || Object.keys(lyrics) === 0){
            return <Spinner/>
        }else{
            return(
                <React.Fragment>
                    {this.checkGenre}
                    <Link to="/" className="btn btn-dark mb-4">Go Back</Link>
     
                   
     
                    <div className="card mb-4 card-dark">
                     <div className="card card-header">
                         {track.album_name} by <span className="text text-secondary">{track.artist_name}</span>
                     </div>
                     <div className="card card-body">
                         <p className="">{lyrics.lyrics_body}</p>
                     </div>
                    </div>
                    <ul className="list-group">
                    <li className="list-group-item list-group-item-secondary"><strong>AlbumID</strong>: {' '}{track.album_id}</li> 
                    
                    <li className="list-group-item list-group-item-secondary"><strong>Num Favourite</strong>:{' '}{track.num_favourite}</li>   

                    {/* <li className="list-group-item list-group-item-secondary"><strong>Genre</strong>{' '}{track=== undefined?'getting': track.primary_genres.music_genre_list[0].music_genre.music_genre_name}</li> */}

                    <li className="list-group-item list-group-item-secondary"><strong>Release Date</strong>:{' '}<Moment format="MM/DD/YYYY">{track.updated_time}</Moment></li>             
                    </ul>
                    
     
                </React.Fragment>   
            ) 
        }
        
        
    }
};

export default Lyrics