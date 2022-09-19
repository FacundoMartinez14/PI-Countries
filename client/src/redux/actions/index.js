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
        return dispatch({type: 'BUSCAR', payload: result.data})
    }
}
//prioridad sirve de pivot para que Countries sepa que renderizar, si los filtros o lo que se esta buscando
export const prioridad = (payload) =>{
    return {type: 'PRIORIDAD', payload}
} 