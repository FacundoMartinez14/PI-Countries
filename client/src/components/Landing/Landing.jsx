import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing(){
    return (
        <div>
            <h2>Landing</h2>
            <Link to='/countries'><button>Let's go!</button></Link>
        </div>
    )
}