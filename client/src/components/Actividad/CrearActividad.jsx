import {React, useState} from 'react'
import './Crear_Actividad.css'
import { useSelector, useDispatch } from 'react-redux';
import { search, postActivity } from '../../redux/actions';
import AddCountry from './AddCountry'
import RemoveCountry from './RemoveCountry';



export function validateDuracion(input) {
let error = {};
    if(input.duracion === "min" && input.min !== ''){
        if(input.min > 60 ){
            error.min = "Si la duracion es mayor de 60 minutos, elija la opcion de 'Horas'"
        }else if( input.min < 0){
            error.min = "No se perminten numeros negativos"
        }
    }else if (input.duracion === "hs"){
        if(input.hs !== ''){
            if(input.hs > 24){
            error.hs = "Si la duracion es mayor de 24hs, elija la opcion 'Dias'"
            }else if(input.hs < 1){
            error.hs = "Si la duracion es menor de una hora, elija la opcion 'Minutos'"
            }else if(input.min > 60 ){
                error.min = "No puede ser mayor a 60 min."
            }else if( input.min < 0){
                error.min = "No se perminten numeros negativos"
            }
        }else if(input.min > 60 ){
            error.min = "No puede ser mayor a 60 min."
        }else if( input.min < 0){
            error.min = "No se perminten numeros negativos"
        }
    }else if(input.duracion === 'days'){
        if(input.days < 0){
            error.days = 'No se perminten numeros negativos';
        }
    }
    return error;
}

export function validateField(obj){
    let error = {}
    if(obj.name.length === 0 || !obj.nombre || !obj.dificultad || !obj.duracion || !obj.temporada){
        error.field = 'No pueden haber campos vacios'
    }
    return error
}

export default function CrearActividad(){
    const dispatch = useDispatch()
    const [ value, setValue ] = useState({
        duracion:'',
        min: '',
        hs: '',
        days: '',
        search:''
    })
    const [position, setPosition] = useState('')
    const [error, setError] = useState({})
    const [form, setForm] = useState({
        name:[],
        nombre: '',
        dificultad: '',
        duracion: '',
        temporada:''
    })
    const busqueda = useSelector(state => state.buscados)
    const addCountry = useSelector(state => state.addCountry)
    const arr = addCountry.map( e => e.name)
    const post = useSelector(state => state.post);
    if(position !== value.duracion){
        setValue(prev =>({
            ...prev,
            min: '',
            hs: '',
            days: ''
        }))
        setPosition(value.duracion);
    }
    let duration = ''
    if(value.duracion === 'min'){
        duration = `${value.min} minutos.`
    }else if(value.duracion === 'hs'){
        if(value.min === ''){
            duration = `${value.hs}:00 hs.`
        }else if(value.min > 0 && value.min < 10){
            duration = `${value.hs}:0${value.min} hs.`
        }else{
            duration = `${value.hs}:${value.min} hs.`
        }
    }else if( value.duracion === 'days'){
        duration = `${value.days} dias.`
    }

    let handleChange = (e) => {
        e.preventDefault();
        setValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        let objError = validateDuracion({...value, [e.target.name]: e.target.value});
        setError(objError)
    }
    const handleSearch = (e) => {
        setValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        dispatch(search(e.target.value));
    }
    const handleInput = (e) =>{
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        form.duracion = duration;
        form.name = arr;
        let objError = validateField(form)
        if(objError.field){
            setError(objError)
            console.log(objError)
        }else{
            dispatch(postActivity(form))
        }
        setForm({
        name:[],
        nombre: '',
        dificultad: '',
        duracion: '',
        temporada:''
        })
    }
    return(
        <>

            <h3>Crear actividad</h3>
            {console.log(form)}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre de la actividad</label>
                <input type="text" name= 'nombre' value={form.nombre} onChange={handleInput}/>
                <br />
                <label htmlFor="dificultad">Dificultad</label>
                <select name="dificultad" id="dificultad" onChange={handleInput} defaultValue={'DEFAULT'}>
                    <option disabled value="DEFAULT">-</option>
                    <option value="1">Principiante</option>
                    <option value="2">Amateur</option>
                    <option value="3">Intermedio</option>
                    <option value="4">Avanzado</option>
                    <option value="5">Profesional</option>
                </select>
                <br />
                <label htmlFor="duracion">Duracion </label>
                <select name="duracion" id="duracion" onChange={handleChange} defaultValue={'DEFAULT'}>
                    <option disabled value="DEFAULT">-</option>
                    <option value="min">Minutos</option>
                    <option value="hs">Horas</option>
                    <option value="days">Dias</option>
                </select>
                <br />
                {value.duracion === 'min' ? 
                 <div>
                    <input type="number" name='min' value={value.min} onChange={handleChange} />
                    <label htmlFor="min">minutos.</label>
                    <br />
                    {error.min && <small className = {error.min && 'danger'}>{error.min}</small>}
                 </div>
                 : value.duracion === 'hs' ?
                 <div>
                    <input type="number" name='hs' value={value.hs} onChange={handleChange}/>
                    <label htmlFor="hs">horas</label>
                    <br />
                    {error.hs && <small className = {error.hs && 'danger'}>{error.hs}</small>}
                    <input type="number" name='min' value={value.min} onChange={handleChange}/>
                    <label htmlFor="min">minutos.</label>
                    <br />
                    {error.min && <small className = {error.min && 'danger'}>{error.min}</small>}
                 </div>
                 :value.duracion === 'days' ? 
                 <div>
                    <input type="number" name='days' value={value.days} onChange={handleChange} />
                    <label htmlFor="days">dias.</label>
                    {error.days && <small className = {error.days && 'danger'}>{error.days}</small>}
                 </div>
                 :null}
                <br />
                <label htmlFor="temporada">Temporada</label>
                <select name="temporada" id="temporada" onChange={handleInput} defaultValue={'DEFAULT'}>
                    <option disabled value="DEFAULT">-</option>
                    <option value="verano">Verano</option>
                    <option value="otoño">Otoño</option>
                    <option value="invierno">Invierno</option>
                    <option value="primavera">Primavera</option>
                </select>
                <input type="submit" value='Enviar'/>
            </form>
            {post ? <h2>{post}</h2> : null}
            {error.field && <small className = {error.field && 'danger'}>{error.field}</small>}
            <br />
            <input type="text" name='search' id='search' onInput={handleSearch} placeholder = 'Buscar...' autoComplete='off' value={value.buscador}/>
            {value.search ? busqueda.map( e => <AddCountry
            key={e.id}
            id= {e.id}
            name={e.traduccion}
            flag={e.flag}
            />) : null}
            <br />
            {addCountry ? addCountry.map( e => <RemoveCountry 
            key={e.id}
            name= {e.name}
            flag={e.flag}
            />) : null}
        </>
          

    )
}