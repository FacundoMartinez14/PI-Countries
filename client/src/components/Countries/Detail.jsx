import {React} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
export function Detail(){
    const {id} = useParams();
    const countries = useSelector(state => state.countries);
    const detail = countries.find( e => e.id === id);
    var UID = Math.floor(Math.random() * 999999)
    return(
        <>
            {console.log(detail)}
            <h1>{detail.traduccion}</h1>
            <img src={detail.flag} alt="flag" />
            <h3>Continente: {detail.continent}</h3>
            <h4>Capital: {detail.capital}</h4>
            <h4>Subregion: {detail.subregion}</h4>
            <h4>Poblacion: {detail.population}</h4>
            <h4>Superficie: {detail.area} </h4>
            <h3>Actividades: </h3>
            <ul>
                {detail.activities.length > 0 ? detail.activities.map( e => <li key ={UID} >{e.nombre}</li>) : null}
            </ul>
        </>
    )
}