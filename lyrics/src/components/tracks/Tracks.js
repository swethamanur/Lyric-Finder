import React, {Component} from 'react';

import {Consumer} from '../../context';
import Spinner from '../layout/Spinner';
import Track from '../tracks/Track';
import axios from 'axios';

class Tracks extends Component{

    onChange=(dispatch,e) => {
        const {options, selectedIndex,value} = e.target;
        console.log(options[selectedIndex].label);
        const musixAPI= "d9eaf5f5458dde74b42874e05e7081a8";
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=${value}&f_has_lyrics=1&apikey=${musixAPI}`).then((res) => {

            dispatch({
                type:'REGION_CHANGE',
                payload:  res.data.message.body.track_list,
                region: options[selectedIndex].label
            });
           
            //console.log(res.data);
        }).catch((err) => {
            console.log(err);
      })
    }

    render(){
        return (
            <Consumer>
                {value => {
                    
                    //object destructuring
                    const {track_list,heading,region,dispatch} = value;
                    console.log(track_list);
                    if(track_list === undefined || track_list.length === 0){
                        
                        return <Spinner/>
                    }else{
                        return (
                            <React.Fragment>
                                <h2 className="text-center mb-4">{`${heading} ${region}`} </h2>
                                
                                <div className="input-group mb-3 ">
                                    <select className="custom-select"  onChange={this.onChange.bind(this,dispatch)}>
                                        {/* <option value="XW">WorldWide</option> */}
                                        <option selected>Choose Country</option>
                                        <option value="IN">India</option>
                                        <option value="IT">Italy</option>
                                        <option value="JP">Japan</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="US">United States</option>
                                    </select>
                                </div>
                               
                                <div className="row">
                                    {track_list.map((item) => (
                                         <Track key={item.track.track_id} track={item.track}/>
                                    ))}
                                </div>
                            </React.Fragment>
                        ) 
                    }
                }}
            </Consumer>
        )
    }
};

export default Tracks;