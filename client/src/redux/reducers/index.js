const initialState = {
    countries: [],
    filtered:[],
    buscados: [],
    prioridad: ''
}


export default function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_COUNTRY':  return {...state, countries: action.payload, contryCopy: action.payload};
        case 'FILTER_COUNTRY': return {...state, filtered: action.payload};
        case 'BUSCAR': return {...state, buscados: action.payload };
        case 'PRIORIDAD': return {...state, prioridad: action.payload};
        default: return state
    }
}