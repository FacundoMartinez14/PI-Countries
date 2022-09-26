import {React} from 'react';
import { useSelector } from 'react-redux';
export default function Countrie({name, flag, continent, activities, id}){
    const prior = useSelector(state => state.prioridad)
    const acti = useSelector(state => state.actividad)
    let activity
    let final
    if(typeof activities !== 'undefined'){
        activity = activities.map( e => e.nombre)
        final = activity.filter( e => e.includes(acti))
    }
    return (
        <div>
 
            { typeof activities !== 'undefined' && activities.length > 0 && prior === 'activity'? 
            <div >
                <h2>{name}</h2>
                {final.map( (e , index) => <h3 key = {index}>{e}</h3>) }
                <h3>{continent}</h3>
                <img src={flag} alt="bandera" />
            </div>
            : <div > 
            <h2>{name}</h2>
            <h3>{continent}</h3>
            <img src={flag} alt="bandera" />
            </div>}
        </div>
    )
}