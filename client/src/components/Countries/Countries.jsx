import {React, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries, search, prioridad } from '../../redux/actions';
import Countrie from './Countrie'


export default function Countries(){
    const dispatch = useDispatch()
    //usamos un useEffect para que al momento de montarse el componente, traiga todo los paises
    useEffect(() =>{
        dispatch(getCountries());
    },[dispatch])
    //Accedemos a todos los estados de redux mediante useSelector para usarlos con un metodo .map
    //dependiendo de que prioridad (prior) tenga
    let countries = useSelector( state => state.countries)
    let filtered = useSelector(state => state.filtered)
    let buscado = useSelector(state => state.buscados)
    const prior = useSelector(state => state.prioridad)

//usamos el handleChange para que se haga un search a medida que se va escribiendo
    const handleChange = (e) => {
        dispatch(search(e.target.value));
        dispatch(prioridad('busqueda'))
    }
       
    return(
        <div>
            <h3>Countries</h3>
                <label htmlFor="search">Buscador</label>
                <input type="text" name='search' id='search' onInput={handleChange} placeholder = 'Buscar...' />
                <input type="submit" name="submit" id="submit" />
                {/* aca vamos que prioridad hay, si es 'busqueda', se le hace un map al estado de 'buscado' 
                si es 'filter' se lo hace al 'filtered' */}
            {prior === 'busqueda' ? buscado.map( e => <Countrie
                key = {e.id}
                name={e.traduccion}
                flag = {e.flag}
            />) : prior ==='filter' ? filtered.map( e => <Countrie
                key = {e.id}
                name={e.traduccion}
                flag = {e.flag}
            />) : countries.map( e => <Countrie
                key = {e.id}
                name={e.traduccion}
                flag = {e.flag}
            />)
        }
        </div>
    )
}