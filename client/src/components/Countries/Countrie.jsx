import {React} from 'react';

export default function Countrie({name, flag}){
    return (
        <div>
            <h3> {name} </h3>
            <img src={flag} alt="bandera" /> 
        </div>
    )
}