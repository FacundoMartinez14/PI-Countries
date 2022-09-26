const initialState = {
    countries: [],
    filtered:[],
    buscados: [],
    prioridad: '',
    orden: '',
    addCountry:[],
    post: '',
    page: 1,
    actividad: ''
}


export default function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_COUNTRY':  return {...state, countries: action.payload, filtered: action.payload };
        case 'FILTER_COUNTRY': return {...state, filtered: action.payload};
        case 'BUSCAR_COUNTRY': return {...state, filtered: action.payload };
        case 'PRIORIDAD': return {...state, prioridad: action.payload};
        case 'BUSCAR_ACTIVIDAD': return {...state, actividad: action.payload};
        case 'ORDENAR': return {...state, countries: state.countries.sort(action.payload), filtered: state.filtered.sort(action.payload) };
        case 'ADD': return {...state, addCountry: [...state.addCountry, action.payload]};
        case 'REMOVE': return {...state, addCountry: action.payload};
        case 'POST': return {...state, post: action.payload };
        case 'NEXT_PAGE': return {...state, anterior: state.anterior + action.payload[0], siguiente: state.siguiente + action.payload[1]};
        case 'PREV_PAGE': return {...state, anterior: state.anterior - action.payload[0], siguiente: state.siguiente - action.payload[1]};
        case 'FORCE': return {...state, page: action.payload};
        case 'ORDEN': return {...state, orden: action.payload};
        default: return state
    }
}