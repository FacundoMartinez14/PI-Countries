import {React, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries, search, forcePage } from '../../redux/actions';
import Countrie from './Countrie'
import {Link} from 'react-router-dom'
import Paginado from './Paginado';

export function paginado(array){
    let arr = []
    for(let i = 0, a = 0, s = 9; i<= Math.ceil(array.length / 10); i++){
        if( i === 0 ){
            arr.push(array.slice(a, s))
            a = a + s
            s = s + 10
        }else{
            if(array.slice(a, s).length === 0){
                break;
            }else{
                arr.push(array.slice(a, s));
                a = s;
                s = s + 10
            }
        }
    }
    return arr
}

export default function Countries(){
    const dispatch = useDispatch()
    

    //usamos un useEffect para que al momento de montarse el componente, traiga todo los paises
    useEffect(() =>{
        dispatch(getCountries());
        
    },[dispatch])
    //Accedemos a todos los estados de redux mediante useSelector para usarlos con un metodo .map
    //dependiendo de que prioridad (prior) tenga

    let filtered = useSelector(state => state.filtered)
    const orden = useSelector(state => state.orden)
    let page = useSelector(state => state.page)
    
    const paginate = (pagina) => {
        dispatch(forcePage(pagina))
  
    }
    
    let lastIndex = (page === 1 ? page * 9 : page * 10)
    const firstIndex = lastIndex - (page === 1 ? 9 :  10);
    let currentPosts = filtered.slice(firstIndex, lastIndex)
//usamos el handleChange para que se haga un search a medida que se va escribiendo
    const handleChange = (e) => {
        dispatch(search(e.target.value));
    }
    const handleClick = (e) => {
        if(e.target.name === "siguiente"){
            if(filtered.length - lastIndex < 3){
                dispatch(forcePage(1))
            }else{
                dispatch(forcePage(page + 1))
            }
        }else if(e.target.name === 'anterior'){
            if(page === 0){
                dispatch(forcePage((1)))
            }else{
                dispatch(forcePage(page - 1))
            }
        }
    }
    
    
    return(
        <div>
            <h3>Countries</h3>
            {console.log(currentPosts)}
            {console.log(filtered)}
                <label htmlFor="search">Buscador</label>
                <input type="text" name='search' id='search' onInput={handleChange} placeholder = 'Buscar...' autoComplete='off'/>
                {/* aca vamos que prioridad hay, si es 'busqueda', se le hace un map al estado de 'buscado' 
                si es 'filter' se lo hace al 'filtered' */}
                <br />
                <button name='anterior' onClick={handleClick}>Anterior</button>
                <button name='siguiente' onClick={handleClick}>Siguiente</button>
                <br />
                 <Paginado array = {filtered} currentPage = {page} paginate = {paginate} length={filtered.length}/>
                 {currentPosts ? currentPosts.map( e => <Link key = {e.id} to={`/countries/${e.id}`}><Countrie
                name={e.traduccion}
                flag = {e.flag}
                id = {e.id}
                continent = {e.continent}
                activities= {e.activities} 
                /></Link>): null}
                {/* {prior === 'busqueda' ? workingArray[page].map( e => <Link key = {e.id} to={`/countries/${e.id}`}><Countrie
                name={e.traduccion}
                flag = {e.flag}
                continent = {e.continent}
                /></Link>) : prior === 'filter' || prior === 'activity' ? workingArray[page].map(e => <Link key = {e.id} to={`/countries/${e.id}`}><Countrie
                name={e.traduccion}
                prior = {prior}
                flag = {e.flag}
                continent = {e.continent}
                activities = {e.activities}
                /></Link>) : workingArray[page].map(e => <Link key = {e.id} to={`/countries/${e.id}`}><Countrie
                name={e.traduccion}
                flag = {e.flag}
                continent = {e.continent}
                /></Link> )} */}
        </div>
    )
}