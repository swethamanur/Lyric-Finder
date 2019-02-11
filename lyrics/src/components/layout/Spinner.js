import React from 'react';
import spinner from './spinner.gif';

export default ( ) => {
    setTimeout(() => {
        return (
            <div>
                <img src={spinner} alt="Loading..." style={{width: '200px' ,margin: '40px auto' ,display:'block'}}/>
            </div>
        )
    }, 10000);

    return(
        <div className="alert alert-warning" role="alert">
            Oops! Looks like there are no available tracks! Search again!!
        </div>
    )
    
}

