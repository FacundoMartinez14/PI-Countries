export const az = (a, b) =>{
    if ( a.traduccion.toLowerCase() < b.traduccion.toLowerCase()) return -1;
    if ( a.traduccion.toLowerCase() > b.traduccion.toLowerCase()) return 1;
    return 0
}
export const za = (a, b) =>{
    if ( a.traduccion.toLowerCase() < b.traduccion.toLowerCase()) return 1;
    if ( a.traduccion.toLowerCase() > b.traduccion.toLowerCase()) return -1;
    return 0
}
export const populationAsc = (a, b) =>{
    if ( a.population < b.population) return -1;
    if ( a.population> b.population) return 1;
    return 0
}
export const populationDes = (a, b) =>{
    if ( a.population < b.population) return 1;
    if ( a.population > b.population) return -1;
    return 0
}