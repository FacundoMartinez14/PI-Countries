import {React} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterAction, prioridad } from '../../redux/actions';

//componente encargado de los filtros
export default function Filter(){

    const dispatch = useDispatch();
    let countries = useSelector( state => state.countries)
    //usamos handleChange para el dispatch para que asi, se renderize en el momento del click en el input
    let handleChange = (e) =>{
        const valor = e.target.value
        if(valor === 'todos'){
            dispatch(filterAction(countries))
            dispatch(prioridad('filter'))
        }else{
            const filtered = countries.filter( (e) => e.continent === valor)
            dispatch(prioridad('filter'))
            dispatch(filterAction(filtered))
            console.log(filtered.length)
        }
    }
    
    return(
        <>
            <h3>Filters</h3>
            <form >
                    <label htmlFor="continets" id='todos' >Todos</label>
                    <input type="radio" name='continents' id='todos' value='todos' onChange={handleChange}/>
                <fieldset>
                        <legend>Continents</legend>
                    <label htmlFor="oceania">Oceania</label>
                    <input type="radio" name="continents" id="oceania" value="Oceania"  onChange={handleChange} />
                    <br />
                    <label htmlFor="africa">Africa</label>
                    <input type="radio" name="continents" id="africa" value="Africa" onChange={handleChange} />
                    <br />
                    <label htmlFor="europa">Europa</label>
                    <input type="radio" name="continents" id="europa" value="Europe" onChange={handleChange} />
                    <br />
                    <label htmlFor="asia">Asia</label>
                    <input type="radio" name="continents" id="asia" value="Asia" onChange={handleChange} />
                    <br />
                    <label htmlFor="america">America</label>
                    <input type="radio" name="continents" id="america" value="Americas" onChange={handleChange} />
                </fieldset>
              

                <input type="submit" />
            </form>
        </>
        
    )
}