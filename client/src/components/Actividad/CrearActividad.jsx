import {React, useState} from 'react'

export default function CrearActividad(){
    const [ value, setValue ] = useState({
        name:''
    })

    let handleChange = (e) => {
        e.preventDefault();
        setValue({
            ...value,
            [e.target.name] : e.target.value
        })
    }
    let handleSubmit =(e)=> {
        e.preventDefault();
        console.log('entre al submit')
        }
        console.log('1');
    return(
        <h3>Crear actividad</h3>
            // <form onSubmit={ (e) => handleSubmit(e)}>
            //     <input type="text" name='name' value = {value.name} onChange = {handleChange}/>
            //     <button type='submit'>submit</button>
            // </form>
        
    )
}