import {React} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterAction, prioridad, getActivity, sort, forcePage, orden } from '../../redux/actions';

//componente encargado de los filtros
export default function Filter(){
    const dispatch = useDispatch();
    let countries = useSelector( state => state.countries)
    const order = useSelector( state => state.orden)
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
            
        }
        dispatch(forcePage(1))
    }
    const handleInput = (e) =>{
        if(e.target.type === 'radio'){
            dispatch(prioridad('activity'));
            const activities = countries.filter( e => e.activities.length > 0)
            dispatch(filterAction(activities))
            dispatch(forcePage(1))
        }else{
            if(e.target.value.length > 0){
                dispatch(getActivity(e.target.value))
                const activities = countries.filter( e => e.activities.length > 0);
                const activity = activities.filter( c => c.activities.find(h => h.nombre.includes(e.target.value)))
                console.log(activity)
                dispatch(filterAction(activity))
                dispatch(prioridad('activity'));

            }else{
                dispatch(prioridad(''))
            }
        }
        dispatch(forcePage(1))
    }
    const loseFocus = (e) =>{
        e.target.checked = false
    }
    const az = (a, b) =>{
        if ( a.traduccion.toLowerCase() < b.traduccion.toLowerCase()) return -1;
        if ( a.traduccion.toLowerCase() > b.traduccion.toLowerCase()) return 1;
        return 0
    }
    const za = (a, b) =>{
        if ( a.traduccion.toLowerCase() < b.traduccion.toLowerCase()) return 1;
        if ( a.traduccion.toLowerCase() > b.traduccion.toLowerCase()) return -1;
        return 0
    }
    const populationAsc = (a, b) =>{
        if ( a.population < b.population) return -1;
        if ( a.population> b.population) return 1;
        return 0
    }
    const populationDes = (a, b) =>{
        if ( a.population < b.population) return 1;
        if ( a.population > b.population) return -1;
        return 0
    }
    const orderByName = (e) =>{
        if( order === 'ordenAZ'){
            dispatch(orden('ordenZA'));
            dispatch(sort(za));
            
        }else{
            dispatch(orden('ordenAZ'));
            dispatch(sort(az));
        }
    dispatch(forcePage(1))
    }
    const orderByPopulation = (e) =>{
        if( order === 'Asc'){
            dispatch(orden('Des'));
            dispatch(sort(populationDes));
        }else{
            dispatch(orden('Asc'));
            dispatch(sort(populationAsc));
        }
    }
    return(
        <>
            <h3>Filters</h3>
            <form >
                    <input type="radio" name='continents' id='todos' value='todos' onChange={handleChange} onBlur={loseFocus} />
                    <label htmlFor="continets" id='todos' >Todos</label>
                <fieldset>
                        <legend>Continents</legend>
                    <input type="radio" name="continents" id="oceania" value="Oceania"  onChange={handleChange} onBlur={loseFocus}/>
                    <label htmlFor="oceania">Oceania</label>
                    <br />
                    <input type="radio" name="continents" id="africa" value="Africa" onChange={handleChange} onBlur={loseFocus}/>
                    <label htmlFor="africa">Africa</label>
                    <br />
                    <input type="radio" name="continents" id="europa" value="Europe" onChange={handleChange} onBlur={loseFocus}/>
                    <label htmlFor="europa">Europa</label>
                    <br />
                    <input type="radio" name="continents" id="asia" value="Asia" onChange={handleChange} onBlur={loseFocus}/>
                    <label htmlFor="asia">Asia</label>
                    <br />
                    <input type="radio" name="continents" id="america" value="Americas" onChange={handleChange} onBlur={loseFocus}/>
                    <label htmlFor="america">America</label>
                </fieldset>
                <fieldset>
                    <legend>Actividades</legend>
                    <input type="text" name="activities" id='activities' placeholder='Buscar actividad...' onInput={handleInput} />
                    <br />
                    <input type="radio" name="activities" value='' onChange={handleInput} onBlur={loseFocus}/>
                    <label htmlFor="activities">Buscar todas las actividades</label>
                </fieldset>
                <fieldset>
                    <legend>Orden de los paises</legend>
                    <button type='button' onClick={orderByName}>{order === 'ordenAZ'? 'Ordenar Z - A' : 'Ordenar A - Z'}</button>
                    <br />
                    <button type='button' onClick={orderByPopulation}>{order === 'Ascendente'? 'Descendente' : 'Ascendente'}</button>
                </fieldset>
            </form>
        </>
        
    )
}