import React, {Component} from 'react';
import axios from 'axios';

//defining the context component
const Context = React.createContext();

//defining the reducer const/function
const reducer = (state,action) => {
    switch(action.type){
        case 'SEARCH_TRACKS' :
        return{
            ...state,
            heading: 'Search Results',
            region: '',
            track_list: action.payload
        };
        case 'REGION_CHANGE':
        return {
            ...state,
            heading: 'Top 10 Tracks',
            track_list: action.payload,
            region: action.region
        };
        
        default :
        return state
    }
}

//defining the class Provider
export class Provider extends Component{

    state = {
        track_list: [],
        heading: 'Top 10 Tracks',
        region: 'India',
        regionCode: 'IN',
        //func to be available acroos the struc, where tracks loadng is dynamic
        dispatch: action => this.setState(state => reducer(state,action))
    };

    //runs/renders very time the component mouts
    componentDidMount(){
        const musixAPI= "d9eaf5f5458dde74b42874e05e7081a8";
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=${this.state.regionCode}&f_has_lyrics=1&apikey=${musixAPI}`).then((res) => {
            this.setState({
                track_list: res.data.message.body.track_list
            })
            //console.log(res.data);
        }).catch((err) => {
            console.log(err);
      })
    }

    render(){
        return(
        <Context.Provider value={this.state}>
            {this.props.children}
        </Context.Provider>
        )
        
    }
};

//create consumer object for all compoenets to access this state value
export const Consumer = Context.Consumer;