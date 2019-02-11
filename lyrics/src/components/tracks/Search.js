import React, {Component} from 'react';
import axios from 'axios';
import '../../App.css'
import {Modal,Button} from 'react-bootstrap';

import {Consumer} from '../../context';

class Search extends Component {

    state = {
        titleTrack: '',
        error: '',
        //modal
        show: false,
        word: '',
        artist: '',
        track:'',
        language:'en',
        artistRating: 'desc',
        trackRating:'desc'
    }

    onChange = (e) =>{
        
        this.setState({
            [e.target.name]: e.target.value  
        }); 
    };

    onChangeSelect =(e) => {
        const {options,selectedIndex,value} = e.target;
        console.log(options[selectedIndex].label);
   
        this.setState({ [e.target.name]: options[selectedIndex].value})
    }

    findTrack = (dispatch,e) => {
        let {word,artist,track,language,titleTrack,artistRating} = this.state;
        if(titleTrack !== ''|| word !== undefined || artist !== undefined || track !== undefined ){
            e.preventDefault();
            const musixmatchAPI= "d9eaf5f5458dde74b42874e05e7081a8";
            

            axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track_artist=${titleTrack}&f_has_lyrics=1&f_lyrics_language=${language}&q_track=${track}&q_artist=${artist}&s_artist_rating=${artistRating}&q_lyrics=${word}&page_size=10&page=1&s_track_rating=desc&apikey=${musixmatchAPI}`).then(res => {

            dispatch({
                type: 'SEARCH_TRACKS',
                payload: res.data.message.body.track_list
            });

            this.setState({titleTrack: '', show: false});
            
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

    //Enabling/disabling Modal for filter search
    handleShow = () => {
        this.setState({show: true})
    }

    handleClose = (e) => {
        this.setState({show: false});
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

                                    <input type="text" class="form-control mb-3" name="titleTrack" onChange={ this.onChange} value={this.state.titleTrack} placeholder="Search Song or Artist..."/>

                                        <div class="input-group-append">
                                            <button class="btn btn-secondary mb-3" 
                                            onClick={this.handleShow} type="button" title="Filter More">  
                                                <i className="fas fa-filter"></i>
                                            </button>
                                        </div>

                                        {/* Modal */}
                                        <Modal show={this.state.show} onHide={this.handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Filter Search</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <form className="form-group" onSubmit={this.findTrack.bind(this,dispatch)}>
                                                    <label  for="word">Any word from the lyrics:</label>
                                                    <input type="text" name="word" id="word" value={this.state.word} onChange={this.onChange} className="form-control"/>

                                                    <label>Artist:</label><input type="text" name="artist" onChange={this.onChange} value={this.state.artist} className="form-control"/>

                                                    <label>Track:</label><input type="text" name="track" onChange={this.onChange} value={this.state.track} className="form-control"/>

                                                    <label>Lyrics Language</label>
                                                    <select name="language" className="custom-select" onChange={this.onChangeSelect}>
                                                        <option value="en">English</option>
                                                        <option value="it">Italian</option>
                                                        <option value="zh">Chinese</option>
                                                        <option value="hi">Hindi</option>
                                                        <option value="kn">Kannada</option>
                                                        <option value="ta">Tamil</option>
                                                        <option value="te">Telugu</option>
                                                    </select><br/>

                                                    <label>Artist Rating</label>    
                                                    <select name="artistRating" className="custom-select" onChange={this.onChangeSelect}>
                                                        <option value="desc">Most Popular</option>
                                                        <option value="asc">Least Popular</option>
                                                    </select>

                                                    <label>Track Rating</label>    
                                                    <select name="trackRating" className="custom-select" onChange={this.onChangeSelect}>
                                                        <option value="desc">Most Popular</option>
                                                        <option value="asc">Least Popular</option>
                                                    </select>

                                                    <Modal.Footer>
                                                    <button className="btn btn-secondary" onClick={this.handleClose}>Close</button>
                                                    <button  className="btn btn-primary" type="submit">Filter</button>
                                                    </Modal.Footer>
                                                </form>
                                            </Modal.Body>
                                            
                                        </Modal>
                                        
                                        
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