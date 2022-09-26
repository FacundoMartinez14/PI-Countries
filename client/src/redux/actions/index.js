import axios from 'axios'

//getCountries hace un get a la base de datos sin ningun argumento
export const getCountries = () =>{
    return async (dispatch) => {
    const results = await axios.get("http://localhost:3001/countries");
    return dispatch({type: 'GET_COUNTRY', payload: results.data});  
    }
}

//filterFuntion es una accion que recibe como argumento un arreglo filtrado y modifica el estado de 'countries'
export const filterAction = (filtered) =>{
    return {type: 'FILTER_COUNTRY', payload: filtered}
}
//search se encarga de buscar el pais por el nombre
export const search = (name) => {
    return async (dispatch) => {
        const result = await axios.get(`http://localhost:3001/countries?name=${name}`);
        return dispatch({type: 'BUSCAR_COUNTRY', payload: result.data})
    }
}
//prioridad sirve de pivot para que Countries sepa que renderizar, si los filtros o lo que se esta buscando
export const prioridad = (payload) =>{
    return {type: 'PRIORIDAD', payload}
} 

// get activity trae todas las actividades filtradas por nombre
export const getActivity = (name) =>{
        return {type:"BUSCAR_ACTIVIDAD", payload: name}
    }

//sort ordena los paises, en los componentes se utiliza para ordenar tantpo por nombre como por poblacion
export const sort = (funcion) =>{
    return {type: "ORDENAR", payload: funcion}
}
//addActivity rebibe un objeto, con el nombre y la bandera del pais a la que se le quiere agregar una actividad
export const addActivity = (obj) =>{
    return {type: "ADD", payload: obj}
}
//removeActivity remueve uno de los paises seleccionados con el addActivity (antes del posteo)
export const removeActivity = (array) => {
    return {type: "REMOVE", payload: array}
}

export const postActivity = (obj) => {
    return async (dispatch) =>{
        const result = await axios.post('http://localhost:3001/activities', obj);
        dispatch({type: 'POST', payload: result.data})
        return result
    }
}

export const forcePage = (page) => {
    return {type: 'FORCE', payload:page}
}

export const orden = (string) => {
    return{ type: "ORDEN", payload: string}
}