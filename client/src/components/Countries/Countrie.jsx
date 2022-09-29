import {React} from 'react';
import { useSelector } from 'react-redux';
import './Countrie.css'

export default function Countrie({name, flag, continent, id, duracion, temporada, dificultad, countriesIn}){
    const prior = useSelector(state => state.prioridad)
    
    return (
        <div className='country'>
            
            {prior === 'activity'? 
            <div>
                <h3>{name}</h3>
                <h3>{duracion}</h3>
                <h3>{temporada}</h3>
            </div>
        
            : <div > 
            <h2>{name}</h2>
            <h3>{continent}</h3>
            <img src={flag} alt="bandera" />
            </div>}
        </div>
    )
}