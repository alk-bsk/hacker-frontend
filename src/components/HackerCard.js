import React from 'react';
import Aloke from '../assets/images/Aloke.jpg'

export default function HackerCard({hacker}){
    return(
        <div className="col-sm-4">
          <img className="img-circle" src={Aloke} alt="Generic placeholder image" width="140" height="140" />
          <h1>{hacker.Name}</h1>
        </div>
    );
}