import {React} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeActivity } from '../../redux/actions';

export default function RemoveCountry({name, flag}){
    const dispatch = useDispatch()
    const addcountry = useSelector(state => state.addCountry)
    const handleClick = (e) =>{
        const removedCountry = addcountry.filter( e => e.name !== name);
        dispatch(removeActivity(removedCountry));
    }
    return(
        <>
            <h1>{name}</h1>
            <img src={flag} alt="flag" />
            <button onClick={handleClick}> - </button>
        </>

    )
}